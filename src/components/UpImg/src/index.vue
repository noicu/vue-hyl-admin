<template>
  <input type="file" accept="image/*" @change="uploadImg" />
  <Progress :percent="progress" />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { upload } from '/@/api/sys/upload';
  import { Progress } from 'ant-design-vue';

  export default defineComponent({
    name: 'UpImg',
    components: { Progress },
    setup() {
      const progress = ref(0);
      function uploadImg(e: any) {
        console.log(e.target.files[0]);
        upload(e.target.files[0], (c) => {
          progress.value = c.total.percent;
        }).then((data: any) => console.log(data));
      }
      return {
        uploadImg,
        progress,
      };
    },
  });
</script>

<style></style>
