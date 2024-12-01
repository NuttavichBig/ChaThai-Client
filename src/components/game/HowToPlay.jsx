import React from 'react'
import { BiggerCross, CheckIcon } from '../../icon/icon'

function HowToPlay(props) {
    const { setIsOpen } = props
    return (
        <div className='flex justify-center items-center h-screen w-screen bg-black bg-opacity-40 absolute top-0 left-0 z-40 backdrop-blur-sm'>
            <div className='absolute top-12 right-20 text-4xl font-semibold text-white cursor-pointer' onClick={() => setIsOpen(false)}><BiggerCross className="w-20 h-20 " /></div>
            <div className='bg-white rounded-xl flex flex-col py-8 px-6'>
                <h1 className='text-4xl text-center text-main font-bold px-10 '>How to play</h1>
                <div class="divider divider-primary"></div>
                <p className='text-center text-black text-lg'>Join your friends a voice chat (such as discord, skype, etc.)</p>
                <div className='flex p-4'>
                    <div className='flex flex-col gap-2 py-4 px-6 bg-slate-100 rounded-xl w-96 text-center text-main'>
                        <h1 className='text-3xl font-bold'>HINT</h1>
                        <p>Describes the word using clues.</p>
                        <p className='text-left'>Rules for Giving Hints:</p>
                        <ul className='text-left pl-4'>
                            <li>- You cannot say the word itself or parts of the word.</li>
                            <li>- You cannot use words with the same meaning in other languages.</li>
                            <li>- Describe the word’s use or purpose.</li>
                            <li>- Mention related objects, actions, or scenarios.</li>
                            <li>- Act it out or use gestures if allowed.</li>
                            <li>- Example: If the word is "apple," you might say:
                                "It’s a red or green fruit that keeps doctors away!"</li>
                        </ul>
                    </div>

                    <div class="divider divider-horizontal divider-warning">AND</div>
                    <div className='flex flex-col gap-2 py-4 px-6 bg-slate-100 rounded-xl w-96 text-center text-main'>
                        <h1 className='text-3xl font-bold'>GUESSER</h1>
                        <p className='text-left'>The guesser tries to say the word based on your hints.</p>
                        <ul className='text-left pl-4'>
                            <li>- If your friends say you're correct click a check green button to get score.</li>
                            <li>- Click skip if you want to skip a word without a score get.</li>
                        </ul>
                        <div className='flex justify-center items-center mt-8'>
                            <button className='btn border-0 w-40 h-20 btn-confirm shadow-xl rounded-lg'><CheckIcon className="w-12 h-12" /></button>
                            <button className='btn border-0 w-40 h-20 btn-skip text-2xl font-itim shadow-xl rounded-lg text-white'>Skip</button>
                        </div>
                    </div>
                </div>
                <p className='text-red-500 text-center'>**If host leave a game while game is running screen could be stuck.**</p>
            </div>
        </div>
    )
}

export default HowToPlay