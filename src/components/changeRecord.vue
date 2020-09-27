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
export default {
  name:'changeRecord',
  data(){
    return {
      list:{},
      exchangeRecord:[]
    }
  },
  created(){
    this.getInfo()
  },
  methods:{
    async getInfo(){
      this.list=JSON.parse(localStorage.getItem('userInfo')) || {}
      let data={
        id:this.list._id
      }
      let record=await this.yGet('/shop/exchangedRecord',{params:data})
      if(record){
        this.exchangeRecord=record
      }
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