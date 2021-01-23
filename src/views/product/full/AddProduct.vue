<template>
  <div class="high-form" v-loading="loading">
    <PageHeader title="添加商品" :ghost="false" />
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
            </Col>
            <Col :xs="24" :sm="12" :lg="8">
              <FormItem label="类别" style="margin-bottom: 0">
                <a-select v-model:value="form.cate_id">
                  <a-select-option :value="it.id" v-for="it in categoryList">
                    {{ it.name }}
                  </a-select-option>
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
      <template #right>
        <a-button type="primary" @click="submitAll">提交全部</a-button>
      </template>
    </PageFooter>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, unref, reactive, watch, ref, toRaw } from 'vue';
  import { Card, PageHeader, Input, Form, Row, Col, InputNumber } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import ProductNorm from './ProductNorm.vue';
  import ProductImage from './ProductImage.vue';
  import { PageFooter } from '/@/components/Page';
  import type { ProductInfo } from '/@/api/yi/product';
  import { productCategoryList, Category, productAdd } from '/@/api/yi/product';
  import router from '/@/router';

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
      const categoryList = ref<Category[]>([
        {
          id: 0,
          name: '无',
        },
      ]);

      const params = computed(() => {
        return unref(currentRoute).params;
      });

      const isAdd = computed(() => unref(params).id == 'add');

      const form = reactive<ProductInfo>({
        colors: [{ code: '', price: 0 }],
        images: [],
        cate_id: 0,
        enabled: true,
        id_of_es: '',
        image_main: '', //
        key_word: '', //
        name: '', //
        remark: '', //
      });
      getCate();

      async function getCate() {
        try {
          categoryList.value = await productCategoryList();
        } catch (error) {
          console.log(error);
        }
      }

      watch(form.colors, (v: any) => {
        let m = 0;
        for (let i = 0; i < v.length; i++) {
          if (v[i].code != '') {
            m++;
          }
        }
        if (m == v.length) {
          form.colors?.push({ code: '', price: 0 });
        }
      });

      watch(form.images, (v: any) => console.log(v));

      const loading = ref(false);

      async function submitAll() {
        loading.value = true;
        try {
          await productAdd({
            ...toRaw(form),
            colors: toRaw(form).colors?.filter((it) => it.code != ''),
          });
          router.push({ name: 'Product' });
        } catch (error) {
          console.log(error);
        } finally {
          loading.value = false;
        }
      }

      return {
        params,
        isAdd,
        form,
        submitAll,
        categoryList,
        loading,
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
