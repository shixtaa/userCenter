<template>
  <div class="login"  @keyup.enter="submitForm">
    <div class="login-box">
      <div class="login-img">
        <img src="../assets/auth.png" alt="">
      </div>
      <div class="login-main">
        <h3>欢迎登录</h3>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" >
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="密码"></el-input>
          </el-form-item>
          <h4>还没有账号？<span @click="jumpReg">新用户注册</span></h4>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from "vuex"
export default {
  name:'login',
  data(){
    return {
      loginForm:{
        username:"",
        password:""
      },
      rules:{
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { pattern:"^[A-Za-z0-9]{6,}$", message: '6位以上数字和字母组成', trigger: 'blur' }
          ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6,  message: '长度在6位以上', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    ...mapActions(['setUserInfo']),
    /* 验证登录信息 */
    submitForm() {
        this.$refs["loginForm"].validate((valid) => {
          if (valid) {
            this.login()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /* 跳转注册页面 */
    jumpReg(){
      this.$router.push({
        name:'regist'
      })
    },
    /* 登录
    * 登录成功将结果存储到vuex 并跳转到用户页面
     */
    async login(){
      const loginRes=await this.yPost('/user/login',this.loginForm)
      console.log(loginRes)
      if(loginRes){
      this.setUserInfo(loginRes.user)
        this.$router.push({
          name:'user'
        })
      }
    }
  }
}
</script>
<style lang="scss">
  .login{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
    .login-box{
      display: flex;
      width: 70%;
      min-width: 800px;
      box-sizing: border-box;
      margin:80px auto;
      padding: 50px;
      border:1px solid #eee;
      border-radius: 8px;
      box-shadow: 0 3px 5px #f3f3f3;
      .login-img{
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        img{
          max-width: 400px;
          width: 100%;
        }
      }
      .login-main{
        width: 50%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 50px;
        h3{
          font-size: 20px;
          line-height: 40px;
          text-align: center;
          margin:20px 0;
        }
        .el-form{
          width: 70%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          .el-form-item {
            margin-bottom:15px;
          }
          .el-select {
            width: 100%;
            .el-input{
              width: 100%;
            }
          }
          h4{
            margin-bottom: 15px;
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            color:#C7C7C7;
            span{
              color: #6963D0;
              cursor: pointer;
            }
          }
          button{
            background-color: #6963D0;
            border:none;
            outline: none;
          }
        }
      }
    }
  }
</style>