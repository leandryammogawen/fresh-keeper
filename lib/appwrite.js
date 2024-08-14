import { Alert } from "react-native";
import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
} from "react-native-appwrite";

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.leandry.freshkeeper',
    projectId: '66aa62d300286027a890',
    databaseId: '66aa6cc1001b998d0fee',
    storageId: '66aa6f370026f1caf20c',
    userCollectionId: '66aa6cff001a9a03b4bf',
    productCollectionId: '66aa6d2600096c41b716'
}

const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export async function createUser(email, password, username) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );

        return newUser;
    } catch (error) {
        throw new Error(error);
    }
}

// Sign In
export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session;
    } catch (error) {
        throw new Error(error);
    }
}

// Get Account
export async function getAccount() {
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error) {
        throw new Error(error);
    }
}

// Get Current User
export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Get video posts created by user
export async function getUserPosts(userId) {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.productCollectionId,
            [
                Query.equal('creator', userId),
                Query.isNull("isDeleted"),
                Query.orderAsc('expiration')
            ]
        );

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
    let fileUrl;

    try {
        if (type === "image") {
            fileUrl = storage.getFilePreview(
                config.storageId,
                fileId,
                2000,
                2000,
                "top",
                100
            );
        } else {
            throw new Error("Invalid file type");
        }

        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

// Upload File
export async function uploadFile(file, type) {
    if (!file) return;

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri
    };

    try {
        const uploadedFile = await storage.createFile(
            config.storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type);

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

// Add Product
export async function addProduct(form) {
    try {
        const [imageUrl] = await Promise.all([
            uploadFile(form.image, "image")
        ]);

        const newPost = await databases.createDocument(
            config.databaseId,
            config.productCollectionId,
            ID.unique(),
            {
                title: form.title,
                expiration: form.expiration,
                image: imageUrl,
                category: form.category,
                barcode: form.barcode,
                creator: form.userId,
            }
        );

        return newPost;
    } catch (error) {
        throw new Error(error);
    }
}

// Sign Out
export async function signOut() {
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateProduct(form) {
    try {
        // Fetch the existing document
        const existingDocument = await databases.getDocument(
            config.databaseId,
            config.productCollectionId,
            form.documentId
        );

        // Check if there are any changes
        const hasChanges =
            existingDocument.title !== form.title ||
            existingDocument.expiration !== form.expiration ||
            existingDocument.category !== form.category ||
            existingDocument.barcode !== form.barcode ||
            existingDocument.creator !== form.userId;

        // Handle file upload if the image has changed
        let imageUrl = existingDocument.image;
        if (form.image !== existingDocument.image) {
            [imageUrl] = await Promise.all([
                uploadFile(form.image, "image")
            ]);
        }

        // Update document only if there are changes
        if (hasChanges || form.image !== existingDocument.image) {
            const response = await databases.updateDocument(
                config.databaseId,
                config.productCollectionId,
                form.documentId,
                {
                    title: form.title,
                    expiration: form.expiration,
                    image: imageUrl,
                    category: form.category,
                    barcode: form.barcode
                }
            );

            return response;
        }
    } catch (error) {
        throw new Error(error);
    }
}

// Soft delete example
export async function deleteItem(itemId) {
    try {
        await databases.updateDocument(
            config.databaseId,
            config.productCollectionId,
            itemId,
            { isDeleted: true }
        );
    } catch (error) {
        throw new Error(error);
    }
};