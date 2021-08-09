import fb from '@/firebase';
import axios from "axios";

export const roomService = {
    get, createPrivateChat, createChatRoom, getRoomDetail, sendMessage, createPublicChat, getGeneral, addUser,getUserToken
};

async function get(currentUser, targetUser) {
    return fb.firestore.collection("rooms")
            .where("isPrivate", "==", true)
            .where("users", "array-contains", currentUser)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    return {success: false, error: "No chat room(s)"};
                }  
                
                var roomId;
                var success = false;
                for(var i = 0; i < snapshot.docs.length; i++) {
                    // Workaround as multiple array-contains filter is not allowed
                    if(snapshot.docs[i].data().users.indexOf(targetUser) >= 0) {
                        roomId = snapshot.docs[i].id;
                        success = true;
                        break;
                    }
                }

                return {success: success, roomID: roomId};
            }).catch(handleError);
}

async function getGeneral(users){
    return fb.firestore.collection("rooms")
            .where("isPrivate", "==", false)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    return {success: false, error: "No chat room(s)"};
                }  
                var roomId;
                var success = false;
                for(var i = 0; i < snapshot.docs.length; i++) {
                    // Workaround as multiple array-contains filter is not allowed
                    if(users.every(user => snapshot.docs[i].data().users.includes(user))) {
                        roomId = snapshot.docs[i].id;
                        success = true;
                        break;
                    
                    }
                    
                }
                return {success: success, roomID: roomId};
            }).catch(handleError);
}



async function createPrivateChat(currentUser, targetUser) {
    var data = {
        isPrivate: true,
        users: [currentUser, targetUser]
    };

    return fb.firestore.collection("rooms").add(data)
            .then(function(doc) {
                return {success: true, roomID: doc.id};
            }).catch(handleError);
}

async function createPublicChat(users) {
    var data = {
        isPrivate: false,
        users: users
    };

    return fb.firestore.collection("rooms").add(data)
            .then(function(doc) {
                return {success: true, roomID: doc.id};
            }).catch(handleError);
}

async function getRoomDetail(room) {
    return fb.firestore.collection("rooms").doc(room).get()
            .then(snapshot => {
                if (!snapshot.exists) {
                    return {success: false, error: "No chat room(s)"};
                }
                
                return {success: true, userIds: snapshot.data().users};
            }).catch(handleError);
}

async function sendMessage(sender, room, message) {
    var now = new Date();
    var data = {
        sender: sender,
        message: message,
        timestamp: now
    };
    const tokenReceiver = getUserToken(sender, room);
    const requestOptions = {
        method: "POST",
        headers: { 
        "Content-Type": "application/json" ,
        'Authorization': 'Bearer ya29.a0ARrdaM9ryxvPc0I0hnK1Rfkl_DvLh4OwiMBALlQ2-G9qSwr_SYXkqcGFSfDEXno0iu4iiXxT1A3fHBhT48AdQcOPUJzAfrnzmb-dwHRo1newFZFsugARVHy8FBODDqI3qXHNKEjwN8rRT3d7wbleWAEGVn5f',
        
        },
        message: {
            "token" : tokenReceiver,
            "notification": {
                "title": "Notificacion",
                "body": "Nuevo mensaje"
            }
        },
        body: JSON.stringify({ title: "Holanda"})
    };
    fetch("https://fcm.googleapis.com/v1/projects/chat-muestra/messages:send", requestOptions)
        .then(response => response.json())
        .then(data => (this.postId = data.id));

    return fb.firestore.collection("rooms").doc(room).collection("messages").add(data)
            .then(function(doc) {
                return {success: true, messageID: doc.id, room: room, sender: sender};
            }).catch(handleError);
}

async function createChatRoom(userIDs) {
    var data = {
        isPrivate: false,
        users: userIDs
    };
    
    return fb.firestore.collection("rooms").add(data)
            .then(function(doc) {
                return {success: true, roomID: doc.id};
            }).catch(handleError);
}

async function addUser(users, roomID) {
    return fb.firestore.collection("rooms").doc(roomID).update('users', users)
}
async function getUserToken(sender, room){
    var receiver = null;
    fb.firestore.collection("rooms")
                .doc(room)
                .get()
                .then((doc) => {
                    if (!doc.exists) {
                        receiver = null
                    } else{
                        var roomData = doc.data();
                        roomData.users.forEach(element => {
                            if (element != sender){
                                receiver = element;
                                return receiver.token;
                            }
                        });
                    }
                })
}

function handleError(error) {
    console.log("Ops! " + error);
    return Promise.reject(error);
}