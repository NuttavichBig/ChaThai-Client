import React from 'react'

export default function WordListInput(props) {
  const { index, input, setInput } = props
  const hdlChange = (e) => {
    let newArr = [...input.wordList]
    newArr[index] = e.target.value
    setInput(prv => ({ ...prv, wordList: newArr }))
  }
  const hdlDelete = ()=>{
    if(index > 9){
      let newArr = [...input.wordList]
      newArr.splice(index,1)
      setInput(prv => ({ ...prv, wordList: newArr }))
    }
  }

  return (
      <div className={`w-full flex items-center bg-white rounded-full shadow-lg gap-2 ${index>9?'p-2':'py-2 px-4'}`}>
        <input type='text' className=' w-full  text-2xl rounded-full text-center bg-white text-main'
          onChange={hdlChange} placeholder={index < 10 ? 'least 10 words' : 'Addition word'}
          value={input.wordList[index]} />
        {index > 9 && <button className='btn btn-sm btn-circle btn-outline border-gray-300 hover:opacity-100  btn-cancel'
        onClick={hdlDelete} type='button'>X</button> }
      </div>
  )
}
