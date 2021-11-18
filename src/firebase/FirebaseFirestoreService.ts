import { firebaseStore } from "./config";

export interface UserDocument {
  id: string;
  displayName: string | null;
  email: string | null;
}

export enum UsersCollection {
  USERS = "users",
}

export const createUser = (
  collection: UsersCollection.USERS,
  document: UserDocument
) => {
  console.log("createUser", collection, document);
  return firebaseStore.collection(collection).add(document);
};
