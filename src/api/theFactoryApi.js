import axios from "axios";

const theFactoryApi= axios.create({
    baseURL:"/api"
})


export default theFactoryApi