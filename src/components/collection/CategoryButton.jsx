import React from 'react'

export default function CategoryButton(props) {
    const {hdlClick,category,...etc} = props
    
  return (
    <div {...etc}>
    <button className={`px-4 py-1 font-semibold border-main flex-1 ${category === 'Official' ? 'bg-sub border-0 text-white' : 'bg-white border-2 text-button'}`}
        name='Official' onClick={hdlClick}
        disabled={category === 'Official'}>Official</button>
    <button className={`px-4 py-1 font-semibold border-main flex-1 ${category === 'Community' ? 'bg-sub border-0 text-white' : 'bg-white border-2 text-button'}`}
        name='Community' onClick={hdlClick}
        disabled={category === 'Community'}>Community</button>
    <button className={`px-4 py-1 font-semibold border-main flex-1 ${category === 'Favorite' ? 'bg-sub border-0 text-white' : 'bg-white border-2 text-button'}`}
        name='Favorite' onClick={hdlClick}
        disabled={category === 'Favorite'}>Favorite</button>
    <button className={`px-4 py-1 font-semibold border-main flex-1 ${category === 'Own' ? 'bg-sub border-0 text-white' : 'bg-white border-2 text-button'}`}
        name='Own' onClick={hdlClick}
        disabled={category === 'Own'}>Own</button>
</div>
  )
}
