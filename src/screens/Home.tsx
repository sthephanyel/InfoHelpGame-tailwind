import React,{useContext, FormEvent, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import emotes from '../assets/emotesGame.png'
import JOGO from '../assets/JOGO.png'
import Typewriter from 'typewriter-effect';
import { Header } from './Header';
import { MagnifyingGlass, BookmarkSimple } from "phosphor-react";
import { AuthContext } from '../contexts/AuthContext';
import { database, firebase } from '../service/firebase';
import { useAuth } from '../hooks/useAuth';

import { getDatabase, ref, onValue} from "firebase/database";
import { TagSelection } from '../components/TagSelection/TagSelection';
import { AnimationProps } from '../components/AnimationProps/AnimationProps';

export type OrderProps = {
    description: string;
    name: string;
    url: string;
    target: string;
    styleColor: string;
}

export function Home(){

    const navigate = useNavigate();
    const {user, handleLoginGoogle} = useAuth();

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');

    const [siteInformation,setSiteInformation] = useState<OrderProps[]>([]);

    const [searchInfo, setSearchInfo] = useState('');
    const [searchInfoResults, setSearchInfoResults] = useState<OrderProps[]>([]);

    const [searchTag, setSearchTag] = useState('');

    const [linksSearchFull, setLinksSearchFull] = useState([
        // {
        //     description : "Site que utiliza IAs para realizar pesquisas personalizadas Site que utiliza IAs para realizar pesquisas personalizadas Site que utiliza IAs para realizar pesquisas personalizadas.",
        //     name : "Open Ai 1",
        //     target : "curiosidades",
        //     styleColor: '',
        //     url : "https://beta.openai.com/playground"
        // }
    ]);

    const handleTagSelection = (e: String) =>{
        // setSearchTag(`${e}`)
//         console.log(e)
        if(e == 'todos') return setSearchInfoResults([])

        const newArrayTwoResults = [...siteInformation, ...linksSearchFull]
        const resultArray = newArrayTwoResults.filter(
            newArrayTwoResults => newArrayTwoResults.target.toLowerCase().includes(`${e.toLowerCase()}`)
        )
        if(resultArray.length === 0) return setSearchInfoResults([])

//         console.log(resultArray)

        setSearchInfoResults(resultArray)
    }

    const handleSearchInfo = () =>{
        if(!searchInfo) return setSearchInfoResults([])

        const newArrayTwoResults = [...siteInformation, ...linksSearchFull]

        const resultArray = newArrayTwoResults.filter(
            newArrayTwoResults => newArrayTwoResults.name.toLowerCase().includes(`${searchInfo.toLowerCase()}`)
        )
//         console.log(resultArray)
        // setLinksSearchFull(resultArray)
        setSearchInfoResults(resultArray)
    }

    useEffect(()=>{
        handleSearchInfo()
    },[searchInfo])
    

    useEffect(()=>{
        const db = getDatabase();
        const starCountRef = ref(db, 'newUserSitesLink');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
//             console.log(Object.values(data))
            let value = []
            value = Object.values(data);
            setSiteInformation(value as any)
        });
    },[])

    return(
        <div className='w-full h-screen bg-gradient-to-t from-blue-1000 to-green-1000'>
            <Header textX='3xl' imgX='h-38 w-28'/>
            <div className="flex w-full max-[800px]:inline max-[800px]:h-auto">
                <div className=" flex w-full align-center justify-center max-[800px]:w-full">
                    <div className='w-full align-center justify-center'>
                        <div className="w-full flex p-5 max-[600px]:justify-center">
                            <h1 className="text-2xl font-semibold text-center text-white">WebSites</h1>
                        </div>
                        <div className='flex w-full mb-8 border-b-2 border-[#949494]  max-md:flex-col'>
                            <div className='flex w-1/2 max-md:w-full max-md:justify-around'>
                                <button className="text-lg m-4 font-semibold text-center text-white hover:text-gray-200 ease-in duration-200" onClick={e=>handleTagSelection('todos')}>Todos</button>
                                <button className="text-lg m-4 font-semibold text-center text-white hover:text-gray-200 ease-in duration-200" onClick={e=>handleTagSelection('cursos')}>Cursos</button>
                                <button className="text-lg m-4 font-semibold text-center text-white hover:text-gray-200 ease-in duration-200" onClick={e=>handleTagSelection('desafios')}>Desafios</button>
                                <button className="text-lg m-4 font-semibold text-center text-white hover:text-gray-200 ease-in duration-200" onClick={e=>handleTagSelection('curiosidades')}>Curiosidades</button>
                            </div>
                            <div className='flex w-1/2 mr-5 pb-3 align-center justify-end max-md:w-full max-md:justify-center'>
                                <div className='flex px-5 align-center justify-center items-center border-2 border-[#949494] max-md:w-4/5'>
                                    <MagnifyingGlass size={32} color="#b9e228" onClick={()=>{
                                        handleSearchInfo()
                                    }} />
                                    <input
                                        className=" flex bg-transparent rounded px-5 h-14 outline-none text-gray-200 max-md:w-full"
                                        type="text" 
                                        placeholder="Procurando algo ..."
                                        onChange={event=>setSearchInfo(event.target.value)}
                                        onKeyPress={(event) => {(event.key === 'Enter' ? handleSearchInfo() : null)}}
                                        />
                                </div>
                            </div>
                        </div>
                        <div className='flex overflow-y-auto align-center justify-center'>
                            <div className=' w-full grid grid-cols-3 gap-4 max-[800px]:grid-cols-2 max-[600px]:grid-cols-1'>
                                {searchInfoResults.length > 0 ? 
                                    (
                                        <>
                                            {searchInfoResults && searchInfoResults.map((user, index)=>(
                                                <div key={index} className="p-4 rounded-lg break-all">
                                                    <div className="bg-transporter p-5 border-2 border-gray-200 rounded-xl">
                                                        <h1 className='text-whiteText-100 text-xl pb-2 font-bold'>{user.name}</h1>
                                                        <div className="h-28 max-h-28 p-2 pb-4 mb-3 overflow-y-auto max-[600px]:h-full max-[600px]:max-h-full">
                                                            <h1 className='text-gray-200 pb-2'>{user.description}</h1>
                                                        </div>
                                                        <div className='flex p-2'>
                                                            <BookmarkSimple size={32} color='#C4C4CC' />
                                                            <h1 className='text-gray-200 pb-2'>{user.target}</h1>
                                                        </div>
                                                        {/* <h1 >{user.url}</h1> */}
                                                        <div className="w-full">
                                                            <button className='w-full text-lg font-semibold'>
                                                            <a className={`flex bg-gradient-to-l from-blue-200 to-green-1000 text-white py-2 w-full justify-center text-center rounded-lg`} target="_blank" href={user.url}>Vamos Lá!</a>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ) 
                                    : 
                                    (
                                        <>  
                                            {[...siteInformation,...linksSearchFull].length > 0 ?
                                            (
                                                [...siteInformation,...linksSearchFull].map((user, index)=>(
                                                    <div key={index} className="p-4 rounded-lg break-all">
                                                        <div className="bg-transporter p-5 border-2 border-gray-200 rounded-xl">
                                                            <h1 className='text-whiteText-100 text-xl pb-2 font-bold'>{user.name}</h1>
                                                            <div className="h-28 max-h-28 p-2 pb-4 mb-3 overflow-y-auto max-[750px]:h-full max-[750px]:max-h-full">
                                                                <h1 className='text-gray-200 pb-2'>{user.description}</h1>
                                                            </div>
                                                            <div className='flex p-2'>
                                                                <BookmarkSimple size={32} color='#C4C4CC' />
                                                                <h1 className='text-gray-200 pb-2'>{user.target}</h1>
                                                            </div>
                                                            {/* <h1 >{user.url}</h1> */}
                                                            <div className="w-full">
                                                                <button className='w-full text-lg font-semibold'>
                                                                    <a className={`flex bg-gradient-to-l from-blue-200 to-green-1000 text-white py-2 w-full justify-center text-center rounded-lg`} target="_blank" href={user.url}>Vamos Lá!</a>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )
                                            :
                                            (
                                                <>
                                                    <AnimationProps/>
                                                </>
                                            )
                                            
                                            }
                                        </>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
