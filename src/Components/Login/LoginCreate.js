import React, { useContext } from 'react';

import useForms from '../../Hooks/useForms';
import { UserContext } from '../../UserContext';

import Input from '../Forms/Input';
import Button from '../Forms/Button';

import { USER_POST } from '../../api';

const LoginCreate = () => {

    const username = useForms();
    const email = useForms('email');
    const password = useForms();

    const controles = [username, email, password];

    const { userLogin } = useContext(UserContext);

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

        console.clear();


        const response = await fetch(url, options);
        
        if (response.ok) {
            await userLogin(username.value, password.value);
            return;
        }

        console.log('email já cadastrado')





        //userLogin()


    }


    return <section className="animeLeft">
        <h1 className="title" >Cadastre-se</h1>
        <form onSubmit={handleSubmit}>
            <Input label="Usuário" type="text" nome="username" {...username} />
            <Input label="Email" type="text" nome="email" {...email} />
            <Input label="Senha" type="password" nome="password" {...password} />
            <Button>Cadastrar</Button>
        </form>
    </section>
}

export default LoginCreate;
