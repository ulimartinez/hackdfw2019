import { create } from 'apisauce'
const createAPI = (baseURL) => {
    const api = create({
        baseURL: baseURL,
        timeout: 10000,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });
    const getItems = () =>
        api.get('/shopping');
    const createItem = data => api.post('/shopping', data);
    return {
        getItems,
        createItem
    };
};

export default createAPI;