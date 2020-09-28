<template>
  <div class="user-container">
    <div class="user-left">
      <div class="avatar-box">
        <img :src="userInfo.avatar" alt="">
        <span>{{userInfo.username}}</span>
      </div>
      <div class="control">
        <span @click="changeModel('tabuser')" :style="{backgroundColor:currentTabComponent==='tabuser'?'#494ca2':''}">个人中心</span>
        <span @click="changeModel('tabmail')" :style="{backgroundColor:currentTabComponent==='tabmail'?'#494ca2':''}">积分商城</span>
        <span @click="quit">退出</span>
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
      currentTabComponent:this.$route.name
    }
  },
  created(){
  },
  computed:{
    ...mapState({
      "userInfo":state=>state.userInfo
    })
  },
  methods:{
    /* 嵌套路由 切换页面*/
    changeModel(name){
      this.currentTabComponent=name
      this.$router.push({
        path:"/user/"+name
      })
    },
    /* 退出登录 清空登录信息 */
    quit(){
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('userInfo')
        this.$router.push({
          name:'login'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
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