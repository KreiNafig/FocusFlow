import React from 'react'
interface props {
  color: string;
  butColor: string;
  padding: string;
  widthElem: string;
  heightElem: string;
  children?: React.ReactNode;
}

export const ButtonElem = ({color, padding, butColor, widthElem, heightElem, children}: props) => {
  return (
    <>
    <button className="button-element" style={{backgroundColor: `${color}`, padding: `${padding}`, color: `${butColor}`, width: `${widthElem}`, height: `${heightElem}`}}>
        {children}
    </button>
    </>
  )
}
