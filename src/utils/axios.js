import axios from "axios"
import Config from "./config"

const api = axios.create({
    baseURL: Config.baseURL,
    timeout: 3000
})

api.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    const userId = JSON.parse(localStorage.getItem('userInfo')) || {}
    if (userId) {
        config.headers.user = userId._id
    }
    return config;
}, function(error) {
    // 对请求错误做些什么
    console
    return Promise.reject(error);
});

// 添加响应拦截器
api.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    return response;
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

const post = async function(url, data) {
    const response = await api.post(url, data).catch(error => {
        errorHandle(error)
    })
    return responseHandler(response)
}
const get = async function(url, data) {
    const response = await api.get(url, data).catch(error => {
        errorHandle(error)
    })
    return responseHandler(response)
}
const del = async function(url, data) {
    const response = await api.request({ method: 'delete', url, data }).catch(error => {
        errorHandle(error)
    })
    return responseHandler(response)
}
const put = async function(url, data) {
        const response = await api.put(url, data).catch(error => {
            errorHandle(error)
        })
        return responseHandler(response)
    }
    /* 统一处理返回体 */
const responseHandler = (response) => {
    if (response && response.status === 200) {
        if (!response.data) {
            return {}
        } else {
            return response.data
        }
    } else {
        return null
    }
}

const errorHandle = (error) => {
    let errorMsg = error.response && error.response.data && error.response.data.message || '请求错误，请重试！'
    alert(errorMsg)
    console.log('///', errorMsg)
}
export { post, get, put, del }