import React from 'react'
interface props {
  color?: string;
  butColor?: string;
  padding?: string;
  widthElem?: string;
  heightElem?: string;
  disable?: boolean;
  children?: React.ReactNode;
}

export const ButtonElem = ({color, padding, butColor, widthElem, heightElem, disable, children}: props) => {
  return (
    <>
    <button className="button-element" disabled={disable} style={{backgroundColor: `${color}`, padding: `${padding}`, color: `${butColor}`, width: `${widthElem}`, height: `${heightElem}`}}>
        {children}
    </button>
    </>
  )
}
