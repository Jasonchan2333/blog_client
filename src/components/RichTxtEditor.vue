<template>
  <div class="editor-root">
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted, inject } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
const uploadServer = inject("uploadServer");
//组件间数据双向绑定
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
//屏蔽视频上传功能
// ////////
// 发送组件通信传输事件
const emit = defineEmits(["update:model-value"]);
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const toolbarConfig = {
  excludeKeys: ["uploadVideo"],
};
const mode = ref("default");
// 内容 HTML
const valueHtml = ref("fuwenben");
const editorConfig = { placeholder: "请输入内容..." };

//编辑器回调函数
const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = (editor) => {
  //   console.log("change:", editor.children);
  if (!initFinished) {
    valueHtml.value = props.modelValue;
    initFinished = true;
  }
  emit("update:model-value", valueHtml.value);
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

let initFinished = false;

editorConfig.MENU_CONF = {};
// 修改 uploadImage 菜单配置
editorConfig.MENU_CONF["uploadImage"] = {
  server: uploadServer + "/upload/editor_upload", //上传服务端地址 完整
  // 小于该值就插入 base64 格式（而不上传），默认为 0
  base64LimitSize: 10 * 1024, // 10kb
  // 继续写其他配置...
};
// 插入图片
editorConfig.MENU_CONF["insertImage"] = {
  parseImageSrc: (src) => {
    if (src.indexOf("http") !== 0) {
      return `${uploadServer}${src}`;
    } else {
      return src;
    }
  },
};
</script>

<style>
</style>