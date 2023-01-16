import React, {createContext, useState, useEffect} from 'react';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import { Header } from './screens/Header';
import { ConfirmPage } from './screens/ConfirmPage';
import { Home } from './screens/Home';
import {auth, firebase} from './service/firebase.js'
import { useNavigate } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            {/* <Route path="/Historys/:id" element={<Historys/>}/> */}
            {/* <Route path="/ConfirmPage" element={<ConfirmPage/>}/> */}
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
