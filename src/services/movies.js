import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL + '/api/v1/movies';

class MovieDataService {
    getAll(page = 0) {
        return axios.get(`${BASE_URL}?page=${page}`);
    }

    getOne(id) {
        return axios.get(`${BASE_URL}/id/${id}`);
    }

    find(query, by = 'title', page = 0) {
        return axios.get(`${BASE_URL}?${by}=${query}&page=${page}`);
    }

    getRatings() {
        return axios.get(`${BASE_URL}/ratings`);
    }

    collectFavorites(data) {
        console.log(data);
        return axios.post(`${BASE_URL}/collection`, data);
    }

    createReview(data) {
        return axios.post(`${BASE_URL}/review`, data);
    }

    editReview(data) {
        return axios.put(`${BASE_URL}/review`, data);
    }

    deleteReview(data) {
        return axios.delete(`${BASE_URL}/review`, { data: data });
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new MovieDataService();
