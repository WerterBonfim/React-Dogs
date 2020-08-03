import { useState, useCallback } from 'react'

const useFetch = () => {

    const [data, setData] = useState(null);
    const [erro, setErro] = useState(null);
    const [loading, setLoading] = useState(null);
    

    const request = useCallback(async (url, options) => {

        let response = null;
        let json = null;

        try {

            setErro(null);
            setLoading(true);

            response = await fetch(url, options);
            json = await response.json();

            if (response.ok === false)
                throw new Error(json.message);

        } catch (err) {

            json = null;
            setErro(err.message);

        } finally {

            setData(json);
            setLoading(false)
            return {
                response,
                json
            }
        }

    }, [],
    )


    return {
        data, 
        erro, 
        loading,
        request
    }
}

export default useFetch;
