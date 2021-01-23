<template>
  <Card title="图片管理" :bordered="false">
    <ImageGroup>
      <div v-for="(it, i) in value" style="display: inline-block; margin-right: 10px">
        <Image :src="it.path" :width="200" :height="200" style="height: 100%" />
        <div>
          <Icon icon="mdi:delete-circle" size="40" @click="onDelete(i)" />
        </div>
      </div>
    </ImageGroup>
    <label style="display: contents">
      <div
        style="
          position: absolute;
          display: inline-block;
          width: 200px;
          height: 200px;
          padding: 60px 15px;
          font-size: 20px;
          text-align: center;
          border: 1px dashed #d9d9d9;
        "
      >
        <span> 添加图片 </span>
        <Progress :percent="progress" v-if="loadingRef" />
      </div>
      <input type="file" accept="image/*" style="display: none" @change="uploadImg" />
    </label>
  </Card>
</template>

<script lang="ts">
  import { watch, defineComponent, ref } from 'vue';
  import type { PropType } from 'vue';
  import type { ProductImage } from '/@/api/yi/product';
  // import { createImgPreview } from '/@/components/Preview/index';
  import { Card, Form, Input, Image } from 'ant-design-vue';
  import Icon from '/@/components/Icon/index';
  import { upload } from '/@/api/sys/upload';
  import { Progress } from 'ant-design-vue';

  export default defineComponent({
    components: {
      Card,
      CardGrid: Card.Grid,
      Form,
      FormItem: Form.Item,
      Input,
      Image,
      ImageGroup: Image.PreviewGroup,
      Icon,
      Progress,
    },
    props: {
      value: {
        type: Array as PropType<ProductImage[]>,
        default: () => [],
      },
    },
    emits: ['change'],
    setup({ value }, { emit }) {
      watch(value, (v) => {
        emit('change', v);
        console.log(v);
      });

      function onDelete(i: number) {
        value.splice(i, 1);
      }

      const progress = ref(0);
      const loadingRef = ref(false);

      async function uploadImg(e: any) {
        if (loadingRef.value) return;
        loadingRef.value = true;
        try {
          const data = await upload(e.target.files[0], (c) => {
            progress.value = c.total.percent;
          });
          value.push({
            path: data,
            sort_no: 1,
          });
          console.log(data);
        } catch (error) {
          console.log(error);
        } finally {
          progress.value = 0;
          loadingRef.value = false;
        }
      }

      return {
        value,
        onDelete,
        uploadImg,
        progress,
        loadingRef,
      };
    },
  });
</script>

<style></style>
