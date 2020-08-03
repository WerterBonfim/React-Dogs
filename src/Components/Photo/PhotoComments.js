import React, { useState, useContext, useRef, useEffect } from 'react';

import styles from './PhotoComments.module.css';

import { UserContext } from '../../UserContext';
import PhotoCommentsForm from './PhotoCommentsForm';

const PhotoComments = (props) => {

    const { login } = useContext(UserContext);

    const [comments, setComments] = useState(() => props.comments);
    const commentsSection = useRef(null);

    useEffect(() => {

        commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
        
    }, [comments]);

    return (
        <>
            <ul ref={commentsSection} className={`${styles.comments} ${props.single ? styles.single : ''}`}>

                {comments.map(comment =>

                    <li key={comment.comment_ID}>
                        <b>{comment.comment_author}: </b>
                        <span>{comment.comment_content}</span>
                    </li>
                )}

            </ul>
            <div>
                {login && <PhotoCommentsForm single={props.single} id={props.id} setComments={setComments} />}
            </div>
        </>
    )
}

export default PhotoComments;

