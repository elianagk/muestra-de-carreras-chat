import fb from '@/firebase';
/**
 * Hace los cambios en la base de datos, referidos a los usuarios
 */
export const userService = {
    createUpdate, login, getUserTokenFCM, getUserName
};
/**
 * 
 * @param username nombre del usuario
 * @returns sucess si encuentra al usuario solicitado.
 */
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
/**
 * 
 * @param  uid identificador de usuario
 * @param  name nombre asociado al usuario
 * @param  token token asociado al usuario
 * @param  department dato con el que se identifica la unidad academica
 * @function createUpdate crea o actualiza la información de un usuario
 * @returns retorna el estado de la operacion 
 */
async function createUpdate(uid, name, token, department) {
    var data = {
        name: name,
        token: token
    };
    return fb.firestore.collection("users-"+department).doc(uid).set(data)
        .then(function() {
            return {success: true};
        }).catch(handleError);
}
/**
 * 
 * @param  uid identificador de usuario
 * @function login registra a un usuario como loggeado. Lo agrega como usuario online en la base de datos
 * @returns usuario loggeado
 * 
 * 
 */
async function login(uid) {
    const now = new Date();
    var data = {
        loginAt: now
    }
    return fb.firestore.collection("online").doc(uid).set(data);
}
/**
 * 
 * @param  userId 
 * @param  department 
 * @function getUserTokenCada usuario tiene su propio token en la base de datos. Esta funcion obtiene el token correspondiente
 * @returns token asociado al usuario
 */

async function getUserTokenFCM(userId, department) {
    const user = await fb.firestore.collection("users-"+department).doc(userId).get();
    const data = user.data();
    return data.token;
}
/**
 * 
 * @param  userId identificador de usuario
 * @param  department dato con el que se identifica la unidad academica
 * @function getUserName obtiene el nombre de un usuario en base a su identificador y departamento.
 * @return nombre de usuario
 */
async function getUserName(userId, department) {
    const user = await fb.firestore.collection("users-"+department).doc(userId).get();
    const data = user.data();
    return data.name;
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