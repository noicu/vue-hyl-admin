<template>
  <div>
    <Row type="flex" style="flex-wrap: initial">
      <Col flex="200px" style="border-right: 1px solid #ededed"> </Col>
      <Col flex="auto">
        <a-page-header
          v-if="isShow"
          title="商品列表"
          :ghost="false"
          :class="`${prefixCls}__header`"
        >
          <template #extra>
            <a-checkbox v-model:checked="allChecked" :indeterminate="indeterminate">
              全选
            </a-checkbox>
            <span v-if="allChecked || indeterminate">
              <a-button class="mr-2" type="primary" size="small" @click="openE()">
                批量修改价格
              </a-button>
              <Popconfirm :title="`确定要删除吗?`" @confirm="onDelete()">
                <template #icon><Icon icon="mdi:alert" style="color: red" /></template>
                <a-button type="danger" size="small"> 批量删除 </a-button>
              </Popconfirm>
            </span>
            <a-button type="primary" v-if="!!cateId" @click="addProduct"> 新增商品 </a-button>
          </template>
        </a-page-header>
        <div :class="`${prefixCls}__container`">
          <a-list :loading="loading" item-layout="horizontal" :data-source="data">
            <template #renderItem="{ item, index }">
              <a-list-item style="align-items: start">
                <template #actions>
                  <a-button type="primary" @click="openE(item)"> 修改价格 </a-button>
                  <Popconfirm
                    v-if="!allChecked || indeterminate"
                    :title="`确定要删除吗?`"
                    @confirm="onDelete(item.product_id)"
                  >
                    <template #icon>
                      <Icon icon="mdi:alert" style="color: red" />
                    </template>
                    <a-button type="danger"> 删除 </a-button>
                  </Popconfirm>
                </template>
                <div style="padding-right: 10px">
                  <a-checkbox v-model:checked="checked[item.product_id]"> </a-checkbox>
                </div>
                <a-list-item-meta>
                  <template #title>
                    <a>{{ item.name }}</a>
                  </template>
                  <template #avatar>
                    <Image :width="100" :height="100" style="height: 100%" :src="item.image_main" />
                  </template>
                  <template #description>
                    <ImageGroup>
                      <Image
                        v-for="image in item.images || []"
                        :width="50"
                        :height="50"
                        :src="image.path"
                        style="height: 100%"
                      />
                    </ImageGroup>
                  </template>
                </a-list-item-meta>
                <a-list-item-meta>
                  <template #title>
                    <span>规格</span>
                    <a-tag style="margin-left: 10px" color="orange">
                      加价：¥ {{ item.price_offset }}
                    </a-tag>
                  </template>
                  <template #description>
                    <div v-for="color in item.colors">
                      <div class="pcode">
                        <span> 名称：{{ color.code }} </span>
                        <a-tag style="margin-left: 10px" color="#2db7f5">
                          原价：¥ {{ color.price }}
                        </a-tag>
                        <a-tag style="margin: 0" color="#108ee9">
                          现价：¥ {{ color.price + item.price_offset }}
                        </a-tag>
                      </div>
                    </div>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </Col>
    </Row>
    <div
      style="position: fixed; top: 80px; width: 199px; height: calc(100% - 80px); background: #fff"
    >
      <CategoryPage @change="onCategoryChanged" />
    </div>
    <AddProductModal @register="register" @okl="okl" />

    <BasicModal @register="registerE" title="商品加价" :width="400" @ok="okE">
      <Form layout="vertical" :model="form">
        <FormItem label="加价" style="margin-bottom: 0">
          <InputNumber v-model:value="form.offset" :min="0" />
        </FormItem>
      </Form>
    </BasicModal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch, unref, reactive } from 'vue';
  import { brokerProductPage } from '/@/api/user';
  import { Image, ImageGroup } from '/@/components/Image';
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  export const CategoryPage = createAsyncComponent(() => import('./category/index.vue'));
  import { Row, Col, Popconfirm, Form, InputNumber } from 'ant-design-vue';
  import Icon from '/@/components/Icon/index';
  import AddProductModal from './AddProductModal.vue';
  import { useModal, BasicModal } from '/@/components/Modal';
  import { brokerProductPriceCh, brokerProductRm } from '/@/api/user';

  export default defineComponent({
    components: {
      Image,
      ImageGroup,
      CategoryPage,
      Row,
      Col,
      Popconfirm,
      Icon,
      AddProductModal,
      BasicModal,
      Form,
      FormItem: Form.Item,
      InputNumber,
    },
    props: {
      brokerId: [Number, String],
    },
    setup({ brokerId }) {
      const loading = ref(false);
      const data = ref([]);
      const checked = reactive<any>({});
      const allChecked = ref(false);
      const indeterminate = ref(false);
      const cateId = ref<Number>(0);
      const [register, { openModal }] = useModal();
      const [registerE, { openModal: openEModal }] = useModal();

      const form = reactive({
        product_id: [] as any[],
        offset: 1,
      });

      watch(allChecked, (val) => {
        indeterminate.value = false;
        for (let key in unref(checked)) {
          if (val) {
            if (!checked[key]) checked[key] = true;
          } else {
            if (checked[key]) checked[key] = false;
          }
        }
      });

      watch(checked, () => {
        let c = 0;
        for (let key in unref(checked)) {
          if (checked[key]) c++;
        }
        console.log(c);
        indeterminate.value = !!c && c < Object.keys(checked).length;

        allChecked.value = !!c && c == Object.keys(checked).length;
      });

      async function getData() {
        loading.value = true;
        try {
          const src = await brokerProductPage({
            cate_id: cateId.value,
            broker_id: Number(brokerId),
            page_no: 1,
            rows_per_page: 10000,
          });
          data.value = src.data;
          data.value.forEach((it: any) => {
            if (!checked[it.product_id]) {
              checked[it.product_id] = false;
            } else {
              checked[it.product_id] = true;
            }
          });
        } catch (error) {
          console.error(error);
        } finally {
          loading.value = false;
        }
      }

      watch(cateId, () => {
        for (let key in unref(checked)) {
          delete checked[key];
        }
        getData();
      });

      function onCategoryChanged(e: Number) {
        cateId.value = e;
      }

      async function onDelete(e: any = null) {
        form.product_id = [];
        try {
          if (e) {
            form.product_id = [e];
          } else {
            upC();
          }
          await brokerProductRm({
            list_product_id: form.product_id,
          });
        } catch (error) {}
      }

      function upC() {
        Object.keys(checked).forEach((it) => {
          console.log(checked[it]);
          if (checked[it]) form.product_id.push(it);
        });
      }

      function addProduct() {
        openModal(true, { id: cateId.value, bp: unref(data) });
      }

      function okl() {
        getData();
      }

      async function okE() {
        console.log(form);
        try {
          await brokerProductPriceCh({
            list: form.product_id.map((it) => ({
              product_id: it,
              price_offset: form.offset,
            })),
          });
          getData();
        } catch (error) {
          console.error(error);
        } finally {
          openEModal(false);
        }
      }

      function openE(e: any = null) {
        form.product_id = [];
        if (e) {
          form.product_id = [e.product_id];
          form.offset = e.price_offset;
        } else {
          form.offset = 1;
          upC();
        }
        openEModal();
      }

      return {
        prefixCls: 'list-product',
        loading,
        data,
        isShow: true,
        checked,
        allChecked,
        onCategoryChanged,
        indeterminate,
        onDelete,
        cateId,
        register,
        addProduct,
        okl,
        registerE,
        form,
        okE,
        openE,
      };
    },
  });
</script>
<style lang="less" scoped>
  .list-product {
    &__container {
      padding: 12px;
      margin: 24px;
      background: #fff;
    }
  }

  .pcode {
    display: inline-block;
    padding: 5px;
    margin: 5px;
    background: #f1f1f1;
    border-radius: 5px;
  }
</style>
