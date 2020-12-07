<template>
  <input type="file" accept="image/*" @change="uploadImg" />
  <Progress :percent="progress" />
</template>

<script lang="ts">
  import { defineComponent,ref } from 'vue';
  import { upload } from '/@/api/img';
  import { Progress } from "ant-design-vue";

  export default defineComponent({
    components: {Progress},
    setup() {
      const progress = ref(0);
      function uploadImg(e: any) {
        console.log(e.target.files[0]);
        upload(e.target.files[0], (c) => {
          progress.value = c.total.percent;
        }).then((e) => console.log(e));
      }
      return {
        uploadImg,
        progress,
      };
    },
  });
</script>

<style></style>
