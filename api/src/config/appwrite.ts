import sdk from "node-appwrite";
import { env } from "./env";

const client = new sdk.Client()
  .setEndpoint(env.APPWRITE_ENDPOINT)
  .setProject(env.APPWRITE_PROJECT_ID)
  .setKey(env.APPWRITE_API_KEY);

export const storage = new sdk.Storage(client);
