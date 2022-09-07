import fb from '@/firebase';
import { userService } from './user.service';
/**
 * Realiza los cambios en la base de datos, referidos a las salas
 */
export const roomService = {
    get, createPrivateChat, createChatRoom, getRoomDetail, sendMessage, createPublicChat, getGeneral, addUser, getUserToken
};

/**
 * 
 * @param currentUser usuario actual en el sistema
 * @param targetUser usuario seleccionado
 * @param department dato con el que se identifica la unidad academica
 * @function get obtiene de la base de datos la sala que existe entre el usuario actual y el usuario seleccionado
 * @returns retorna el estado de la operación y el identificador de la sala
 */
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

/**
 * 
 * @param department dato con el que se identifica la unidad academica
 * @function getGeneral obtiene el chat general del departamento registrado en la base de datos
 * @returns retorna el resultado de la operación y el identificador de la sala
 */
async function getGeneral( department){
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

/**
 * 
 * @param currentUser usuario actual en el sistema
 * @param targetUser usuario seleccionado
 * @param department dato con el que se identifica la unidad academica
 * @function createPrivateChat crea una sala entre el usuario actual y el usuario seleccionado
 * @returns retorna el estado de la operación y el identificador de la sala
 */
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
/**
 * 
 * @param users lista de usuarios registrados en la base de datos
 * @param department dato con el que se identifica la unidad academica
 * @function createPublicChat crea un chat con todos los usuarios registrados en el sistema
 * @returns retorna el estado de la operación y el identificador de la sala
 */
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
/**
 * 
 * @param room identificador de la sala
 * @param department dato con el que se identifica la unidad academica
 * @function getRoomDetail obtiene a todos los usuarios de la sala room
 * @returns retorna el resultado de la operación y los identificadores de los usuarios
 */
async function getRoomDetail(room, department) {
    return fb.firestore.collection("rooms-"+department).doc(room).get()
            .then(snapshot => {
                if (!snapshot.exists) {
                    return {success: false, error: "No chat room(s)"};
                }
                
                return {success: true, userIds: snapshot.data().users};
            }).catch(handleError);
}

/**
 * 
 * @param sender usuario emisor del mensaje
 * @param room identificador de la sala
 * @param message mensaje a ser enviado
 * @param department dato con el que se identifica la unidad academica
 * @function sendMessage envia el mensaje del emisor a la sala especificada
 * @returns retorna el estado de la operación, el identificador del mensaje, la sala y el emisor
 */
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
                'Authorization': "key=AAAAGgj5Kno:APA91bFBrf1C_SnqQr4VTi8N6eaPDha8EEuNSz910CHJyhhX9Y4jqs7ceBVrcQxGB7Z2s2vKuQuMngak8fFd8tsFZ-9LqwqIyH5LKunXdHXzyGfjXxLwo8PK40HnLP72IRL-gtj7Uxk8",
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

/**
 * 
 * @param ID identificador de la sala
 * @param department dato con el que se identifica la unidad academica
 * @function getRoomPrivacy obtiene la sala mediante el identificador y obtiene la privacidad de la misma
 * @returns retorna la privacidad de la sala
 */
async function getRoomPrivacy(ID, department){
    const doc = await fb.firestore.collection("rooms-"+department).doc(ID).get();

    if (doc.exists) {
        const roomData = doc.data();
        return roomData.isPrivate;
    }
}

/**
 * 
 * @param userIDs lista de usuarios registrados en la base de datos
 * @param department dato con el que se identifica la unidad academica
 * @function createChatRoom crea un chat con todos los usuarios registrados en el sistema
 * @returns retorna el resultado de la operación y el identificador de la sala
 */
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

/**
 * 
 * @param users lista de usuarios registrados en la base de datos
 * @param roomID identificador de la sala
 * @param department dato con el que se identifica la unidad academica
 * @function addUser agrega un usuario a la sala general del departamento especificado
 * @returns retorna el resultado de la operación
 */
async function addUser(users, roomID, department) {
    return fb.firestore.collection("rooms-"+department).doc(roomID).update('users', users)
}

/**
 * 
 * @param sender usuario emisor
 * @param room identificador de la sala
 * @param department dato con el que se identifica la unidad academica
 * @function getUserToken cada usuario tiene su propio token en la base de datos. Esta función obtiene el token correspondiente.
 * @returns 
 */
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

/**
 * 
 * @param error descripción del error
 * @function handleError imprime por pantalla la descripción del error producido
 * @returns retorna el resultado de la operación
 */
function handleError(error) {
    console.log("Ops! " + error);
    return Promise.reject(error);
}