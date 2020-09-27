<template>
  <div class="mail-container">
    <div class="mail-nav">商城</div>
    <div class="mail-main">
      <div class="mail-hd">
        <h3>当前积分</h3>
        <span>{{userInfo.integration}}</span>
      </div>
      <p>商品列表</p>
      <div class="item-list">
        <div class="per-item" v-for="item in itemList" :key="JSON.stringify(item)">
          <img :src="item.image" alt="">
          <p>{{item.name}}</p>
          <div class="item-ft">
            <img src="../assets/img5.png" alt="">
            <span>{{item.price}}积分</span>
            <button @click="exchange(item._id)">兑换</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name:'mail',
  data(){
    return {
      itemList:[],
    }
  },
  computed:{
    ...mapState({
      "userInfo":state=>state.userInfo
    })
  },
  created(){
    this.test=this.userInfo
    console.log(this.userInfo)
    this.getItem()
    // this.userInfo()
  },
  methods:{
    ...mapActions([
      'setUserInfo'
    ]),
    async getItem(){
      let result= await this.yGet('/shop/shopList',{id:this.userInfo._id})
      // console.log("result==>",result)
      if(result){
        this.itemList=result
        console.log("itemList", this.itemList)
      }
    },
    async exchange(value){
      let result=await this.yPut('/shop/exchange',{id:value})
      if(result){
        let info=await this.yGet('/user/userinfo',{params:{id:this.userInfo._id}})
        if(info){
          this.setUserInfo(info)
          this.$message({
            message:'兑换成功',
            type:'success'
          })
        }
      }
    }
  }
}
</script>
<style lang="scss">
.mail-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    .mail-nav{
      // width: 100%;
      height: 60px;
      line-height: 60px;
      box-shadow: 0 3px 6px #eee;
      font-size: 22px;
      padding: 0 20px;
    }
    .mail-main{
      padding: 50px;
      box-sizing: border-box;
      .mail-hd{
        height: 180px;
        background-image: url('../assets/jifen-background.png');
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 6px;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
        span{
          font-size: 50px;
          font-weight: 700;
        }
      }
      .item-list{
        margin-top:20px;
        display: flex;
        flex-wrap: wrap;
        .per-item{
          width: 200px;
          height: 250px;
          border: 1px solid #eee;
          border-radius: 5px;
          margin-right:30px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          img{
            width: 200px;
            height: 200px;
          }
          p{
            width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #666;
          }
          .item-ft{
            height: 30px;
            color: #726DD4;
            padding: 0 10px;
            box-sizing: border-box;
            line-height: 30px;
            img{
              width: 20px;
              height: 20px;
              margin-right: 8px;
            }
            button{
              display: inline-block;
              width: 35px;
              height: 20px;
              background-color: #726DD4;
              color: #fff;
              border-radius: 3px;
              outline: none;
              border:none;
              float: right;
              font-size: 10px;
            }
          }
        }
      }
    }
  }
</style>