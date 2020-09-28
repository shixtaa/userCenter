<template>
  <div class="info-container">
    <div class="info-nav">
      <span @click="changeStatus('info')" :style="{borderBottomStyle:isClick=='info'?'solid':''}">个人信息</span>
      <span @click="changeStatus('record')" :style="{borderBottomStyle:isClick=='record'?'solid':''}">兑换记录</span>
    </div>
    <div class="info-main">
      <component :is="isClick" ></component>
    </div>
  </div>
</template>
<script>
import info from "../components/userInfo"
import record from "../components/changeRecord"

export default {
  name:'user',
  components:{
    info,record
  },
  data(){
    return {
      isClick:'info',
    }
  },
  methods:{
    /* 切换tab */
    changeStatus(name){
      this.isClick=name
    }
  }
}
</script>
<style lang="scss">
  .info-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    .info-nav{
      width: 100%;
      height: 60px;
      line-height: 60px;
      box-shadow: 0 3px 6px #eee;
      font-size: 22px;
      span{
        margin: 0 20px;
        padding: 5px 0;
        border-bottom-color: #494ca2;
        border-bottom-width: 3px;
        cursor: pointer;
      }
    }
    .info-main{
      width: 100%;
      height: calc(100vh - 60px);
      padding: 50px;
      box-sizing: border-box;
    }
  }
</style>