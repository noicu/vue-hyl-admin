<template>
  <div class="high-form" v-loading="loading">
    <PageHeader title="商品详情" :sub-title="'ID：' + form.id_of_es" :ghost="false" />
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
                <InputNumber
                  v-model:value="form.visit_count"
                  :min="0"
                  style="width: 100%"
                  disabled
                />
              </FormItem>
            </Col>
            <Col :xs="24" :sm="12" :lg="8">
              <FormItem label="类别" style="margin-bottom: 0">
                <a-select v-model:value="form.cate_id" disabled>
                  <a-select-option :value="it.id" v-for="it in categoryList">
                    {{ it.name }}
                  </a-select-option>
                </a-select>
              </FormItem>
              <FormItem label="状态" style="margin-bottom: 0">
                <!-- <a-switch v-model:checked="form.enabled" /> -->
                {{ form.enabled ? '正常' : '禁止' }}
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
  import { computed, defineComponent, unref, reactive, watch, ref } from 'vue';
  import { Card, PageHeader, Input, Form, Row, Col, InputNumber } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import ProductNorm from './ProductNorm.vue';
  import ProductImage from './ProductImage.vue';
  import { PageFooter } from '/@/components/Page';
  import { productInfo } from '/@/api/yi/product';
  import type { ProductInfo } from '/@/api/yi/product';
  import { productCategoryList, Category, productCh } from '/@/api/yi/product';

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
        cate_name: '',
        created: '',
        enabled: false,
        id_of_es: '',
        image_main: '', //
        key_word: '', //
        last_updated: '',
        name: '', //
        remark: '', //
        visit_count: 0,
      });
      getCate();
      getProductInfo();

      async function getProductInfo() {
        try {
          const res = await productInfo({ id_of_es: unref(params).id as string });
          form.cate_id = res.cate_id;
          form.cate_name = res.cate_name;
          form.created = res.created;
          form.enabled = res.enabled;
          form.id_of_es = res.id_of_es;
          form.image_main = res.image_main;
          form.key_word = res.key_word;
          form.last_updated = res.last_updated;
          form.name = res.name;
          form.remark = res.remark;
          form.visit_count = res.cate_id;
          form.colors?.splice(0, form.colors.length);
          form.colors?.push(...(res.colors || []));
          form.images?.splice(0, form.images.length);
          form.images?.push(...(res.images || []));
        } catch (error) {
          console.log(error);
        } finally {
        }
      }

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
        if (!form.id_of_es) return;
        loading.value = true;
        try {
          await productCh(
            {
              image_main: form.image_main, //
              key_word: form.key_word, //
              name: form.name, //
              remark: form.remark, //
              colors: form.colors?.filter((it) => it.code != ''),
              images: form.images,
            },
            form.id_of_es
          );
          await getProductInfo();
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
