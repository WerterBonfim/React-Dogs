import React, { useEffect } from 'react';

import useFetch from '../../Hooks/useFetch';

import Head from '../Helper/Head';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';

import { STATS_GET } from '../../api';
//import UserStatsGraphs from './UserStatsGraphs';

const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'));


const UserStats = () => {

    const { data, erro, loading, request } = useFetch();


    useEffect(() => {

        async function getData() {
            const { url, options } = STATS_GET();
            await request(url, options);

        }

        getData();

    }, [request]);

    if (loading) return <Loading />
    if (erro) return <Error error={erro} />
    if (data) return <React.Suspense fallback={ <div></div> }>
        <Head title="Estatísticas" />
        <UserStatsGraphs data={data} />
    </React.Suspense>
    else return null;

}

export default UserStats;
