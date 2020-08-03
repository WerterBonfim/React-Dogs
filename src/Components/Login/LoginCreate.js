import React, { useContext } from 'react';

import { UserContext } from '../../UserContext';

import useForms from '../../Hooks/useForms';
import useFetch from '../../Hooks/useFetch';

import Input from '../Forms/Input';
import Button from '../Forms/Button';

import { USER_POST } from '../../api';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

const LoginCreate = () => {

    const { userLogin, loading: loadingUsuario } = useContext(UserContext);
    const { loading: loadingRequisicao, erro, request } = useFetch();

    const username = useForms();
    const email = useForms('email');
    const password = useForms();

    const
        controles = [username, email, password],
        estaCarregando = () => loadingRequisicao || loadingUsuario;
    ;




    async function handleSubmit(event) {
        event.preventDefault();

        const algumCampoInvalido = controles
            .map(x => x.eValido())
            .some((x) => x === false);

        if (algumCampoInvalido)
            return;

        const { url, options } = USER_POST({
            username: username.value,
            email: email.value,
            password: password.value
        });

        const { response } = await request(url, options);

        if (response.ok) {
            userLogin(username.value, password.value);
            return;
        }

        //userLogin()


    }


    return <section className="animeLeft">
        <Head title="Crie sua conta" />
        <h1 className="title" >Cadastre-se</h1>
        <form onSubmit={handleSubmit}>
            <Input label="Usuário" type="text" nome="username" {...username} />
            <Input label="Email" type="text" nome="email" {...email} />
            <Input label="Senha" type="password" nome="password" {...password} />
            {estaCarregando() ? 
                (<Button disabled >Aguarde...</Button>) :
                (<Button>Cadastrar</Button>)
            }
            <Error error={erro} />

        </form>
    </section>
}

export default LoginCreate;
