<template>
  <div class="user-container">
    <div class="user-left">
      <div class="avatar-box">
        <img :src="list.avatar" alt="">
        <span>{{list.username}}</span>
      </div>
      <div class="control">
        <span @click="changeModel('tabuser')" :style="{backgroundColor:currentTabComponent==='tabuser'?'#494ca2':''}">个人中心</span>
        <span @click="changeModel('tabmail')" :style="{backgroundColor:currentTabComponent==='tabmail'?'#494ca2':''}">积分商城</span>
        <!-- <span @click="quit">退出</span> -->
        <template>
          <el-popconfirm title="确定退出吗？" @onConfirm="quit">
            <span slot="reference" >退出</span>
          </el-popconfirm>
        </template>
      </div>
    </div>
    <div class="user-main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name:'user',
  data(){
    return {
      list:{},
      currentTabComponent:this.$route.name
    }
  },
  created(){
      this.getInfo()
  },
  computed:{
    ...mapState({
      "userInfo":state=>state.userInfo
    })
  },
  methods:{
    changeModel(name){
      this.currentTabComponent=name
      this.$router.push({
        path:"/user/"+name
      })
    },
    async getInfo(){
      this.list=JSON.parse(localStorage.getItem('userInfo')) || {}
      let params={
        id:this.list._id
      }
      let result = await this.yGet('/user/userinfo',{params})
    },
    quit(){
      localStorage.removeItem('userInfo')
      this.$router.push({
        name:'login'
      })
    }
  }
}
</script>
<style lang="scss">
.user-container{
  display: flex;
  .user-left{
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #484c7f;
    color: #fff;
    .avatar-box{
      margin-top: 180px;
      display: flex;
      flex-direction: column;
      align-items: center;
      img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      span{
        margin: 15px 0 40px;
      }
    }
    .control{
      width: 100%;
      display: flex;
      flex-direction: column;
      span{
        width: 100%;
        height: 50px;
        text-align: center;
        cursor: pointer;
        line-height: 50px;
      }
      span:hover{
        background-color: #8186d5 !important;
      }
    }
  }
  .user-main{
    padding-left: 250px;
    width: 100%;
    box-sizing: border-box;
  }
}
  
</style>