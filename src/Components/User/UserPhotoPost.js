import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './UserPhotoPost.module.css';

import useForms from '../../Hooks/useForms';
import useFetch from '../../Hooks/useFetch';

import Input from '../Forms/Input'
import Button from '../Forms/Button'
import Error from '../Helper/Error'

import { PHOTO_POST } from '../../api';
import Head from '../Helper/Head';



const UserPhotoPost = () => {

    const nome = useForms();
    const peso = useForms('number');
    const idade = useForms('number');
    const controles = [
        nome, peso, idade
    ];

    const [img, setImg] = useState({})
    const { data, erro, loading, request } = useFetch();
    const navigate = useNavigate();


    useEffect(() => {
        if (data) navigate('/conta');
    }, [data, navigate]);


    function handleSubmit(event) {

        event.preventDefault();

        const algumCampoInvalido = controles
            .map(x => x.eValido())
            .some((x) => x === false);

        if (algumCampoInvalido)
            return;


        const formData = new FormData();

        formData.append('img', img.raw);
        formData.append('nome', nome.value);
        formData.append('peso', peso.value);
        formData.append('idade', idade.value);

        const token = window.localStorage.getItem('token');
        const { url, options } = PHOTO_POST(formData, token);
        request(url, options)


    }

    function handleImgChange({ target }) {

        setImg({
            preview: URL.createObjectURL(target.files[0]),
            raw: target.files[0]
        });
    }

    return <section className={`${styles.photoPost} animeLeft`} >
        
        <form onSubmit={handleSubmit}>
            <Head title="Post sua foto" />
            <Input label="Nome" type="text" nome="nome" {...nome} />
            <Input label="Peso" type="number" nome="peso" {...peso} />
            <Input label="Idade" type="number" nome="idade" {...idade} />
            <input 
                className={styles.file}
                type="file" 
                name="img" 
                id="img" 
                onChange={handleImgChange} 
            />

            {loading ?  
                <Button disabled>Enviando...</Button> :
                <Button>Enviar</Button>
            }

            <Error error={erro} />
        </form>

        <>
            {img.preview && (
                <div 
                    className={styles.preview} 
                    style={{ backgroundImage: `url('${img.preview}')` }} ></div>
            )}
        </>

    </section>

}

export default UserPhotoPost;
