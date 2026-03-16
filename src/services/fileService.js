import fs from "fs/promises"

export async function listUserFiles(userId){
    const path = `storage/${userId}/files`;

    try{
        const files = fs.readdir(path);
        return files;
    } catch {
        return [];
    }
}