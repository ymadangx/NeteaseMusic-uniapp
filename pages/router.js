import Vue from 'vue';
import Router from 'vue-router';
import player_list from '@/pages/player_list/player_list'; // 导入你的组件

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/pages/player_list/player_list',
      name: 'player_list',
      component: player_list,
      meta: {
        title: 'Player List', // 可选，页面标题
      },
    },

  ],
});

export default router;
