import { createContext, ReactNode, useEffect, useState } from "react";
import {auth, database, firebase} from '../service/firebase.js'

type User = {
    id: string;
    name: string;
    emailEnv: string | null;
    avatar: string;
  }
  
  type AuthContextType = {
    user: User | undefined;
    handleLoginGoogle: () => Promise<void>;
  }

  type AuthContextProviderProps = {
    children: ReactNode;
  }

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps){

  const [user, setUser] = useState<User>();
  // const navigate = useNavigate();

  useEffect(()=>{
    const unsubscriber = auth.onAuthStateChanged(user =>{
      if(user){
        // console.log(user)
        const {displayName, photoURL, uid, email} = user

        if(!displayName || !photoURL){
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          emailEnv: email,
          avatar: photoURL
        })
      }
    })

    return ()=>{
      unsubscriber();
    }
  },[]);

  async function handleLoginGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);
      // console.log(result);
      if (result.user){
        const {displayName, photoURL, uid, email} = result.user

        if(!displayName || !photoURL){
          throw new Error('Missing information from Google Account.')
        }
        //registra no firebase
        const usernewRefGoogle = database.ref('newUserInformation');
        const firebaseNew = await usernewRefGoogle.push({
            user: displayName,
            email: email,
            authoId: uid
        })

        setUser({
          id: uid,
          name: displayName,
          emailEnv: email,
          avatar: photoURL
        })
      }
  }

    return(
        <AuthContext.Provider value={{user, handleLoginGoogle}}>
            {props.children}
        </AuthContext.Provider>
    );
}