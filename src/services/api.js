import axios from 'axios';

const api = axios.create({
    aseURL: "https://rickandmortyapi.com/api"
});

export default api;