import React from 'react'

interface IInput {
    text: string;
    place: string;
    change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputElem = ({ change, text, place }: IInput) => {
  return (
    <>
        <input className="search-bar" placeholder={place} value={text} onChange={change}/>
    </>
  )
}
