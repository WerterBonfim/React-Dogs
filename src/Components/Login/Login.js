import React from 'react'
import { Routes, Route } from 'react-router-dom'

import LoginForm from './LoginForm';
import LoginCreate from './LoginCreate';
import LoginPasswordLost from './LoginPasswordLost';
import LoginPasswordRest from './LoginPasswordRest';



const Login = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="criar" element={<LoginCreate />} />
                <Route path="perdeu" element={<LoginPasswordLost />} />
                <Route path="resetar" element={<LoginPasswordRest />} />
            </Routes>
        </div>
    )
}

export default Login;
