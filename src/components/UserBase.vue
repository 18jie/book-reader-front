<template>
  <el-form :model="ruleForm"
           status-icon
           :rules="rules"
           ref="ruleForm"
           label-width="100px"
           class="demo-ruleForm">
    <el-form-item label="用户名"
                  prop="user">
      <el-input v-model="ruleForm.user"></el-input>
    </el-form-item>
    <el-form-item label="手机号"
                  prop="phone">
      <el-input v-model.number="ruleForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="密码"
                  prop="pass">
      <el-input type="password"
                v-model="ruleForm.pass"
                autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码"
                  prop="checkPass">
      <el-input type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="年龄"
                  prop="age">
      <el-input v-model.number="ruleForm.age"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        id: null,
        user: "",
        phone: "",
        pass: "",
        checkPass: "",
        age: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          axios
            .post("/book-reader/user/register", {
              userPhone: this.user.userPhone,
              password: this.user.password,
            })
            .then((response) => {
              console.log(response);
              if (response.data.code == 0) {
                this.$message({
                  message: "登陆成功",
                  type: "success",
                });
                console.log(response.data.data.id);
                this.$store.dispatch("setUser", response.data.data.id);
                this.$store.dispatch("setIsAuthenticate", true);
                console.log(this.$store.getters.isAuthenticate);
                //跳到用户界面
                // this.$router.push({ name: "activity" });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getUser() {
      axios.get("/book-reader/login/isLogin").then((res) => {
        if (res.data.code == 0) {
          var loginUser = res.data.data;
          this.ruleForm.id = loginUser.id;
          this.ruleForm.user = loginUser.userName;
          this.ruleForm.phone = loginUser.userPhone;
          this.ruleForm.age = loginUser.age;
          this.ruleForm.pass = loginUser.password;
        }
      });
    },
  },
  mounted: function () {
    this.getUser();
  },
};
</script>

<style>
</style>