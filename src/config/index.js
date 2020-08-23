import axios from 'axios';

export default axios.create({
     baseURL: 'http://94.130.172.45:8000/api/v1/',
     headers: { 'Content-Type': 'application/json' },
     responseType: 'json',
});
