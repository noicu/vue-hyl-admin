<template>
  <Card title="图片管理" :bordered="false">
    <CardGrid class="img-input-card">
      <img v-for="it in value" :src="it.path" class="img" :alt="'img'" />
    </CardGrid>
  </Card>
</template>

<script lang="ts">
  import { watch, defineComponent } from 'vue';
  import type { PropType } from 'vue';
  import type { ProductImage } from '/@/api/yi/product';
  // import { createImgPreview } from '/@/components/Preview/index';
  import { Card, Form, Input } from 'ant-design-vue';

  export default defineComponent({
    components: { Card, CardGrid: Card.Grid, Form, FormItem: Form.Item, Input },
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

      return {
        value,
      };
    },
  });
</script>

<style></style>
