
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
    word : '',
    timer : 0,
    score : 0,
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
            socket.off('joinComplete')
            socket.emit('joinRoom', { code })


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
    ready : ()=>{
        const { socket } = useRoomStore.getState();
        if (socket) {
            socket.emit('ready')
        }
    },
    gameStart : ()=>{
        console.log('Game Start')
        const { socket} = useRoomStore.getState();
        if(socket){
            set({score:0})
            socket.emit('gameStart')
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
    },
    getWordListener : ()=>{
        const {socket} = useRoomStore.getState();
        if(socket){
            socket.off('getWord')
            socket.on('getWord',(wordObj)=>{
                console.log(wordObj)
                if(wordObj === 0 && typeof(wordObj) !== 'object'){
                    socket.emit('endGame')
                    console.log('End Game Emitted with zero word')
                    set({timer : 0 ,word : ''})
                }
            set({word : wordObj.word})
            })
        }
    },
    timerListener : ()=>{
        const {socket} = useRoomStore.getState();
        if(socket){
            socket.off('timerUpdate')
            socket.off('timesUp')

            socket.on('timerUpdate',(time)=>{
                set({timer : time})
            })
            socket.on('timesUp',()=>{
                socket.emit('endGame')
                console.log('End Game Emitted with Time up')
                set({timer : 0 ,word : ''})
            })
        }
    },
    // summaryListener : ()=>{
    //     const {socket} = useRoomStore.getState();
    //     if(socket){
    //         socket.off('summary')

    //         socket.on('summary',(score)=>{
    //             console.log('summary listener trigger')
    //             set({score : score})
    //         })
    //     }
    // },
    setScore : (score)=>{
        set({score})
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