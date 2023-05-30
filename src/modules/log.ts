import { db } from '../configs/firebase'
import { doc, setDoc, getDoc, updateDoc, serverTimestamp, deleteDoc, addDoc, collection } from "firebase/firestore";

const DB_COLLECTION_NAME = "Logs";

const CreateLog = async (data : any) => {
    const createLogTable = await addDoc(collection(db, DB_COLLECTION_NAME), {})
    .then(async (LogTableRef) => {
        const log = await setDoc(LogTableRef, {
            uid: LogTableRef.id,
            ...data,
            createTimestamp: serverTimestamp(),
            updateTimestamp: serverTimestamp()
        }).then(async () => {
            const docSnap = await getDoc(LogTableRef)
            if (docSnap.exists()) {
                return docSnap.data()
            } else {
                return null
            }
        }).catch((error) => {
            return error
        })
        return log
    }).catch((error) => {
        return error
    })
    
    return createLogTable

}
const ReadLog = async (data : any) => {
    const docRef = doc(db, DB_COLLECTION_NAME, data.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return null
    }
}
const DeleteLog = async (data : any) => {
    const deleteLogdb = await deleteDoc(doc(db, DB_COLLECTION_NAME, data.uid))
    .then(async () => {
        return true
    }).catch((error) => {
        return error
    })
    return deleteLogdb
}

export default {
    CreateLog,
    ReadLog,
    DeleteLog
}