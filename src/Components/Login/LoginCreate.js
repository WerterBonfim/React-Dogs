import React from 'react';

import useForms from '../../Hooks/useForms';

import Input from '../Forms/Input';
import Button from '../Forms/Button';

const LoginCreate = () => {

    const username = useForms();
    const email = useForms('email');
    const password = useForms();

    const controles = [username, email, password];

    function handleSubmit(event){
        event.preventDefault();

        const algumCampoInvalido = controles
            .map(x => x.eValido())
            .some((x) => x === false);

        if (algumCampoInvalido)
            return;
            
        console.log('deu certo')
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
