import { useEffect, useState } from 'react';

const Fetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        
        fetch(url, { signal: abortCont.signal })
        .then(res => {
            if(!res.ok) {
                throw Error('Could not fetch data for that resource.');

            }
            return res.json();
        })
        .then((data) => {
            setData(data);
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            if (err.anme === 'AbortError') {
                console.log('Fetch Aborted.');
            } else {
                setIsPending(false);
                setError(err.message);
            }
        })
        
        setTimeout(() => {
            return () => abortCont.abort();
        }, 100);
        
    }, [url]);

    return { data, isPending, error };
};

export default Fetch;