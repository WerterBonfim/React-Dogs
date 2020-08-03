import React, { useState } from 'react';

import styles from './PhotoCommentsForm.module.css';

import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';

import { COMMENT_POST } from '../../api';

import { ReactComponent as Enviar } from '../../Assets/enviar.svg';

const PhotoCommentsForm = ({ id, setComments, single }) => {

    const [comment, setComment] = useState('');
    const { request, erro, loading } = useFetch();

    async function handlerSubmit(event) {
        event.preventDefault();
        const { url, options } = COMMENT_POST(id, { comment });

        const { response, json } = await request(url, options);
        if (response.ok) {
            setComment('');
            setComments((comments) => [...comments, json]);
        }
    }

    return <form onSubmit={handlerSubmit} className={`${styles.form} ${single ? styles.single : ''}`} >

        <textarea
            className={styles.textarea}
            disabled={loading}
            id="comment"
            name="comment"
            placeholder="Commente..."
            value={comment}
            onChange={({ target }) => setComment(target.value)}
        ></textarea>

        <button className={styles.button} >
            <Enviar />
        </button>

        <Error error={erro} />

    </form>

}

export default PhotoCommentsForm;
