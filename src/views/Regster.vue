<template>
  <div>
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex;justify-content: center;margin-top: 150px">
      <el-card style="width: 400px">
        <div slot="header"
             class="clearfix">
          <span>注册</span>
        </div>
        <table id="login_form">
          <tr>
            <td>用户名</td>
            <td>
              <el-input v-model="user.username"
                        placeholder="请输入用户名"></el-input>
            </td>
          </tr>
          <tr>
          <tr>
            <td>手机号</td>
            <td>
              <el-input v-model="user.userphone"
                        placeholder="请输入手机号"></el-input>
            </td>
          </tr>
          <tr>
            <td>密码</td>
            <td>
              <el-input type="password"
                        v-model="user.password"
                        placeholder="请输入密码"></el-input>
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
            </td>
          </tr>
          <tr>
            <td>年龄</td>
            <td>
              <el-input type="age"
                        v-model="user.age"
                        placeholder="请输入年龄"
                        @keydown.enter.native="doRegister"></el-input>
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
            </td>
          </tr>
          <tr>
            <!-- 占两行-->
            <td colspan="2">
              <!-- 点击事件的两种不同的写法v-on:click和 @click-->
              <!--<el-button style="width: 300px" type="primary" v-on:click="doLogin">登录</el-button>-->
              <el-button style="width: 130px;padding-left:20px"
                         type="primary"
                         @click="doRegister">注册</el-button>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        username: "请输入用户名",
        userphone: "请输入手机号",
        password: "请输入密码",
        age: "请输入年龄",
      },
    };
  },
  methods: {
    doRegister() {
      console.log(".........");
      axios
        .post("/api/book-reader/login/register", {
          userName: this.user.username,
          userPhone: this.user.userphone,
          password: this.user.password,
          age: this.user.age,
        })
        .then((response) => {
          console.log(response)
          if (response.data.code == 0) {
            this.$message({
              message: "登陆成功",
              type: "success",
            });
            //跳到登录界面
            this.$router.push({ name: "Login" });
          }
        });
    },
  },
};
</script>

