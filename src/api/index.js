import axios from 'axios'

export default axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    'API-KEY': '6ac2f7da-6ba0-4410-afba-ed686221a25f'
  },
});
