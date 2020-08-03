import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom';

import { UserContext } from "../../UserContext";

import { ReactComponent as MinhasFotos } from "../../Assets/feed.svg";
import { ReactComponent as Estatistica } from "../../Assets/estatisticas.svg";
import { ReactComponent as AdicionarFoto } from "../../Assets/adicionar.svg";
import { ReactComponent as Sair } from "../../Assets/sair.svg";

import styles from './UserHeaderNav.module.css';
import useMedia from '../../Hooks/useMedia';

const UserHeaderNav = () => {

    const { userLogout } = useContext(UserContext);
    const [mobileMenu, setMobileMenu] = useState(false);    

    const eMobile = useMedia('(max-width: 40rem)');
    const { pathname } = useLocation();

    useEffect(() => {

        setMobileMenu(false);
        
    }, [pathname]);



    return (
        <>
            {eMobile && (
                <button
                    aria-label="Menu"
                    className={`
                    ${ styles.mobileButton} 
                    ${ mobileMenu ? styles.mobileButtonActive : ''}
                    `}
                    onClick={() => setMobileMenu(!mobileMenu)}
                ></button>
            )}

            <nav className={`
                ${eMobile ? styles.navMobile : styles.nav}
                ${mobileMenu && styles.navMobileActive}
            `.trim()}>
                <NavLink to="/conta" end activeClassName={styles.active}>
                    <MinhasFotos />
                    {eMobile && 'Minhas Fotos'}
                </NavLink>

                <NavLink to="/conta/estatistica" activeClassName={styles.active}>
                    <Estatistica />
                    {eMobile && 'Estatísticas'}
                </NavLink>

                <NavLink to="/conta/postar" activeClassName={styles.active}>
                    <AdicionarFoto />
                    {eMobile && 'Adicionar Foto'}
                </NavLink>

                <button onClick={userLogout} >
                    <Sair />
                    {eMobile && 'Sair'}
                </button>
            </nav>
        </>
    )
}

export default UserHeaderNav;
