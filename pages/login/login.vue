<template>    
  <div>
	  <view class="main">
		  <view class="item">
			<view class="item_left" :class="{ active: mobile }">手机号:</view>
					<input v-model="phone" type="text" focus="true"  maxlength="11" class="phone_input"placeholder="请输入手机号"placeholder-style="color:#cccccc">    
			 </view>
		</view>
		
		<view class="item">
			<view class="item_ringht">验证码:</view>
				<input v-model="captcha" type="text"  placeholder="请输入验证码"placeholder-style="color:#cccccc"> 
		</view>
		<button class="btn_login" @click="sendVerificationCode">发送验证码</button> 
		<button class="btn_login" @click="verifyCaptcha">验证验证码</button> 
	</view>
  </div>    
</template>    
  
<script>    
import { User } from "../../models/user.js"; 
  
export default {    
  data() {    
    return {    
      phone: '',    
      captcha: '',   
	   mobile: false
    };    
  },    
  methods: {    
    async sendVerificationCode() {    
      if (!this.phone) {    
        uni.showToast({    
          title: '请输入手机号',    
          icon: 'none'    
        });    
        return;    
      }    
      try {    
        // 发送验证码  
        const response = await User.sendCode(this.phone);    
        if (response.data && response.data.success) {    
       
        } else {    
          uni.showToast({    
            title: '请输入验证码',    
            icon: 'none'    
          });    
        }    
      } catch (error) {    
        console.error('发送验证码出错:', error);    
        uni.showToast({    
          title: '发送验证码出错',    
          icon: 'none'    
        });    
      }    
    },    
    verifyCaptcha() {
      if (!this.captcha) {
        uni.showToast({
          title: '请输入验证码',
          icon: 'none'
        });
        return;
      }
      User.verifyCode(this.phone, this.captcha)
        .then(response => {
          if (response.data === true) {
            console.log(response.data);
            uni.showToast({
              title: '验证码验证成功',
              icon: 'success',
            });
            setTimeout(() => {
              uni.switchTab({
                url: '/pages/layout/layout'
              });
            }, 1500); 
          } else {
            uni.showToast({
              title: '验证码验证错误',
              icon: 'none'
            });
          }
        })
        .catch(error => {
          console.error('验证码验证出错:', error);
          uni.showToast({
            title: '验证码验证出错',
            icon: 'none'
          });
        });
    }

  }    
};    
</script>
<style scoped>  
.main {
		padding: 50rpx;
	}
	.item{
		display: flex;  /*设置布局方式。目的：让该样式标签下的子标签在一行显示*/
		padding:40rpx 5rpx 20rpx 5rpx ; /*内间距:上、右、下、左*/
		margin-bottom: 40rpx; /*下外间距*/
	}
	.item_left{
		margin-right: 50rpx; /*右外间距*/
		font-size: 35rpx;
		width: 120rpx;
		font-weight: 500;  /*字体加粗*/
	}
	/*样式名称为item的所有image标签拥有的样式*/
	.item_ringht{
		margin-left: 50rpx;
		width: 120rpx;
		font-weight: 500;  /*字体加粗*/
		font-size: 35rpx;
		margin-right: 50rpx;
		
		
	}
	
	/*==============*/
	.item_2{
		display: flex;
		justify-content: space-between;  /*两端对齐该样式标签下面的所有子标签*/
		margin-bottom: 60rpx;
	}
	
	.phone_input{
		font-size: 35rpx;
	}
	/*=============*/
	.btn_login{
		background-color: #fe3a3b;
		color: #ffffff;
		border-radius: 50upx;  /*圆角*/
		margin-top: 100rpx;
	}
	/*设定本页所有输入框字体大小*/
	input{
		font-size: 35rpx;
	}
</style>