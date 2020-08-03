import React, { useState, useEffect } from 'react';

import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';

import PropTypes from 'prop-types';

const Feed = ({ user }) => {

    const [modalPhoto, setModalPhoto] = useState(null);
    const [pages, setPages] = useState([1, 2, 3, 4])
    const [scrolInfinitoLigado, setScrolInfinitoLigado] = useState(true);

    useEffect(() => {

        let aguardar = false;

        function infiniteScroll() {

            if (!scrolInfinitoLigado)
                return;

            const chegouNoFimDaPagina = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;

            if (chegouNoFimDaPagina && !aguardar) {

                setPages(x => [...x, x.length + 1]);
                aguardar = true;

                setTimeout(() => {
                    aguardar = false;
                }, 1000);

            }

        }

        window.onscroll = infiniteScroll;

        return () => {
            window.onscroll = null;
        }


    }, [scrolInfinitoLigado]);



    return <div>
        {modalPhoto &&
            <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
        }

        {pages.map(page =>
            <FeedPhotos
                key={page}
                page={page}
                user={user}
                setModalPhoto={setModalPhoto}
                setScrolInfinitoLigado={setScrolInfinitoLigado}
            />
        )}


    </div>

}

Feed.defaultProps = {
    user: 0
}

Feed.propTypes = {
    user: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired,
    ])
}

export default Feed;
