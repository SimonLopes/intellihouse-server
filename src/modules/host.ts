import { auth, db } from '../configs/firebase'
import { doc, setDoc, getDoc, updateDoc, serverTimestamp, deleteDoc, addDoc, collection } from "firebase/firestore";
import Log from "./log"


const DB_COLLECTION_NAME = "Hosts";

const CreateHost = async (data : any) => {
    const createHostTable = await addDoc(collection(db, DB_COLLECTION_NAME), {})
    .then(async (HostTableRef) => {
        const host = await setDoc(HostTableRef, {
            uid: HostTableRef.id,
            ...data,
            createTimestamp: serverTimestamp(),
            updateTimestamp: serverTimestamp()
        }).then(async () => {
            const docSnap = await getDoc(HostTableRef)
            if (docSnap.exists()) {
                Log.CreateLog({HostID: HostTableRef.id, EventType: "Create", Message: "Created new HOST", UserName: "SERVER"})
                return docSnap.data()
            } else {
                return null
            }
            
        }).catch((error) => {
            return error
        })
        return host
    }).catch((error) => {
        return error
    })
    
    return createHostTable

}
const ReadHost = async (data : any) => {
    const docRef = doc(db, DB_COLLECTION_NAME, data.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        Log.CreateLog({HostID: data.uid, EventType: "Send", Message: "Reading HOST", UserName: "SERVER"})
        return docSnap.data()
    } else {
        return null
    }
}
const UpdateHost = async (data : any) => {
    const docRef = doc(db, DB_COLLECTION_NAME, data.uid);

    const updateHost = await updateDoc(docRef, {
        ...data,
        updateTimestamp: serverTimestamp()
    }).then(()=>{
        Log.CreateLog({HostID: data.uid, EventType: "Update", Message: "Update HOST", UserName: "SERVER"})
        return true
    }).catch((error) => {
        return error
    })
    return updateHost
}
const DeleteHost = async (data : any) => {
    const deleteHostdb = await deleteDoc(doc(db, DB_COLLECTION_NAME, data.uid))
    .then(async () => {
        return true
    }).catch((error) => {
        return error
    })
    return deleteHostdb
}

export default {
    CreateHost,
    ReadHost,
    UpdateHost,
    DeleteHost
}