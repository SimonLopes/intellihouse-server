const { auth, db } = require('../configs/firebase.js')
const { doc, setDoc, getDoc, updateDoc, serverTimestamp, deleteDoc, addDoc, collection } = require("firebase/firestore");
const Log = require("./log.js")


const DB_COLLECTION_NAME = "Hosts";

const CreateHost = async (data) => {
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
const ReadHost = async (data) => {
    const docRef = doc(db, DB_COLLECTION_NAME, data.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        Log.CreateLog({HostID: data.uid, EventType: "Send", Message: "Reading HOST", UserName: "SERVER"})
        return docSnap.data()
    } else {
        return null
    }
}
const UpdateHost = async (data) => {
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
const DeleteHost = async (data) => {
    const deleteHostdb = await deleteDoc(doc(db, DB_COLLECTION_NAME, data.uid))
    .then(async () => {
        return true
    }).catch((error) => {
        return error
    })
    return deleteHostdb
}

module.exports = {
    CreateHost,
    ReadHost,
    UpdateHost,
    DeleteHost
}