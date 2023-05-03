<template>
  <div>
    <n-tabs default-value="add" justify-content="start" type="line">
      <n-tab-pane name="oasis" tab="Oasis"> Wonderwall </n-tab-pane>
      <n-tab-pane name="add" tab=" 添加文章 ">
        <!-- 添加文章⬇️ -->
        <n-form>
          <n-form-item label="标题">
            <n-input
              v-model:value="addArticle.title"
              placeholder="请输入标题名称"
            />
          </n-form-item>
          <n-form-item label="分类">
            <n-select
              v-model:value="articleCategoryId"
              placeholder="选择分类"
              :options="options"
            />
          </n-form-item>
          <n-form-item label="内容">
            <keep-alive>
              <RichTxtEditorVue v-model="addArticle.content"></RichTxtEditorVue>
            </keep-alive>
          </n-form-item>
          <div class="footer">
            <n-button
              type="primary"
              class="submitBtn"
              size="large"
              @click="submitArticle"
              >提交</n-button
            >
          </div>
        </n-form>

        <!-- 添加文章⬆️ -->
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="文章管理"> </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import { reactive, onMounted, inject, ref } from "vue";
import { AdminStore } from "../../stores/AdminStore"; //引入pinia
import RichTxtEditorVue from "../../components/RichTxtEditor.vue"; //组件
const message = inject("message"); //注入消息提示（source：main.js）
const axios = inject("axios"); //注册axios
const adminStore = AdminStore(); //实例化pinia store
let articleCategoryId = ref("");
let options = ref([]);
let addArticle = reactive({
  category_id: 0,
  title: "",
  content: "",
});
//// function////
const getCategory = async () => {
  let res = await axios.get("/category/getcategory");
  for (let item of res.data.data) {
    options.value.push({
      label: item.name,
      value: item.id,
    });
  }
};

const submitArticle = () => {
  let subArticle = {
    title: addArticle.title,
    category_id: articleCategoryId.value,
    content: addArticle.content,
  };
  submit(subArticle);
  message.success("提交成功");
};

const submit = async (data) => {
  let res = await axios.post("/blog/add", data, {
    headers: { token: adminStore.token },
  });
  console.log(res.data);
};
//////hook//////
onMounted(() => {
  getCategory();
});
</script>

<style>
.footer {
  width: 100%;
  display: flex;
  justify-content: end;
}
</style>