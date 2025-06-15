import { Account, Client, ID } from 'appwrite'
import variable from '../config/variables.js'


class AuthServices {
    Client = new Client();
    account;
    constructor() {
        this.Client
            .setEndpoint(variable.appwriteUrl)
            .setProject(variable.projectId)
        this.account = new Account(this.Client)
    }
    async createUser({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password })
            }
            return userAccount
        } catch (error) {
            console.log("Create User Appwrite Error :", error);
            throw error
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Login User Appwrite Error : ", error);
        }
    }

    async getUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Get User Appwrite Error : ", error);
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Logout User Appwrite Error : ", error);
        }
    }
}

const authServices = new AuthServices();
export default authServices