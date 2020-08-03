import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import { PASSWORD_RESET } from '../../api';


import useFetch from '../../Hooks/useFetch';
import useForm from '../../Hooks/useForms';

import Input from '../../Components/Forms/Input';
import Button from '../../Components/Forms/Button';
import Error from '../../Components/Helper/Error';
import Head from '../Helper/Head';

const LoginPasswordReset = () => {

    const { loading, erro, request } = useFetch();
    const password = useForm();
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [key, setKey] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        if (!password.eValido())
            return;

        const { url, options } = PASSWORD_RESET({
            login,
            key,
            password: password.value
        });

        const { response } = await request(url, options);
        if (response && response.ok)
            navigate('/login');

    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const key = params.get('key');
        const login = params.get('login');

        if (key) setKey(key);
        if (login) setLogin(login);
        
    }, []);

    return (
        <section className="animeLeft" >
            <h1 className="title" >Resete a Senha</h1>
            <form onSubmit={handleSubmit} >
                <Head title="Resete a senha" />

                <Input label="Nova Senha" type="password" name="password" {...password} />
                {loading ?
                    (<Button disabled >Resetando...</Button>) :
                    (<Button>Resetar</Button>)
                }


            </form>
            <Error error={erro} />

        </section>
    )
}

export default LoginPasswordReset;
