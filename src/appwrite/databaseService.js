import { Client, Databases, ID, Query, Storage } from "appwrite";
import env from "../env/env";

class DbService {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client.setEndpoint(env.appwriteUrl).setProject(env.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
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
      return this.getAllDocs();
    } catch (error) {
      return false;
    }
  }

  // update post
  async updatePost(postId, updatedPost) {
    try {
      await this.databases.updateDocument(
        env.appwriteDatabaseId,
        env.appwriteCollectionId,
        postId,
        updatedPost
      );
      return await this.getAllDocs();
    } catch (error) {
      console.log(error.message);
    }
  }

  // create responds
  async createResponds(data, uniqueId = ID.unique()) {
    try {
      return await this.databases.createDocument(
        env.appwriteDatabaseId,
        env.appwriteRespondCollectionId,
        uniqueId,
        { ...data }
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  // get all responds regarding to post
  async getAllRespondsByPostId({ $id }) {
    // console.log($id);
    try {
      return await this.databases.listDocuments(
        env.appwriteDatabaseId,
        env.appwriteRespondCollectionId,
        [Query.equal("postId", $id)]
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  // create user data documents like user'chosen categories and user's followers, user's following
  async createUserData(data, uniqueId = ID.unique()) {
    try {
      return await this.databases.createDocument(
        env.appwriteDatabaseId,
        env.appwriteUserDataCollectionId,
        uniqueId,
        { ...data }
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  // get user data on the bases of user id
  async getAllUserDataByUserId({ $id }) {
    // console.log($id);
    try {
      return await this.databases.listDocuments(
        env.appwriteDatabaseId,
        env.appwriteUserDataCollectionId,
        [Query.equal("userId", $id)]
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  // update user data
  async updateUserData(userDataId, updatedData) {
    try {
      return await this.databases.updateDocument(
        env.appwriteDatabaseId,
        env.appwriteUserDataCollectionId,
        userDataId,
        updatedData
      );
      // return await this.getAllDocs();
    } catch (error) {
      console.log(error.message);
    }
  }

  // upload file
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        env.appwriteProfileImgBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error.message);
    }
  }
  async uploadBgImg(file) {
    try {
      return await this.storage.createFile(
        env.appwriteBgImgBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  // delete file
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(env.appwriteProfileImgBucketId, fileId);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
  async deleteBgImg(fileId) {
    try {
      await this.storage.deleteFile(env.appwriteBgImgBucketId, fileId);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  // get file preview
  filePreview(fileId) {
    return this.storage.getFilePreview(env.appwriteProfileImgBucketId, fileId);
  }
  previewBgImg(fileId) {
    return this.storage.getFilePreview(env.appwriteBgImgBucketId, fileId);
  }
}

const dbService = new DbService();
export default dbService;
