import React, { useEffect } from 'react'
import PlayingGuess from './PlayingGuess'
import PlayingHint from './PlayingHint'
import useRoomStore from '../../stores/room-store'
import { useShallow } from 'zustand/shallow'
import { useNavigate } from 'react-router-dom'

export default function Playing(props) {
    const { self } = props
    const { getWordListener, timerListener, socket, summaryListener,setScore } = useRoomStore(useShallow(state => ({
        getWordListener: state.getWordListener,
        timerListener: state.timerListener,
        summaryListener: state.summaryListener,
        socket: state.socket,
        setScore : state.setScore
    })))
    const navigate = useNavigate();
    useEffect(() => {
        getWordListener();
        timerListener();
        socket.emit('score', 0)
        if (socket) {
            socket.off('summary')

            socket.on('summary', (score) => {
                console.log('summary listener trigger')
                setScore(score)
                navigate('/game/summary')
            })

        }
    }, [])
    return (
        <div className='flex justify-center items-center w-screen h-[calc(100vh-64px)]'>
            {
                self?.playerRole === 'GUESS' ?
                    <PlayingGuess />
                    : <PlayingHint />
            }
        </div>
    )
}
