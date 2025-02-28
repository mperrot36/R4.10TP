import { useState, useEffect } from 'react';
function useFetch(url) {
    const [data, setData] = useState(null); // gere les données
    const [loading, setLoading] = useState(true); // gère l'état du chargement
    const [error, setError] = useState(null); // les eventuelles erreurs
    //A chaque modification de l'url l'effet sera lancé
    useEffect(() => {
        //Chargement des donnés en mode asynchrone bien sur :-)
        async function fetchData() {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchData(); //lancement du chargement des données
    }, [url]);
    return { data, loading, error }; //on export nos 3 variables
}
export default useFetch;