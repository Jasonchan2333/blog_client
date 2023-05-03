<template>
  <div>
    <n-table>
      <thead>
        <tr>
          <th>分类编码</th>
          <th>分类名称</th>
          <th>
            操作
            <n-button
              size="tiny"
              strong
              secondary
              @click="showModal = !showModal"
              >添加+</n-button
            >
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in categoryList" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>
            <n-space>
              <n-button
                strong
                secondary
                type="primary"
                size="medium"
                @click="updateCategory(item)"
              >
                修改
              </n-button>
              <n-button
                strong
                secondary
                type="error"
                size="medium"
                class="btn2"
                @click="deletCategory(item.id)"
              >
                删除
              </n-button>
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>
    <!-- 修改分类弹窗 -->
    <n-modal v-model:show="showUpdateModal" preset="dialog" title="Dialog">
      <template #header>
        <div>修改`{{ awaitUpdateItem.name }}`分类名为：</div>
      </template>
      <n-input
        placeholder="输入要修改的分类名称"
        autosize
        style="min-width: 50%"
        v-model:value="newUpdateName"
      />
      <template #action>
        <div>
          <n-button type="primary" @click="updateSubmit">提交</n-button>
        </div>
      </template>
    </n-modal>
    <!-- 修改分类弹窗 -->

    <!-- 添加分类弹窗 -->
    <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
      <template #header>
        <div>添加分类名</div>
      </template>
      <n-input
        placeholder="输入分类名称"
        autosize
        style="min-width: 50%"
        v-model:value="addCategoryName"
      />
      <template #action>
        <div>
          <n-button type="primary" @click="addCategory">提交</n-button>
        </div>
      </template>
    </n-modal>
    <!-- 添加分类弹窗 -->
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from "vue"; //引入ref、注入工具
import { useRouter, useRoute } from "vue-router"; //引入router
import { AdminStore } from "../../stores/AdminStore"; //引入piniaStore
const axios = inject("axios"); //注入axios
const adminStore = AdminStore(); //注册Piniastore
const router = useRouter(); //注册router
const route = useRoute(); //注册route
const message = inject("message"); //注入消息提示（source：main.js）

////// data//////
const categoryList = ref([]); //分类对象收集数组
const showModal = ref(false); //添加弹窗控制器

const showUpdateModal = ref(false); //修改弹窗控制器
const awaitUpdateItem = ref({}); //待修改的旧对象
const newUpdateName = ref(""); //准备修改的新类名，input输入

const addCategoryName = ref(""); //添加弹窗输入框，input输入
////// function//////
//提交添加分类
const addCategory = async () => {
  let res = await axios.post("/category/add", {
    name: addCategoryName.value, //提交添加请求
  });
  if (res.data.msg) {
    message.error("重复类名,请修改或者检查是否还需要添加"); //消息提示
  } else {
    message.success("添加成功"); //消息提示
    showModal.value = false; //关闭弹窗
    getDate(); //刷新数据
  }
};
//提交删除分类
const deletCategory = async (id) => {
  let res = await axios.post("/category/delete", {
    id: id,
  });
  message.success("删除成功"); //消息提示
  getDate(); //刷新数据
};

//修改分类
const updateSubmit = async () => {
  //正式提交修改请求
  if (newUpdateName.value == awaitUpdateItem.value.name) {
    message.error("与旧的类名一致，无需修改");
  } else {
    let res = await axios.post("/category/update", {
      id: awaitUpdateItem.value.id,
      newName: newUpdateName.value,
    });
    showUpdateModal.value = false; //关闭修改弹窗
    getDate(); //更新列表
    newUpdateName.value = ""; //清空输入框
    message.success("修改成功");
  }
};

const updateCategory = (item) => {
  //显示弹窗并显示旧名称
  awaitUpdateItem.value = item; //将待修改对象传入
  showUpdateModal.value = true; //打开修改弹窗
};

//创建获取列表数据方法
const getDate = async () => {
  let res = await axios.get("/category/getcategory");
  categoryList.value = res.data.data;
};

onMounted(() => {
  getDate(); //调用获取列表数据
});
</script>

<style lang="less" scoped>
</style>