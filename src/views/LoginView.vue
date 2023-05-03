<template>
  <div class="login-root">
    <div class="card-box">
      <n-card title="Blog Login">
        <n-form-item label="账号" :rule="accountRule">
          <n-input v-model:value="account" />
        </n-form-item>
        <n-form-item label="密码" :rule="pswRule">
          <n-input v-model:value="password" type="password" />
        </n-form-item>
        <template #action>
          <n-checkbox v-model:checked="rember" label="记住我"></n-checkbox>
          <n-button type="success" class="btn" @click="login"> 登录 </n-button>
        </template>
      </n-card>
    </div>
  </div>
</template>
<script >
import { defineComponent, ref, inject } from "vue"; //引入ref、注入工具
import { AdminStore } from "../stores/AdminStore"; //引入pinia
import { useRouter, useRoute } from "vue-router"; //引入router

export default defineComponent({
  setup() {
    const router = useRouter(); //注册router
    const route = useRoute(); //注册route
    const adminStore = AdminStore(); //实例化pinia store
    const axios = inject("axios"); //注册axios
    const message = inject("message"); //注入消息提示（source：main.js）

    const accountRef = ref(localStorage.getItem("account") || null); //定义账号
    const passwordRef = ref(localStorage.getItem("password") || null); //定义密码
    const remcheckRef = ref(localStorage.getItem("rember") == 1); //定义记住账户密码

    // functions
    let login = async () => {
      //axios登录提交
      let res = await axios.post("/admin/login", {
        userName: accountRef.value,
        userPwd: passwordRef.value,
      }); //post请求参数
      console.log(res.data.data);
      if (res.data.status == 200) {
        // 登录成功
        adminStore.id = res.data.data.id; //写入Piniastore-id
        adminStore.token = res.data.data.token; //写入Piniastore-token
        adminStore.account = res.data.data.userName; //写入Piniastore-用户名
        message.success("登录成功");
        // 记住账号功能
        if (remcheckRef.value) {
          localStorage.setItem("account", accountRef.value); //存入localstore-用户名
          localStorage.setItem("password", passwordRef.value); //存入localstore-密码
          localStorage.setItem("rember", remcheckRef.value ? 1 : 0); //存入localstore-是否记住
        } else {
          localStorage.clear(); //清空localstore
        }
        router.push("/dashboard"); // 跳转页面
      } else {
        message.error("登录失败，检查用户名或密码是否正确");
      }
    };

    return {
      login,
      account: accountRef,
      password: passwordRef,
      rember: remcheckRef,
      //   验证规则⬇️
      //#region
      pswRule: {
        trigger: ["input", "blur"],
        validator() {
          if (passwordRef.value.length < 3 || passwordRef.value.length > 15) {
            return new Error("密码长度在3-15位之间");
          }
        },
      },
      accountRule: {
        trigger: ["input", "blur"],
        validator() {
          if (accountRef.value.length < 3 || accountRef.value.length > 15) {
            return new Error("账号长度在3-15位之间");
          }
        },
      },
      //#endregion
    };
  },
});
</script>



<style lang="less" scoped>
.login-root {
  width: 100vw;
  height: 100vh;
  //   background-color: #dedddd;
  display: flex;
  justify-content: center;
  align-items: center;
  .card-box {
    width: 400px;
    box-shadow: 2px 2px 20px rgb(210, 210, 210);
  }
}

.btn {
  transform: translateX(30px);
  width: 70%;
}
</style>