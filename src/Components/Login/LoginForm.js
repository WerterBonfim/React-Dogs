import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../UserContext';

import styles from './LoginForm.module.css';
import stylesButton from '../Forms/Button.module.css';

import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForms from '../../Hooks/useForms';
import Error from '../../Components/Helper/Error';




const LoginForm = () => {

    const { userLogin, error, loading } = useContext(UserContext);

    const username = useForms();
    const password = useForms();


    async function handlerSubmit(event) {
        event.preventDefault();

        if (!username.eValido() || !password.eValido())
            return;

        userLogin(username.value, password.value);

    }


    return (
        <section className={`animeLeft`} >
            <h1 className='title' >Login</h1>
            <form className={styles.form} onSubmit={handlerSubmit}>

                <Input label="Usuário" nome="username" type="text" {...username} />
                <Input label="Senha" nome="password" type="password" {...password} />

                {!!loading && (<Button disabled >Carregando...</Button>)}
                {!!!loading && (<Button>Entrar</Button>)}
                <Error error={error} />

            </form>
            <Link className={styles.perdeu} to="/login/perdeu">Perdeu a Senha ?</Link>
            <div className={styles.cadastro}>
                <h2 className={styles.subtitle} >Cadastre-se</h2>
                <p>Ainda não possui conta ? Cadatre-se no site.</p>
            </div>            
            <Link className={stylesButton.button} to="/login/criar">Cadastro</Link>
        </section>
    )
}

export default LoginForm;
