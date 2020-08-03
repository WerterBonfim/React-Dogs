import React, { useEffect } from 'react';

import styles from './FeedPhotos.module.css';

import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from "../../api";

import FeedPhotosItem from './FeedPhotosItem';
import Loading from '../Helper/Loading';
import Error from '../Helper/Error';

const FeedPhotos = ({ page, user = 0, total = 6, setModalPhoto, setScrolInfinitoLigado }) => {

    const { data, loading, erro, request } = useFetch();

    useEffect(() => {
        async function fetchPhotos() {
            

            const { url, options } = PHOTOS_GET({ page, total, user });
            const { response, json } = await request(url, options);

            if (response && response.ok && json.length < total)
                setScrolInfinitoLigado(false)

        }

        fetchPhotos();

    }, [request, user, page, setScrolInfinitoLigado, total]);


    if (erro) return <Error erro={erro} />
    if (loading) return <Loading />
    if (data)
        return <ul className={`animeLeft ${styles.feed}`}>
            {
                data.map(photo =>
                    <FeedPhotosItem
                        key={photo.id}
                        photo={photo}
                        setModalPhoto={setModalPhoto}
                    />
                )
            }
        </ul>

    else return null;

}

export default FeedPhotos;
