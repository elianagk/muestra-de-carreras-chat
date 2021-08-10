import fb from '@/firebase';
import { userService } from './user.service';

export const roomService = {
    get, createPrivateChat, createChatRoom, getRoomDetail, sendMessage, createPublicChat, getGeneral, addUser, getUserToken
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
    const tokenReceiver = await getUserToken(sender, room);
    const requestOptions = {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" ,
            'Authorization': "key=AAAAdQdXfNc:APA91bH2riVlThLOVV0WKeW3SnmUgnZtZ9KbArjrCxGAVhsdebSTa4parHJ2FkDHR-9FgQg0Ll8cbov8gWA33xecGCjiVs4d_M3fGSmYIAiu7FdZZfFLAl8_y7ixY18yH6p4fbmsrSuG",
        },
        body: JSON.stringify({ 
            to: tokenReceiver, 
            notification: {
                "title": "Nuevo Mensaje",
                "body": "Mensaje nuevo"
            } 
        })
    };
    fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
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
    const doc = await fb.firestore.collection("rooms").doc(room).get();

    if (doc.exists) {
        const roomData = doc.data();
        const tokens = await Promise.all(roomData.users.map(async element => {
            if (element != sender){
                return await userService.getUserTokenFCM(element);
            }
            return null;
        })
        );
        return tokens[0];
    }
    
}

function handleError(error) {
    console.log("Ops! " + error);
    return Promise.reject(error);
}