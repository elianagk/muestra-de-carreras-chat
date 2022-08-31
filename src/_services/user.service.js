import fb from '@/firebase';
/**
 * Hace los cambios en la base de datos, referidos a los usuarios
 */
export const userService = {
    createUpdate, login, getUserTokenFCM, getUserName
};
/**
 * 
 * @param username 
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
 * @param  uid 
 * @param  name 
 * @param  token 
 * @param  department 
 * Crea o actualiza la información de un usuario
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
 * @param  uid id de la base de datos
 * @return usuario loggeado
 * 
 * Registra a un usuario como loggeado. Lo agrega como usuario online en la base de datos.
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
 * @return token
 * Cada usuario tiene su propio token en la base de datos. Esta funcion obtiene el token correspondiente.
 */
async function getUserTokenFCM(userId, department) {
    const user = await fb.firestore.collection("users-"+department).doc(userId).get();
    const data = user.data();
    return data.token;
}
/**
 * 
 * @param  userId 
 * @param  department 
 * @return nombre de usuario
 * Obtiene el nombre de un usuario en base a su Id y departamento.
 * 
 */
async function getUserName(userId, department) {
    const user = await fb.firestore.collection("users-"+department).doc(userId).get();
    const data = user.data();
    return data.name;
}
/**
 * 
 * @param  error descripción del error
 * Escribe por pantalla la descripción del error producido.
 */
function handleError(error) {
    console.log("Ops! " + error);
    return Promise.reject(error);
}