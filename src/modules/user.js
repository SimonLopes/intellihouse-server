const { auth, db } = require('../configs/firebase.js')
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser, reauthenticateWithCredential } = require("firebase/auth");
const { doc, setDoc, getDoc, updateDoc, serverTimestamp, deleteDoc } = require("firebase/firestore");

const DB_COLLECTION_NAME = "Users";

const Auth = (data) => {

    const signin = signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
        const user = userCredential;
        
        return user
    })
    .catch((error) => {
        return error
    })

    return signin

}
const CreateUser = async (data) => {

    const createUser = await createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async (userCredential) => {
        const user = userCredential.user;
        const createUserTable = await setDoc(doc(db, DB_COLLECTION_NAME, user.uid), {
            uid: user.uid,
            ...data,
            createTimestamp: serverTimestamp(),
            updateTimestamp: serverTimestamp()
        }).then(() => {
            return user
        }).catch((error) => {
            console.log(error)
            return error
        })
        return createUserTable
    })
    .catch((error) => {
        return error
    })

    return createUser

}
const ReadUser = async (data) => {
    const docRef = doc(db, DB_COLLECTION_NAME, data.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return null
    }
}
const UpdateUser = async (data) => {
    const docRef = doc(db, DB_COLLECTION_NAME, data.uid);

    const updateUser = await updateDoc(docRef, {
        ...data,
        updateTimestamp: serverTimestamp()
    }).then(()=>{
        return true
    }).catch((error) => {
        return error
    })
    return updateUser
}
const DeleteUser = async (data) => {
    const deleteUserdb = await deleteDoc(doc(db, DB_COLLECTION_NAME, data.uid))
    .then(async () => {
        return true
    }).catch((error) => {
        return error
    })
    return deleteUserdb
}

module.exports = {
    Auth,
    CreateUser,
    ReadUser,
    UpdateUser,
    DeleteUser
}