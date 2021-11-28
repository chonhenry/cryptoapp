import { firebaseStore } from "./config";

export interface UserDocument {
  id: string;
  displayName: string | null;
  email: string | null;
}

export interface Transaction {
  name: string;
  symbol: string;
  date: Date;
  qty: number;
  price: number;
  type: string;
  coinId: number;
  transactionId: string;
}

export interface OwnedCoin {
  coinId: number;
  qty: number;
  name: string;
  symbol: string;
}

export enum UsersCollection {
  USERS = "users",
}

export const createUser = async (
  collection: UsersCollection.USERS,
  document: UserDocument
) => {
  const transactions = await firebaseStore
    .collection("transactions")
    .add({ userId: document.id });

  await firebaseStore
    .collection(collection)
    .doc(document.id)
    .set({ ...document, transactionsId: transactions.id });
};

export const checkOwnedQty = async (
  userId: string,
  coinId: number
): Promise<number> => {
  const ref = await firebaseStore
    .collection("users")
    .doc(userId)
    .collection("ownedCryptos")
    .where("coinId", "==", coinId)
    .get();

  const length = ref.docs.length;
  if (length === 0) return 0;

  const qty = ref.docs[0].data().qty;
  if (qty === 0) return 0;

  return qty;
};

export const getOwnedCoin = async (userId: string): Promise<OwnedCoin[]> => {
  const ref = await firebaseStore
    .collection("users")
    .doc(userId)
    .collection("ownedCryptos")
    .orderBy("qty", "desc")
    .get();

  const coins: OwnedCoin[] = [];

  ref.docs.forEach((coin) => {
    const { coinId, qty, name, symbol } = coin.data();
    coins.push({ coinId, qty, name, symbol });
  });

  return coins;
};

export const buyCoin = async (
  data: {
    name: string;
    symbol: string;
    qty: number;
    price: number;
    coinId: number;
  },
  userId: string
): Promise<number> => {
  try {
    const userRef = firebaseStore.collection("users").doc(userId);

    // check if the user owns any cryptos
    const cryptosLength = (await userRef.collection("ownedCryptos").get()).docs
      .length;

    const ownedCryptosRef = userRef.collection("ownedCryptos");
    const { name, symbol, qty, coinId } = data;

    let updatedQty: number;

    // update coin qty
    if (cryptosLength === 0) {
      // if users doesn't own any cryptos
      await ownedCryptosRef.add({ name, symbol, qty, coinId });
      updatedQty = qty;
    } else {
      const ref = await ownedCryptosRef.where("name", "==", name).get();
      const length = ref.docs.length;

      if (length > 0) {
        // if user already owns the crypto
        const currentOwnedQty = ref.docs[0].data().qty;
        updatedQty = currentOwnedQty + qty;
        await ownedCryptosRef.doc(ref.docs[0].id).update({ qty: updatedQty });
      } else {
        await ownedCryptosRef.add({ name, symbol, qty, coinId });
        updatedQty = qty;
      }
    }
    // add transaction history
    const user = (await userRef.get()).data();
    const transactionsId = user?.transactionsId;

    await firebaseStore
      .collection("transactions")
      .doc(transactionsId)
      .collection("history")
      .add({ ...data, type: "buy", date: new Date() });

    return updatedQty;
  } catch (error) {
    throw new Error(`Failed to buy ${data.symbol}`);
  }
};

export const sellCoin = async (
  data: {
    name: string;
    symbol: string;
    qty: number;
    price: number;
    coinId: number;
  },
  userId: string
): Promise<number> => {
  try {
    // update coin qty
    const { qty, coinId } = data;
    const userRef = firebaseStore.collection("users").doc(userId);
    const ownedCryptosRef = userRef.collection("ownedCryptos");

    const ref = await ownedCryptosRef.where("coinId", "==", coinId).get();
    const currentOwnedQty = ref.docs[0].data().qty;
    await ownedCryptosRef
      .doc(ref.docs[0].id)
      .update({ qty: currentOwnedQty - qty });

    // add transaction history
    const user = (await userRef.get()).data();
    const transactionsId = user?.transactionsId;

    await firebaseStore
      .collection("transactions")
      .doc(transactionsId)
      .collection("history")
      .add({ ...data, type: "sell", date: new Date() });

    return currentOwnedQty - qty;
  } catch (error) {
    // return undefined;
    throw new Error(`Failed to sell ${data.symbol}`);
  }
};

export const getTransactions = async (
  userId: string
): Promise<Transaction[]> => {
  const transactions = (
    await (
      await firebaseStore
        .collection("transactions")
        .where("userId", "==", userId)
        .get()
    ).docs[0].ref
      .collection("history")
      .orderBy("date", "desc")
      .get()
  ).docs;

  return transactions.map((transaction) => {
    const { coinId, name, price, qty, symbol, type } = transaction.data();
    let { date } = transaction.data();
    const transactionId = transaction.id;
    date = new Date(date.seconds * 1000);

    return { coinId, date, name, price, qty, symbol, type, transactionId };
  });
};
