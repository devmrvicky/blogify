const env = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteRespondCollectionId: String(
    import.meta.env.VITE_APPWRITE_RESPOND_COLLECTION_ID
  ),
  appwriteUserDataCollectionId: String(
    import.meta.env.VITE_APPWRITE_USERDATA_COLLECTION_ID
  ),
  appwriteProfileImgBucketId: String(
    import.meta.env.VITE_APPWRITE_PROFILEIMG_BUCKET_ID
  ),
  appwriteBgImgBucketId: String(import.meta.env.VITE_APPWRITE_BGIMG_BUCKET_ID),
};

export default env;
