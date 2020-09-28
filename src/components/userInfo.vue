<template>
  <div class="userinfo-box">
    <img :src="userInfo.avatar" alt="">
    <div class="info-left">
      <span>性别：{{userInfo.username}}</span>
      <span>昵称：{{userInfo.nickname}}</span>
      <div>密码：******
        <el-button class="update" type="text" @click="dialogFormVisible = true"> 修改</el-button>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" @close="cancelSet">
          <el-form :model="pwdForm" :rules="rules" ref="pwdForm" label-width="100px">
          <el-form-item label="旧密码" prop="oldPass">
            <el-input v-model="pwdForm.oldPass"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="pwdForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="旧密码" prop="checkPass">
            <el-input type="password" v-model="pwdForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updatePwd">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <div class="info-right">
      <span>学校：{{userInfo.school}}</span>
      <span>性别：{{userInfo.gender==0?'女':'男'}}</span>
    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex"
export default {
  name:'userInfo',
  computed:{
    ...mapState({
      "userInfo":state=>state.userInfo
    })
  },

  data(){
    /* 验证旧密码 */
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else if (value !== this.userInfo.password) {
          callback(new Error('密码不正确'));
        } else {
          callback();
        }
      };
      /* 验证新密码 */
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.pwdForm.checkPass !== '') {
            this.$refs.pwdForm.validateField('checkPass');
          }
          callback();
        }
      };
      /* 验证两次密码是否一致 */
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.pwdForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      dialogFormVisible:false,
      pwdForm:{
        oldPass:'',
        pass:'',
        checkPass:''
      },
      rules:{
        oldPass: [
          { min: 6,  message: '长度在6位以上', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur'}

        ],
        pass: [
          { min: 6,  message: '长度在6位以上', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur'}
        ],
        checkPass: [
          { min: 6,  message: '长度在6位以上', trigger: 'blur' },
          { validator: validatePass3, trigger: 'blur'}
        ]
      }
    }
  },
  created(){
  },
  methods:{
    ...mapActions(["setUserInfo","getUserInfo"]),
    /* 关闭修改弹窗时，清除验证 */
    cancelSet(){
      this.$refs['pwdForm'].resetFields();
    },
    // async getInfo(){
    //   let params={
    //     id:this.userInfo._id
    //   }
    //   let result = await this.yGet('/user/userinfo',{params})
    //   if(result){
    //     this.setUserInfo(result)
    //   }
    // },
    /* 修改密码 并更新vuex */
    async updatePwd(){
      let updateRes=await this.yPut('/user/changePassword',{
        "oldPassword":this.pwdForm.oldPass,
        "newPassword":this.pwdForm.checkPass
      })
      if(updateRes){
        this.pwdForm={}
        this.dialogFormVisible = false
        this.$message({
            message: '修改成功',
            type: 'success'
        });
        // this.getInfo()
        this.getUserInfo()
      }
    }
  }
}
</script>
<style lang="scss">
  .userinfo-box{
    display: flex;
    color: #666666;
    img{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin:0 30px;
    }
    .info-left{
      display: flex;
      flex-direction: column;  
      margin:40px;
      span{
        height: 50px;
        min-width: 160px;
      }
      .update{
        color: blue;
      }
    }
    .info-right{
      display: flex;
      flex-direction: column;  
      margin:40px;
      span{
        height: 50px;
        min-width: 160px;

      }
    }
  }
</style>