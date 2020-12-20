<template>
  <div class="high-form">
    <PageHeader title="商品详情" sub-title="ID：BXT5aHUBUEDNcUc8voXi" :ghost="false" />
    <div class="main-content">
      <a-card title="基本信息" :bordered="false">
        <Form layout="vertical" :model="form">
          <Row :gutter="[16, 8]">
            <Col :xs="24" :sm="12" :lg="8">
              <FormItem label="名称" style="margin-bottom: 0">
                <Input v-model:value="form.name" />
              </FormItem>
              <FormItem label="关键词" style="margin-bottom: 0">
                <Input v-model:value="form.key_word" />
              </FormItem>
            </Col>
            <Col :xs="24" :sm="12" :lg="8">
              <FormItem label="备注" style="margin-bottom: 0">
                <Input v-model:value="form.remark" />
              </FormItem>
              <FormItem label="访问次数" style="margin-bottom: 0">
                <InputNumber v-model:value="form.visit_count" :min="0" style="width: 100%" />
              </FormItem>
            </Col>
            <Col :xs="24" :sm="12" :lg="8">
              <FormItem label="类别" style="margin-bottom: 0">
                <a-select v-model:value="form.cate_id">
                  <a-select-option value="jack"> Jack </a-select-option>
                  <a-select-option value="lucy"> Lucy </a-select-option>
                  <a-select-option value="disabled" disabled> Disabled </a-select-option>
                  <a-select-option value="Yiminghe"> yiminghe </a-select-option>
                </a-select>
              </FormItem>
              <FormItem label="状态" style="margin-bottom: 0">
                <a-switch v-model:checked="form.enabled" />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </a-card>
      <ProductNorm v-model:value="form.colors" class="mt-5" />
      <ProductImage v-model:value="form.images" class="mt-5" />
    </div>

    <PageFooter>
      <template #left> 最近更新时间：{{ form.last_updated }} </template>
      <template #right>
        <a-button type="primary" @click="submitAll">提交全部</a-button>
      </template>
    </PageFooter>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, unref, reactive, watch } from 'vue';
  import { Card, PageHeader, Input, Form, Row, Col, InputNumber } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import ProductNorm from './ProductNorm.vue';
  import ProductImage from './ProductImage.vue';
  import { PageFooter } from '/@/components/Page';
  import { productInfo } from '/@/api/yi/productManager';
  import type { ProductInfo } from '/@/api/yi/productManager';

  export default defineComponent({
    components: {
      CardGrid: Card.Grid,
      ProductNorm,
      ProductImage,
      PageFooter,
      PageHeader,
      Input,
      InputNumber,
      Form,
      Row,
      Col,
      FormItem: Form.Item,
    },
    setup() {
      const { currentRoute } = useRouter();

      const params = computed(() => {
        return unref(currentRoute).params;
      });

      const isAdd = computed(() => unref(params).id == 'add');

      const form = reactive<ProductInfo>({
        colors: [],
        images: [],
      });

      getProductInfo();

      async function getProductInfo() {
        try {
          const res = await productInfo({ id_of_es: unref(params).id as string });
          form.colors?.push(...(res.colors || []));
          form.images?.push(...(res.images || []));
          // for (let key in res) {
          //   ;
          // }
          console.log(res);
        } catch (error) {
          console.log(error);
        } finally {
        }
      }

      watch(form.colors, (v: any) => console.log(v));

      watch(form.images, (v: any) => console.log(v));

      function submitAll() {}

      return {
        params,
        isAdd,
        form,
        submitAll,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import (reference) '../../../design/index.less';

  .high-form {
    padding-bottom: 48px;
  }

  .main-content {
    margin: 20px;
  }
  .respond-to(xsmall-only,{
    .main-content{
      margin:0;
    }
  });

  .img-input {
    &-card {
      width: 100px;
      min-height: 100px;
      padding: 5px;
      cursor: pointer;
    }
  }

  .img {
    width: 100%;
  }
</style>
