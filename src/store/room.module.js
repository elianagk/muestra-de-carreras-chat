import { roomService } from '../_services/room.service';
const state = {activeRoom: null, users: []};

const actions = {
    async selectRoom({commit, rootState}, {room, currentUser, targetUser}) {
        // If the room has already been created, then set it as active room (usually triggered from selecting the chat room from left)
        var roomID;
        if(room) {
            roomID = room;
        } else {
            // Else check if there is existing chat room created for the user
            const roomResp = await roomService.get(currentUser, targetUser);
            
            if(roomResp.success) {
                roomID = roomResp.roomID;
            } else {
                const resp = await roomService.createPrivateChat(currentUser, targetUser);
                if(resp.success) {
                    roomID = resp.roomID;
                }
            }
        }

        // Get the room detail
        const response = await roomService.getRoomDetail(roomID);
        if(response.success && rootState.contactModule.users) {
            // Postprocessing on the users
            var users = rootState.contactModule.users.filter(function(val) {
                return response.userIds.indexOf(val.id) >= 0;
            });
            
            commit('setUsers', users);
        }        
        
        commit('setActiveRoom', roomID);
    },
    async generalRoom({commit, rootState}, {room, users}) {
        // If the room has already been created, then set it as active room (usually triggered from selecting the chat room from left)
        const ids = [];
         users.forEach(user => {
             ids.push(user.id)
         });
        var roomID;
        if(room) {
            roomID = room;
        } else {
            // Else check if there is existing chat room created for the user
            const roomResp = await roomService.getGeneral(ids);
            
            if(roomResp.success) {
                roomID = roomResp.roomID;
            } else {
                const resp = await roomService.createPublicChat(users);
                if(resp.success) {
                    roomID = resp.roomID;
                }
            }
        }

        // Get the room detail
        const response = await roomService.getRoomDetail(roomID);
        if(response.success && rootState.contactModule.users) {
            // Postprocessing on the users
            var users = rootState.contactModule.users.filter(function(val) {
                return response.userIds.indexOf(val.id) >= 0;
            });
            
            commit('setUsers', users);
        }        
        
        commit('setActiveRoom', roomID);
    },
    async sendMessage({commit, state, rootState}, {message}) {
        var sender = rootState.userModule.user ? rootState.userModule.user.ID : null;
        var room = state.activeRoom;
        
        const resp = await roomService.sendMessage(sender, room, message);
       
        return resp;
    },
    async createChatRoom({commit, rootState}, {userIDs}) {
        var currentUserID = rootState.userModule.user ? rootState.userModule.user.ID : null;
        if(currentUserID) {
            userIDs.push(currentUserID);
        }
        
        const resp = await roomService.createChatRoom(userIDs);
        return resp;
    },
    clearRoom({commit}) {
        commit('clearRoom');
    },
    async addUserToGeneral({commit, rootState}, {user, users}){
        
        var array= [];
        var usersIDs = [];
        users.forEach(element => {
            if(element.id != user){
                array.push(element.id);
            }
            usersIDs.push(element.id);
        });

        const resp = await roomService.getGeneral(array);

        var roomID = resp.roomID;

        const response = await roomService.addUser(usersIDs, roomID);
        return response;
    }
}

const mutations = {
    setActiveRoom(state, room) {
        state.activeRoom = room;
    },
    clearRoom(state) {
        state.activeRoom = null;
        state.users = [];
    },
    setUsers(state, users) {
        state.users = users;
    }
}

export const roomModule = {
    namespaced: true,
    state,
    actions,
    mutations
}