<template>
	<view>
		<h1>播放歌曲</h1>
		<view class="page-body">
			<view class="page-section page-section-gap" style="text-align: center;">
				<audio style="text-align: left" :src="current.src" :poster="current.poster" :name="current.name" :author="current.author" :action="audioAction" controls></audio>
			</view>
			<image :src="current.image" alt="歌曲图片"></image>
			<pre>{{ current.lyric }}</pre>
		</view>
	
	</view>
</template>

<script>
import { song } from '../../models/song.js';

export default {
	data() {
		return {
			current: {
				poster: '',
				name: '',
				author: '',
				src: '',
				image: '',
				lyric: ''
			},
			audioAction: {
				method: 'pause'
			}
		}
	},
	methods: {
		async loadSong(songId) {
			try {
				const songRes = await song.getsongs(songId);
				const imageRes = await song.getsongsimage(songId);
				const messageRes = await song.getsongsmessage(songId);

				if (songRes && songRes.code === 200 && imageRes && imageRes.code === 200 && messageRes && messageRes.code === 200) {
					this.current.src = songRes.data[0].url;
					this.current.poster = this.$route.query.poster || '';
					this.current.name = this.$route.query.name || '';
					this.current.author = this.$route.query.author || '';
					this.current.image = imageRes.songs[0].al.picUrl; // 设置歌曲图片地址
					this.current.lyric = messageRes.lrc.lyric || ''; // 设置歌曲歌词
				} else {
					console.error('获取音乐信息失败');
				}
			} catch (error) {
				console.error('获取音乐异常', error);
			}
		}
	},
	created() {
		// 在页面创建时调用加载音乐的方法，并传入歌曲ID
		this.loadSong(this.$route.query.id);
	}
}
</script>

<style>
	
</style>
