import React from 'react'
import { Link } from 'react-router-dom'

const LoginForm = () => {
    return (
        <div>
            <h1>Login</h1>
            <Link to="/login/criar">Cadastro</Link>
        </div>
    )
}

export default LoginForm;
