import React from 'react'

function Info( {image, title, text} ) {
  return (
    <div className='info'>
        <div className="info__image">
            <img src={image} alt="Empty" />
        </div>
        <h2 className='info__title'>{title}</h2>
        <p className='info__text'>{text}</p>
    </div>
  )
}

export default Info