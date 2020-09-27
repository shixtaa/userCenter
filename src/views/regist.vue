<template>
  <div class="regist">
    <div class="regist-box">
      <div class="regist-img">
        <img src="../assets/auth.png" alt="">
      </div>
      <div class="regist-main">
        <h3>注册新用户</h3>
        <el-form :model="registForm" :rules="rules" ref="registForm" >
          <el-form-item prop="username">
            <el-input v-model="registForm.username" placeholder="用户名：6位以上数字和字母组成"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="registForm.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="school">
            <el-input v-model="registForm.school" placeholder="学校"></el-input>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-input v-model="registForm.nickname" placeholder="昵称"></el-input>
          </el-form-item>
          <el-form-item prop="age">
            <el-input v-model.number="registForm.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item prop="gender">
            <el-select v-model="registForm.gender" placeholder="请选择性别" >
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
            <h4>已有账号？去<span @click="jumpLog">登录</span>
            </h4>
            <el-button type="primary" @click="submitForm">注册</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"regist",
  data(){
    return {
      registForm:{
        username:"",
        password:"",
        school:"",
        nickname:"",
        age:null,
        gender:""
      },
      rules:{
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { pattern:"^[A-Za-z0-9]{6,}$", message: '6位以上数字和字母组成', trigger: 'blur' }
          ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6,  message: '长度在6位以上', trigger: 'blur' }
        ],
        school: [
          { required: true, message: '请输入学校', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { type:'number',message:'请输入数字', trigger: 'blur'}
        ],
        gender: [
          { required: true, message: '请选择性别', trigger:'change' }
        ]
      }
    }
  },
  methods:{
    submitForm() {
        this.$refs["registForm"].validate((valid) => {
          if (valid) {
            this.regist()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    jumpLog(){
      this.$router.push({
        name:'login'
      })
    },
    async regist(){
      let registRes=await this.yPost('/user/regist',this.registForm)
      if(registRes){
        this.$message({
          message:"注册成功",
          type:'success'
        })
      }
    }
  }
}
</script>
<style lang="scss">
.regist{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
    .regist-box{
      display: flex;
      width: 70%;
      min-width: 800px;
      box-sizing: border-box;
      margin:80px auto;
      padding: 50px;
      border:1px solid #eee;
      border-radius: 8px;
      box-shadow: 0 3px 5px #f3f3f3;
      .regist-img{
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        img{
          max-width: 400px;
          min-height: 443px;
          width: 100%;
        }
      }
      .regist-main{
        width: 50%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        h3{
          font-size: 20px;
          line-height: 40px;
          text-align: center;
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