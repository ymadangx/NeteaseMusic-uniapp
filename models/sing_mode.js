import {
	Http
} from "../utils/http.js"
class sing_mode{
 async getPlaylistData(limit = 50) {  
        try {  
            const params = {  
                "limit":limit,  
            };  
            const response = await Http.request({  
                url: '/top/playlist', // 接口地址  
                params // 将参数添加到请求中  
            });  
            return response.data; 
        } catch (error) {  
            console.error('获取歌单分类时发生错误', error);  
            throw error; // 可以选择抛出错误以便调用者处理  
        }  
    }  
      
      
}  
  
export { sing_mode };