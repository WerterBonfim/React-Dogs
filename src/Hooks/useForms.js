import { useState } from 'react'

const validacao = {
    email: {
        regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        mensagem: 'Preencha um email válido'
    },
    number: {
        regex: /^\d{1,}$/,
        mensagem: 'Utilize numeros apenas'
    }
    
}

const useForms = (type) => {

    const [value, setValue] = useState('');
    const [error, setError] = useState(null);

    const 
        validacaoExiste = (type) => !!validacao[type],
        naoPassouNoRegex = (type, valor) => !validacao[type].regex.test(valor)
        ;

    function eValido(value) {
        
        if (type === false) return true;

        if (value.length === 0) {
            setError('Preenchar um valor');
            return false;
        }

        
        if (validacaoExiste(type) && naoPassouNoRegex(type, value)){
            setError(validacao[type].mensagem);
            return false;
        }
        
        setError(null);
        return true;

     }

    function onChange({ target }) {
        if (error) eValido(target.value);
        setValue(target.value);
    }

    return {
        value,
        setValue,
        onChange,
        error,
        eValido: () => eValido(value),
        onBlur: () => eValido(value)        
    }
}

export default useForms;
