import React, { useEffect, useContext } from 'react';
import queb from '../assets/queb2.jpg';
import Typewriter from 'typewriter-effect';
import { Button } from '../components/Button101/Button';
import {auth, database, firebase} from '../service/firebase.js'
import { AuthContext } from '../contexts/AuthContext';
import { getDatabase, ref, onValue} from "firebase/database";
import { useAuth } from '../hooks/useAuth';
import { Header } from './Header';
import { Checks, EnvelopeSimple } from "phosphor-react";

export function ConfirmPage(){

    const {user, handleLoginGoogle} = useAuth();



    useEffect(()=>{
        const db = getDatabase();
        const starCountRef = ref(db, 'newUserInformation');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data)
        });
    },[])

    return(
        <div className="w-full h-auto">
            <div className="pt-12">
                <Header textX='3xl' imgX='h-32 w-40'/>
            </div>
            <div className="flex w-full h-screen max-[800px]:inline max-[800px]:h-auto">
                <div className="flex pt-24 w-1/2 align-center justify-center max-[800px]:w-full">
                    <div className="p-5 align-center justify-center">
                        <div className="flex align-center justify-center items-center">
                            <Checks size={52} color="#1DEB70" />
                            <h1 className="text-3xl font-bold text-center">Acesso adquirido </h1>
                        </div>
                        <div className="pb-9 flex align-center justify-center items-center pt-4">
                            <h1 className="text-2xl text-center text-gray-200">Algumas informações foram enviadas para o seu E-mail</h1>
                            <EnvelopeSimple size={52}/>
                        </div>           
                        
                        <h1 className=" text-gray-200">Caso possua alguma duvida, pode estar entrando em contato comigo através das redes sociais</h1>
                        <div className="flex align-center justify-center">
                            <h1>img</h1>
                            <h1>img</h1>
                        </div>
                    </div>
                </div>
                <div className="flex pt-24 w-1/2 align-center justify-center max-[800px]:w-full">
                    <div className="w-3/5 h-fit p-8 border border-gray-300 rounded bg-gradient-to-tr from-transparent to-blue-500 max-[800px]:w-4/5">
                        <h1>Teste</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}