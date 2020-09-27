<template>
  <div class="userinfo-box">
    <img :src="list.avatar" alt="">
    <div class="info-left">
      <span>性别：{{list.username}}</span>
      <span>昵称：{{list.nickname}}</span>
      <div>密码：******
        <el-button class="update" type="text" @click="dialogFormVisible = true"> 修改</el-button>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
          <el-form :model="pwdForm" status-icon :rules="rules" ref="pwdForm" label-width="100px">
          <el-form-item label="旧密码" prop="oldPass">
            <el-input v-model="pwdForm.oldPass"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="pwdForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="旧密码" prop="checkPass">
            <el-input type="password" v-model="pwdForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
            <el-button type="default" @click="dialogFormVisible = false"> 取消</el-button>
          </el-form-item> -->
        </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updatePwd">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <div class="info-right">
      <span>学校：{{list.school}}</span>
      <span>性别：{{list.gender==0?'女':'男'}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name:'userInfo',
  data(){
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else if (value !== this.list.password) {
          callback(new Error('密码不正确'));
        } else {
          callback();
        }
      };
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
      list:{},
      dialogFormVisible:false,
      pwdForm:{
        oldPass:'',
        pass:'',
        checkPass:''
      },
      rules:{
        oldPass: [
          // { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6,  message: '长度在6位以上', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur'}

        ],
        pass: [
          // { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6,  message: '长度在6位以上', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur'}
        ],
        checkPass: [
          // { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { min: 6,  message: '长度在6位以上', trigger: 'blur' },
          { validator: validatePass3, trigger: 'blur'}
        ]
      }
    }
  },
  created(){
    this.getInfo()
  },
  methods:{
    async getInfo(){
      this.list=JSON.parse(localStorage.getItem('userInfo')) || {}
      let params={
        id:this.list._id
      }
      let result = await this.yGet('/user/userinfo',{params})
    },
    async updatePwd(){
      console.log(params)
      let updateRes=await this.yPut('/user/changePassword',{
        "oldPassword":this.pwdForm.oldPass,
        "newPassword":this.pwdForm.checkPass
      })
      this.dialogFormVisible = false
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