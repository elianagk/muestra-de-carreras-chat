const state = {users: null}
/**
 * Obtiene todos los contactos de la base de datos.
 */
const actions = {
    allContacts({commit}, {users}) {
        // Set all the users to the state
        commit('allContacts', users);
    }
}

const mutations = {
    allContacts(state, users) {
        state.users = users;
    }
}

export const contactModule = {
    namespaced: true,
    state,
    actions,
    mutations
}