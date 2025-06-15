import { Client, Storage, Databases, ID, Query } from 'appwrite'
import variable from '../config/variables.js'

class Services {
    client = new Client()
    databases
    bucket
    constructor() {
        this.client
            .setEndpoint(variable.appwriteUrl)
            .setProject(variable.projectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, content, coverImg, status, userId }) {
        try {
            return await this.databases.createDocument(
                variable.databaseId,
                variable.collectionId,
                ID.unique(),
                {
                    title,
                    content,
                    status,
                    coverImg,
                    userId
                }
            )
        } catch (error) {
            console.log("Create Post Appwrite Error : ", error);
        }
    }

    async updatePost(id, { title, content, active, coverImg }) {
        try {
            return await this.databases.updateDocument(
                variable.databaseId,
                variable.collectionId,
                id,
                {
                    title,
                    content,
                    coverImg,
                    active,
                }
            )
        } catch (error) {
            console.log("Update Post Appwrite Error :", error);
        }
    }
    async deletePost(id) {
        try {
            await this.databases.deleteDocument(
                variable.databaseId,
                variable.collectionId,
                id
            )
            return true
        } catch (error) {
            console.log("Delete Post Appwrite Error : ", error)
            return false
        }
    }

    async getPost(id) {
        try {
            return await this.databases.getDocument(
                variable.databaseId,
                variable.collectionId,
                id
            )
        } catch (error) {
            console.log("Get Post Appwrite Error :", error);
        }
    }

    async getPosts() {
        try {
            return await this.databases.listDocuments(
                variable.databaseId,
                variable.collectionId,
                [
                    Query.equal("active", true),
                    Query.limit(20)
                ]
            )
        } catch (error) {
            console.log("Get Posts Appwrite Error :", error);
        }
    }

    async AddLike(id, likes) {
        try {
            await this.databases.updateDocument(
                variable.databaseId,
                variable.collectionId,
                id,
                {
                    likes
                }
            )
        } catch (error) {
            console.log("Add Like Appwrite Error : ", error);
        }
    }

}

const services = new Services()
export default services