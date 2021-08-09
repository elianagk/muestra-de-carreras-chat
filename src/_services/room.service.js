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
    var key = 'Bearer ya29.a0ARrdaM_9iEe7vLlRXtEF-SI1hQPgfeinpjk35KXdLwDO-MOKmWW9a7nu9vnmzR1n0w1ltqYjokqbzl8QZ8OqGGnp_E9gORblt1KmvAbFBDELADFUICzfahT9zRo9Ka3Bh4MB4LH99CHjAcT8sy3stZyflGsr';
    var to = tokenReceiver;
    var notification = {
      'title': 'Notificacion',
      'body': 'nuevo mensaje',
      'icon': 'firebase-logo.png',
      'click_action': 'http://localhost:8081'
    };
    
    fetch('https://fcm.googleapis.com/v1/projects/chat-muestra/messages:send', {
      'method': 'POST',
      'headers': {
        'Authorization': key,
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        'notification': notification,
        'to': to
      })
    }).then(function(response) {
      console.log(response);
    }).catch(function(error) {
      console.error(error);
    })
    

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