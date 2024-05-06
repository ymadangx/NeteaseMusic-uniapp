import {
	Http
} from "../utils/http.js"
class song{
	static async getsongs(songId){
		return await Http.request({
		url: `/song/url?id=` + songId
		})
	}
	static async getsongsimage(songId){
		return await Http.request({
		url: `/song/detail?ids=` + songId
		})
	}
	static async getsongsmessage(songId){
		return await Http.request({
		url: `/lyric/new?id=` + songId
		})
	}
	
	
	
}
export {
	song
}
