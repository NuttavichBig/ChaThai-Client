
import { io } from "socket.io-client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import useUserStore from "./user-store";
import axios from "axios";
const API = import.meta.env.VITE_API



const useRoomStore = create(persist((set, get) => ({
    currentRoom: null,
    players: null,
    socket: null,
    createGame: async (collectionId) => {
        console.log(collectionId)
        const { token } = useUserStore.getState();
        if (!token) throw new Error("Please login")
        const result = await axios.post(`${API}/game`, {collectionId},{
            headers :{
                Authorization : `Bearer ${token}`
            }
        })
        return result
    },
    connect: () => {
        const { token } = useUserStore.getState();
        if (token) {
            const socket = io(API, {
                extraHeaders: {
                    Authorization: `Bearer ${token}`
                },
            });
            set({ socket })
        }
    },
    joinRoom: (code) => {
        console.log('join room function')
        const { socket } = useRoomStore.getState();
        console.log(socket)
        if (socket) {
            socket.emit('joinRoom', { code })

            socket.off('joinComplete')
            socket.off('error')

            socket.on('joinComplete', (data) => {
                const { message, member, room } = data
                console.log(message)
                set({ currentRoom: room, players: member, socketErr: '' })
            })
        }
    },
    disconnect: () => {
        const { socket } = useRoomStore.getState();
        if (socket) {
            socket.disconnect();
        }
        set({ currentRoom: null, players: null, socket: null })
    },
    changeCollection: (collectionId) => {
        const { socket } = useRoomStore.getState();
        if (socket) {
            socket.emit('changeCollection', { collectionId })
        }
    },
    changeMaster: (newMasterId) => {
        const { socket } = useRoomStore.getState();
        if (socket) {
            socket.emit('changeMaster', { newMasterId })
        }
    },
    roomUpdateListener: () => {
        const { socket } = useRoomStore.getState();
        if (socket) {
            socket.off('roomUpdated')
            socket.on('roomUpdated', (room) => {
                set({ currentRoom: room })
            })
        }
    },
    playerJoinListener : ()=>{
        const { socket } = useRoomStore.getState();
        if (socket) {
            socket.off('userJoined')
            socket.on('userJoined', (arg) => {
                const {message , member} = arg
                console.log(message)
                set({players : member})
            })
        }
    },
    playerUpdateListener : ()=>{
        const { socket } = useRoomStore.getState();
        if (socket) {
            socket.off('memberUpdated')
            socket.on('memberUpdated', (players) => {
                set({players})
            })
        }
    }


}), {
    name: "stateRoomData",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
        currentRoom: state.currentRoom,
        players: state.players,
    }),
}
))



export default useRoomStore