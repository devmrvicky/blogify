import { Client, Databases, ID, Query } from "appwrite";
import env from "../env/env";

class DbService {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(env.appwriteUrl).setProject(env.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  //create document
  async createDocument(data) {
    try {
      return await this.databases.createDocument(
        env.appwriteDatabaseId,
        env.appwriteCollectionId,
        ID.unique(),
        { ...data }
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  // get all document
  async getDocsByAuthId({ $id }) {
    try {
      return await this.databases.listDocuments(
        env.appwriteDatabaseId,
        env.appwriteCollectionId,
        [Query.equal("authorId", $id)]
      );
    } catch (error) {
      console.log(error.message);
    }
  }
  async getAllDocs() {
    try {
      return await this.databases.listDocuments(
        env.appwriteDatabaseId,
        env.appwriteCollectionId
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  // delete post
  async deletePost(postId) {
    try {
      await this.databases.deleteDocument(
        env.appwriteDatabaseId,
        env.appwriteCollectionId,
        postId
      );
      return this.databases.listDocuments(
        env.appwriteDatabaseId,
        env.appwriteCollectionId
      );
    } catch (error) {
      return false;
    }
  }
}

const dbService = new DbService();
export default dbService;
