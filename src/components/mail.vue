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
            <div>
              <img src="../assets/img5.png" alt="">
              <span>{{item.price}}积分</span>
            </div>
            <button class="exchange-btn" type="text"  @click="show(item._id)">兑换</button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="visible"
      width="30%">
      <span>是否兑换该商品？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="exchange">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name:'mail',
  data(){
    return {
      itemList:[],
      visible:false,
      item:""
    }
  },
  computed:{
    ...mapState({
      "userInfo":state=>state.userInfo
    })
  },
  created(){
    this.getUserInfo()
    this.getItem()
  },
  methods:{
    ...mapActions([
      'setUserInfo',
      'getUserInfo'
    ]),
    /* 获取商品列表 */
    async getItem(){
      let result= await this.yGet('/shop/shopList',{id:this.userInfo._id})
      if(result){
        this.itemList=result
        console.log("itemList", this.itemList)
      }
    },
    // async getUserInfo(){
    //   let result= await this.yGet('/user/userinfo',{params:{id:this.userInfo._id}})
    //   // console.log("result==>",result)
    //   if(result){
    //     this.setUserInfo(result)
    //       
    //   }
    // },
    /* 显示确认兑换弹窗 */
    show(value){
      this.item=value 
      this.visible=true
    },
    /* 兑换
    * 成功后重新获取用户信息存储到vuex，使当前积分实时变化
    */
    async exchange(){
      let result=await this.yPut('/shop/exchange',{id:this.item})
      if(result){
        this.getUserInfo()
        this.visible=false
        this.$message({
          message:'兑换成功',
          type:'success'
        })
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
          width: 250px;
          height: 320px;
          border: 1px solid #eee;
          border-radius: 5px;
          margin:30px 50px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 3px 5px #eee;
          img{
            width: 250px;
            height: 250px;
            margin-bottom: 10px;
          }
          p{
            width: 230px;
            padding: 0 10px;
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
            display: flex;
            justify-content: space-between;
            align-items: center;
            div{
              display: flex;
              align-items: center;
              img{
                width: 20px;
                height: 20px;
                margin: 0 5px 0 0;
              }
              span{
                height: 20px;
                line-height: 20px;
              }
            }
            .exchange-btn{
              display: inline-block;
              width: 45px;
              height: 28px;
              background-color: #726DD4;
              color: #fff;
              border-radius: 3px;
              outline: none;
              border:none;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
</style>