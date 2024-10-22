import React, { useEffect, useState } from 'react'
import PlayingGuess from './PlayingGuess'
import PlayingHint from './PlayingHint'
import useRoomStore from '../../stores/room-store'
import { useShallow } from 'zustand/shallow'
import GameSummary from './GameSummary'

export default function Playing(props) {
    const { self } = props
    const { getWordListener,timerListener,summaryListener,socket } = useRoomStore(useShallow(state => ({
        getWordListener : state.getWordListener,
        timerListener : state.timerListener,
        summaryListener : state.summaryListener,
        socket : state.socket
    })))
    const [gameEnd , setGameEnd] = useState(false)
    useEffect(()=>{
        socket.emit('score',0)
        getWordListener();
        timerListener();
        summaryListener();
        if(socket){
            socket.on('summary',()=>{
                setGameEnd(true)
            })
        }
    },[])
    return (
        <div className='flex justify-center items-center w-screen h-[calc(100vh-64px)]'>
            {gameEnd?<GameSummary/>
            :
            self?.playerRole === 'GUESS' ?
                <PlayingGuess />
                : <PlayingHint />}
        </div>
    )
}
