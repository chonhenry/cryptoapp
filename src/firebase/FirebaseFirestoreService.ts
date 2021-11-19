import { firebaseStore } from "./config";

export interface UserDocument {
  id: string;
  displayName: string | null;
  email: string | null;
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
