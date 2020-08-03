import React, { useState, useEffect } from 'react';
import UserHeaderNav from './UserHeaderNav'

import styles from './UserHeader.module.css'
import { useLocation } from 'react-router-dom';


const UserHeader = () => {

    const [title, setTitle] = useState('');
    const { pathname } = useLocation();

    const urls = {
        "/conta/estatistica": "Estatística",
        "/conta/postar": "Poste Sua Foto"
    }

    useEffect(() => {
        
        const titulo = urls[pathname.toLowerCase()] ?? 'Minha Conta';
        setTitle(titulo);


    }, [pathname, urls]);

    return <header className={styles.header}>
        <h1 className="title" >{title}</h1>
        <UserHeaderNav />
    </header>
}

export default UserHeader;
