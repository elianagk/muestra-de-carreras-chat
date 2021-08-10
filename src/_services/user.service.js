import fb from '@/firebase';

export const userService = {
    createUpdate, login, logout, getUserTokenFCM
};

async function get(username) {
    return fb.firestore.collection("users").where("name", "==", username).limit(1).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    return {success: false, error: "No user(s)"};
                }  
                
                var id, content;

                snapshot.forEach(doc => {
                    id = doc.id;
                    content = doc.data();
                });

                return {success: true, id: id, data: content};
            }).catch(handleError);
}

async function createUpdate(uid, name, token) {
    var data = {
        name: name,
        token: token
    };
    return fb.firestore.collection("users").doc(uid).set(data)
            .then(function() {
                return {success: true};
            }).catch(handleError);
}

async function login(uid) {
    const now = new Date();
    var data = {
        loginAt: now
    }
    return fb.firestore.collection("online").doc(uid).set(data);
}

async function logout(uid) {
    console.log("Logging out " + uid);
    return fb.firestore.collection("online").doc(uid).delete()
    .then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

async function getUserTokenFCM(userId) {
    const user = await fb.firestore.collection("users").doc(userId).get();
    return user.data().token;
}

function handleError(error) {
    console.log("Ops! " + error);
    return Promise.reject(error);
}