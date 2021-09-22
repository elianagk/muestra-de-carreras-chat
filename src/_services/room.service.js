import fb from '@/firebase';
import { userService } from './user.service';

export const roomService = {
    get, createPrivateChat, createChatRoom, getRoomDetail, sendMessage, createPublicChat, getGeneral, addUser, getUserToken
};

async function get(currentUser, targetUser, department) {
    return fb.firestore.collection("rooms-"+department)
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

async function getGeneral(department){
    return fb.firestore.collection("rooms-"+department)
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
                    
                        roomId = snapshot.docs[i].id;
                        success = true;
                        break;
                    
                    
                    
                }
                return {success: success, roomID: roomId};
            }).catch(handleError);
}

async function createPrivateChat(currentUser, targetUser, department) {
    var data = {
        isPrivate: true,
        users: [currentUser, targetUser]
    };

    return fb.firestore.collection("rooms-"+department).add(data)
            .then(function(doc) {
                return {success: true, roomID: doc.id};
            }).catch(handleError);
}

async function createPublicChat(users, department) {
    var data = {
        isPrivate: false,
        users: users
    };

    return fb.firestore.collection("rooms-"+department).add(data)
            .then(function(doc) {
                return {success: true, roomID: doc.id};
            }).catch(handleError);
}

async function getRoomDetail(room, department) {
    return fb.firestore.collection("rooms-"+department).doc(room).get()
            .then(snapshot => {
                if (!snapshot.exists) {
                    return {success: false, error: "No chat room(s)"};
                }
                
                return {success: true, userIds: snapshot.data().users};
            }).catch(handleError);
}

async function sendMessage(sender, room, message, department) {
    var now = new Date();
    var data = {
        sender: sender,
        message: message,
        timestamp: now
    };
    
     if (await getRoomPrivacy(room, department)){

        const senderName = await userService.getUserName(sender, department);
        const tokenReceiver = await getUserToken(sender, room, department);
        const requestOptions = {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" ,
                'Authorization': "key=AAAAqEqxMc4:APA91bFUFSx-zKvTzmiuHx3xn1sn0qo15ZvUCvqdZYriTSXA8Sf8ofJCyLi7Vn6POqzc8kyzesng9zzz3YMBlTHGDql9xE-tr3e4J_Fl0Z_I8R1W1Nsfmv1N7NZrsMNKhRo-3S5e_rJm",
            },
            body: JSON.stringify({
                to: tokenReceiver, 
                notification: {
                    "title": "Mensaje nuevo de " + senderName,
                    "body": message
                } 
            })
        };
       
        fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
            .then(response => response.json())
            .then(data => (this.postId = data.id));
     }

    return fb.firestore.collection("rooms-"+department).doc(room).collection("messages").add(data)
            .then(function(doc) {
                return {success: true, messageID: doc.id, room: room, sender: sender};
            }).catch(handleError);
}

async function getRoomPrivacy(ID, department){
    const doc = await fb.firestore.collection("rooms-"+department).doc(ID).get();

    if (doc.exists) {
        const roomData = doc.data();
        return roomData.isPrivate;
    }
}

async function createChatRoom(userIDs, department) {
    var data = {
        isPrivate: false,
        users: userIDs
    };
    
    return fb.firestore.collection("rooms-"+department).add(data)
            .then(function(doc) {
                return {success: true, roomID: doc.id};
            }).catch(handleError);
}

async function addUser(users, roomID, department) {
    return fb.firestore.collection("rooms-"+department).doc(roomID).update('users', users)
}

async function getUserToken(sender, room, department){
    const doc = await fb.firestore.collection("rooms-"+department).doc(room).get();

    if (doc.exists) {
        const roomData = doc.data();
        const tokens = await Promise.all(roomData.users.filter(user => user != sender).map(async element => {
            return await userService.getUserTokenFCM(element, department);
        }));
        return tokens[0];
    }
    
}

function handleError(error) {
    console.log("Ops! " + error);
    return Promise.reject(error);
}