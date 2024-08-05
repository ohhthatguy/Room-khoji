import axios from 'axios'
// import { getAccessToken } from '../utils/getAccessToken'
axios.defaults.withCredentials = true

const API_OBJECT = {
    createNewAccount: {method: 'post', url: '/create/newAccount'},
    login: {method: 'post', url: '/login'},
    saveProfilePicture: {method: 'post', url: '/create/profile'},
    getProfilePicture: {method:'get', url: '/getProfile'},
    getUser: {method: 'get', url: '/user'},
    getProductPicture: {method: 'post', url: '/save/product/picture'},
    savePost: {method: 'post', url: '/save/post'},
    getPostsOfId: {method: 'get', url: '/get/post', params: true}

}


const axiosInstance = axios.create({
    baseURL: 'http://localhost:6969',
    timeout: 10000

})

const getType =(value,body)=>{
    if(value.params){
        // console.log(value)
        // console.log("IM here")
        return {params: body}
    }else if(value.query){
    
        //   if(typeof body == 'object'){
        //     // console.log(body)
          
        //     return {query: body._id}
        // }
        return body

   
    }else{
        return {}
    }
}

    

// }


axiosInstance.interceptors.request.use(
    function (config){ 
        
        if(config.type.params){
            config.params = config.type.params
        }else if(config.type.query){
            config.url = config.url + '/' + config.type.query
        }

        return config
    },
    function (err){  //this function activates when request( from frontend) fails
        return Promise.reject(err)
    }
)

axiosInstance.interceptors.response.use(
    function (response){ //this function activates when response( from backend) is successful
        return  {isSuccess: true, data: response.data}  
    },
   
    function (error){  //this function activates when response( from backend) fails
// console.log(error)
        if (error.response) {
            // Server responded with a status other than 2xx
            return Promise.reject({
                isSuccess: false,
                // msg: error.response.data.message || 'Error occurred while fetching response from server',
                code: error.response.status,
                data: error.response.data
            });
        } else if (error.request) {
            // The request was made but no response was received
            return Promise.reject({
                isSuccess: false,
                msg: 'No response received from server',
                code: 500
             
            });
        } else {
            // Something happened in setting up the request that triggered an Error
            return Promise.reject({
                isSuccess: false,
                msg: error.message,
                code: 500
            });
        }
    }
    
)


const API = {}

for(const [key,value] of Object.entries(API_OBJECT)){
    API[key] = (body) => {
    //  console.log(body)
        return axiosInstance({ 
            method: value.method,
            url: value.url,
            data: body,
            // ,
            // headers: {
            //     authorization: getAccessToken()
            // }
            // ,
            type: getType(value,body)
           
        })
    }
}
                    
export {API}
