<template>
  <Card title="规格管理" :bordered="false">
    <Form layout="vertical">
      <CardGrid v-for="it in value" class="color-input-card">
        <FormItem label="名称" style="margin-bottom: 0">
          <Input v-model:value="it.code" placeholder="" />
        </FormItem>
        <FormItem label="价格" style="margin-bottom: 0">
          <Input v-model:value="it.price" placeholder="" />
        </FormItem>
      </CardGrid>
    </Form>
  </Card>
</template>

<script lang="ts">
  import { defineComponent, watch } from 'vue';
  import type { PropType } from 'vue';
  import type { ProductColor } from '/@/api/yi/productManager';
  import { Card, Form, Input } from 'ant-design-vue';

  export default defineComponent({
    components: { Card, CardGrid: Card.Grid, Form, FormItem: Form.Item, Input },
    props: {
      value: {
        type: Array as PropType<ProductColor[]>,
        default: () => [],
      },
    },
    emits: ['change', 'update:value', 'value'],
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

<style lang="less" scoped>
  @import (reference) '../../../design/index.less';

  .color-input {
    &-card {
      padding: 15px;
    }
  }

  .respond-to(xsmall-only,{
    .color-input {
      &-card {
        width: 100%;
      }
    }
  });
  .respond-to(small-only,{
    .color-input {
      &-card {
        width: 50%;
      }
    }
  });
  .respond-to(medium-only,{
    .color-input{
      &-card {
        width: 50%;
      }
    }
  });
</style>
