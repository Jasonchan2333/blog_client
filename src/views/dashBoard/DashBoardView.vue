<template>
  <div class="dashboard-root">
    <div class="menu-panel">
      <div v-for="(item, index) in menus" :key="index" @click="toPage(item)">
        {{ item.name }}
      </div>
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
/////////name: "DashBoardView"/////////

import { ref, inject } from "vue"; //引入ref、注入工具
import { useRouter, useRoute } from "vue-router"; //引入router
import { AdminStore } from "../../stores/AdminStore"; //引入piniaStore
const axios = inject("axios"); //注入axios
const adminStore = AdminStore(); //注册Piniastore
const router = useRouter();
const route = useRoute();
const menus = [
  { name: "文章管理", herf: "/dashboard/article" },
  { name: "分类管理", herf: "/dashboard/category" },
  { name: "退出登录", herf: "logout" },
];

//functions
const toPage = (item) => {
  if (item.herf == "logout") {
    router.push("/login");
  } else {
    router.push(item.herf);
  }
};
</script>

<style lang="less">
.dashboard-root {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  .menu-panel {
    box-sizing: border-box;
    width: 180px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-right: 1px solid #ffffff;
    box-shadow: 0.5px 0 10px #c5c5c5;
    div {
      padding: 20px 0;
      font-size: 14px;
      color: #454545;
      &:hover {
        cursor: pointer;
        color: rgb(115, 174, 27);
      }
    }
  }
  .main-content {
    width: 100%;
    padding: 20px;
  }
}
</style>