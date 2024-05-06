<template>
  <view>
    <view class="status_bar"></view>
    <!-- topbar -->
    <view class="tabbar container30"><top-bar3 /></view>
    <view class="status_bar"><!-- 状态栏 --></view>
    <!-- search-global -->
    <search-global
      ref="globalSearch"
      :placeholder="placeholder"
      @inputConfrim="inputConfirm"
      @inputValue="handleInputValue"
      @empty="empty"
      class="search-global"
      @clickRight="handleClickRight"
    ></search-global>
    <!-- 模糊搜索列表 -->
    <search-suggest v-if="searchKeyWord" :right="120" :searchKeyWord="searchKeyWord" :lists="suggestLists"></search-suggest>
    <view class="main">
      <scroll-view class="scroll-view-y" scroll-y="true" @scroll="scroll">
        <!-- ad -->
        <view class="ad flex-center container" @click="inputConfirm">
          <button @click="handleClickRight">搜索</button>
        </view>
        <!-- history -->
        <view class="history" v-if="records.length">
          <view class="title flex-bet container">
            <view class="text font30 fontb">历史记录</view>
            <i class="iconfont hd-left-icon icon-love" @click="open"></i>
          </view>
          <!-- 搜索 记录 -->
          <scroll-view class="scroll-view-x records" scroll-x="true">
            <view class="record font28" v-for="(item, index) in records" :key="index">{{ item }}</view>
          </scroll-view>
        </view>
        <!-- 热搜榜 -->
        <view class="hot">
          <view class="title flex-bet container"><view class="text font30 fontb">热搜榜</view></view>
          <view class="hot-lists container">
            <view class="list flex-bet" v-for="(list, index) in hotLists" :key="index">
              <view class="left flex">
                <view class="rank-num" :class="{ red: index <= 2 }">{{ index + 1 }}</view>
                <view class="info">
                  <view class="hd">
                    <view class="search-word font28 flex" :class="{ fontb: index <= 2 }">{{ list.searchWord }}</view>
                  </view>
                  <view class="content font24">{{ list.content }}</view>
                </view>
              </view>
              <view class="score font24">{{ list.score }}</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <show-modal ref="showModal" @rightBtn="clearHistory"></show-modal>
  </view>
</template>

<script>
import { Search } from '../../models/search.js';
import searchSuggest from '@/components/searchSuggest/searchSuggest.vue';
import showModal from '@/components/showModal/showModal.vue';
import searchGlobal from '@/components/searchGlobal/searchGlobal.vue';
import topBar3 from './components/topBar3.vue';

export default {
  components: { searchSuggest, showModal, searchGlobal, topBar3 },
  data() {
    return {
      searchKeyWord:'',
      hotLists: [],
      suggestLists: [], // 推荐搜索
      placeholder: '',
      records: ['杀死哪个石家庄人', '草东没有排队', '山海', '万能青年旅店', '周杰伦']
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    scroll(event) {
    },
    async init() {
      // 默认搜索关键词
      const searchWord = await Search.getSearchDefault();
      // 获取热搜列表
      const hotLists = await Search.getSearchHotDetail();
      this.placeholder = searchWord.data.realkeyword;
      console.log(searchWord.data);
      this.hotLists = hotLists.data;
      console.log(hotLists.data);
    },
    async getSearchSuggest(word) {
      // 搜索建议
      const suggest = await Search.getSearchSuggest(word);
      this.suggestLists = suggest.result.allMatch;
    },
    async getSearchMultimatch(word) {
      const data = await Search.getSearchMultimatch(word);
      console.log(data);
    },
    inputConfirm() {
      //输入确认按钮 input 为空时使用默认值
      this.searchKeyWord ? this.getSearchMultimatch(this.searchKeyWord) : this.getSearchMultimatch(this.placeholder);
    },
    empty() {
      // 清空inputvalue
      this.searchKeyWord = '';
    },
    open() {
      // open popup
      this.$refs.showModal.open();
    },
    clearHistory() {
      //确认清空历史记录
      this.records = [];
    },
    handleInputValue(value) {
      // 处理 inputValue 事件，并更新搜索建议或其他逻辑  
      this.searchKeyWord = value;  
      // 现在您可以在父组件中使用 this.parentSearchKeyWord  
      console.log("searchKeyWord in parent:", this.searchKeyWord);  
      // 调用其他方法或进行其他逻辑处理  
      this.getSearchSuggest(value);   
    },
    async handleClickRight(Value) {
      console.log(this.searchKeyWord)
      console.log('搜索'+this.searchKeyWord)
      const searchenddate = await Search.getsearchsong(this.searchKeyWord);
   // console.log(JSON.stringify(searchenddate));
 // console.log(JSON.stringify("2"+this.searchenddate));  
	// this.$router.push({ name: 'player_list', params: { jieguo } });
	uni.redirectTo({
	  url: '../../pages/player_list/player_list?searchenddate=' + encodeURIComponent(JSON.stringify(searchenddate))  
		// params: {
		//       searchenddate: JSON.stringify(this.searchenddate)
		//     }
	});
    }
  }
};
</script>

<style scoped>
.container {
  margin: 0 30rpx;
}

.search-global {
  height: 75rpx;
}

.main {
  height: calc(100vh - 75rpx - var(--status-bar-height));
}

.main .scroll-view-y {
  height: 100%;
}

.ad {
  border: 1rpx solid #dcdbdb;
  border-radius: 10rpx;
  background: #f6f5f0;
  height: 100rpx;
  color: lightcoral;
  margin: 40rpx 30rpx 40rpx;
}

.main .history .records {
  white-space: nowrap;
  margin-left: 30rpx;
  margin: 20rpx 30rpx 60rpx;
}

.history .records .record {
  display: inline-block;
  margin-right: 20rpx;
  background: #f3f3f3;
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
}

.hot .rank-num.red {
  color: #f73f3d !important;
}

.hot .hot-lists .list {
  margin: 30rpx 0;
}

.hot .hot-lists .rank-num {
  color: #999999;
  margin-right: 30rpx;
}

.hot .hot-lists .content {
  color: #a3a3a3;
  margin-top: 10rpx;
}

.hot .hot-lists .score {
  color: #dedede;
}

.tabbar {
  height: 100rpx;
}
</style>
