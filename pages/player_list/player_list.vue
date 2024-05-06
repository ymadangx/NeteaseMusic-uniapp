<template>  
  <div v-if="songlist.result"> 
    <h1>搜索列表</h1>  
    <uni-list :border="true">
      <uni-list-chat
        v-for="(song, index) in songlist.result.songs"
        :key="index"
        :title="song.name"
        :avatar-list="getAvatarList(song)"
        :note="song.artists[0].name"
        :clickable="true"
        @click="handleItemClick(song)"
      >
        <view class="chat-custom-right">
          <uni-icons type="star-filled" color="#999" size="18">
            <image :src="song.album.img1v1Url" style="width: 20px; height: 20px;"></image>
          </uni-icons>
        </view>
      </uni-list-chat>
    </uni-list>
  </div>  
</template>  
  
<script>  
export default {  
  data() {  
    return {  
      songlist: {}, // 将搜索结果存储在对象中  
      searchenddate: '' 
    };  
  },  
  methods: {
    getAvatarList(song) {
      // 歌手头像列表
      return song.artists.map(artist => {
        return { url: artist.img1v1Url };
      });
    },
    handleItemClick(song) {
      // 点击列表项触发事件，传递歌曲对象到目标页面
      uni.navigateTo({
        url: `../../pages/demo/demo?id=${song.id}&poster=${song.album.img1v1Url}&name=${song.name}&author=${song.artists[0].name}`
      });
    }
  },
  onLoad(option) {  
    if (option.searchenddate) {  
      this.searchenddate = decodeURIComponent(option.searchenddate);
      this.songlist = JSON.parse(this.searchenddate);  
      console.log(this.songlist);
    }  
  }  
};  
</script>

<style>
  .chat-custom-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
  
  .chat-custom-text {
    font-size: 12px;
    color: #999;
  }
</style>
