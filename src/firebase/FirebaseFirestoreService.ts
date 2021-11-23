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

  // await firebaseStore
  //   .collection(collection)
  //   .doc(document.id)
  //   .update({ transactionsId: transactions.id });
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

export const buyCoin = async (
  data: {
    name: string;
    symbol: string;
    qty: number;
    price: number;
    coinId: number;
  },
  userId: string
) => {
  try {
    const userRef = firebaseStore.collection("users").doc(userId);

    // check if the user owns any cryptos
    const cryptosLength = (await userRef.collection("ownedCryptos").get()).docs
      .length;

    const ownedCryptosRef = userRef.collection("ownedCryptos");
    const { name, symbol, qty, coinId } = data;

    // update coin qty
    if (cryptosLength === 0) {
      // if users doesn't own any cryptos
      await ownedCryptosRef.add({ name, symbol, qty, coinId });
    } else {
      const ref = await ownedCryptosRef.where("name", "==", name).get();
      const length = ref.docs.length;

      if (length > 0) {
        // if user already owns the crypto
        const currentOwnedQty = ref.docs[0].data().qty;
        await ownedCryptosRef
          .doc(ref.docs[0].id)
          .update({ qty: currentOwnedQty + qty });
      } else {
        await ownedCryptosRef.add({ name, symbol, qty, coinId });
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
  } catch (error) {}
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
) => {
  try {
    // update coin qty
    const { name, symbol, qty, coinId } = data;
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
  } catch (error) {}
};
