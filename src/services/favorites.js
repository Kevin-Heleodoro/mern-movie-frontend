import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL + '/api/v1/movies';

class FavoriteDataService {
    getAll(id) {
        return axios.get(`${BASE_URL}/favorites/${id}`);
    }

    updateFavorites(data) {
        return axios.put(`${BASE_URL}/favorites`, data);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new FavoriteDataService();
