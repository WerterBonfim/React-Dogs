import React, { useEffect } from 'react';

import styles from './FeedModal.module.css';

import useFetch from '../../Hooks/useFetch';
import useKeyboard from '../../Hooks/useKeyboard';

import { PHOTO_GET } from '../../api';

import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PhotoContent from '../Photo/PhotoContent'

const FeedModal = ({ photo, setModalPhoto }) => {

    const { data, erro, loading, request } = useFetch();
    const { keyPressed } = useKeyboard( { keyWatch: 'Escape', eventName: 'keydown'});

    function handleOutsideClick(event) {
        if (event.target === event.currentTarget) {
            setModalPhoto(null);
        }

    }

    useEffect(() => {

        const { url, options } = PHOTO_GET(photo.id);
        request(url, options);

    }, [photo, request]);

    // Fecha modal quando aperta o esq
    useEffect(() => {

        if (keyPressed)
            setModalPhoto(null);

    }, [keyPressed, setModalPhoto]);

    return (
        <div className={styles.modal} onClick={handleOutsideClick} >
            {erro && <Error error={erro} />}
            {loading && <Loading />}
            {data && <PhotoContent data={data} />}

        </div>
    )
}

export default FeedModal;
