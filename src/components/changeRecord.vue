<template>
  <div class="exchange-container">
    <div class="per-record" v-for="item in exchangeRecord" :key="JSON.stringify(item)">
      <div class="record-left" >
        <p>{{item.name}}</p>
      </div>
      <div class="record-right">
        {{item.exchangeDate | timeFormate}}
      </div>
    </div>
  </div>
</template>
<script>
import Moment from "moment"

export default {
  name:'changeRecord',
  data(){
    return {
      userObj:{},
      exchangeRecord:[]
    }
  },
  created(){
    this.getInfo()
  },
  methods:{
    /* 获取兑换纪录 */
    async getInfo(){
      this.userObj=JSON.parse(localStorage.getItem('userInfo')) || {}
      let data={
        id:this.userObj._id
      }
      let record=await this.yGet('/shop/exchangedRecord',{params:data})
      if(record){
        this.exchangeRecord=record
      }
    }
  },
  /* 时间过滤 */
  filters:{
    timeFormate(value){
    return Moment(value).format('YYYY-MM-DD HH:mm')
    }
  }
}
</script>
<style lang="scss">
.exchange-container{
  .per-record{
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    border-bottom:1px solid #eee;
    color: #666;
    padding: 0 40px;

  }
}
</style>