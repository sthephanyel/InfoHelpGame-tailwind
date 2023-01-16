import React from 'react';
import cuboGame from '../assets/cubo.png'

type Props = {
    textX: string;
    imgX: string;
}

export function Header({textX, imgX}:Props){
    return(
        <div className={`flex w-full p-10 h-auto justify-between items-center`}>
            <div className="flex w-full h-52 items-center justify-center border-b-2 border-[#949494]">
                {/* <img className={`${imgX}`} src={cuboGame}></img> */}
                <h1 className={`text-${textX} font-bold text-white`} >InfoCodeHelp</h1>
            </div>
        </div>
    )
}