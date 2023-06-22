import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

class MovieDataService {
    getAll(page = 0) {
        return axios.get(`${BASE_URL}/api/v1/movies?page=${page}`);
    }

    getOne(id) {
        return axios.get(`${BASE_URL}/api/v1/movies/id/${id}`);
    }

    find(query, by = 'title', page = 0) {
        return axios.get(
            `${BASE_URL}/api/v1/movies?${by}=${query}&page=${page}`
        );
    }

    getRatings() {
        return axios.get(`${BASE_URL}/api/v1/movies/ratings`);
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new MovieDataService();
