import React from 'react';

import { PASSWORD_LOST } from '../../api';

import useFetch from '../../Hooks/useFetch';
import useForm from '../../Hooks/useForms';

import Input from '../../Components/Forms/Input';
import Button from '../../Components/Forms/Button';
import Error from '../../Components/Helper/Error';
import Head from '../Helper/Head';

const LoginPasswordLost = () => {

    const login = useForm();
    const { data, loading, erro, request } = useFetch();

    async function handlerSubmit(event) {
        event.preventDefault();

        if (!login.eValido())
            return;


        const { url, options } = PASSWORD_LOST({
            login: login.value,
            url: window.location.href.replace('perdeu', 'resetar')
        });

        await request(url, options);



    }


    return (
        <section className="animeLeft">
            <Head title="Perdeu a senha" />
            <h1 className="title" >Perdeu a senha?</h1>

            {data ?
                (
                    <p style={{ color: '#4c1' }} >{data}</p>
                ) :
                (
                    <form onSubmit={handlerSubmit} >
                        <Input
                            label="Email / Usuário"
                            type="text"
                            name="email"
                            {...login}
                        />

                        {loading ?

                            <Button disabled >Enviando...</Button> :
                            <Button>Enviar Email</Button>
                        }

                        <Error error={erro} />

                    </form>

                )
            }



        </section>
    )
}

export default LoginPasswordLost;
