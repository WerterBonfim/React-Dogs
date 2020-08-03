import React from 'react';
import styles from './Home.module.css'

import Head from './Helper/Head';


import Feed from './Feed/Feed';


const Home = () => {
    return <section className={`container mainContainer ${styles.home}`}>
        <Head 
            title="Fotos" 
            description="Home do site Dogs, com o feed de fotos."
        />
        <Feed />
        
    </section>

}

export default Home;
