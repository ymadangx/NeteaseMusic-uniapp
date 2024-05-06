import {  
    config  
} from "../config/config.js";  
  
import {  
    promisic  
} from "./util.js";  
  
class Http {  
  
    static async request({  
        url,  
        data,  
        method = "GET",  
        headers = {} // 将 header 参数名称修改为 headers  
    }) {  
        const defaultHeaders = {  
            'Content-Type': 'application/json', // 默认请求头  
        };  

        // 使用展开运算符合并 headers  
        const finalHeaders = { ...defaultHeaders, ...headers };  
  
        // 使用合并后的 headers  
        const res = await promisic(uni.request)({  
            url: `${config.apiBaseurl}${url}`,  
            data,  
            method,  
            header: finalHeaders // 如果 uni.request 要求的字段是 header，这里应该保持一致  
        });  
  
        return res.data;  
    }  
  
}  
  
export {  
    Http  
};