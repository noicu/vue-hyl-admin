<template>
  <div>
    <Row type="flex" style="flex-wrap: initial">
      <Col flex="200px" style="border-right: 1px solid #ededed"> </Col>
      <Col flex="auto">
        <BasicTable @register="registerTable">
          <template #id="{ record, column }">
            <a-popover trigger="hover" placement="right">
              <template #content>
                <a-button type="ghost" shape="circle" size="small" style="margin-right: 5px">
                  <Icon icon="mdi:clipboard-text-search" size="14" />
                </a-button>
                <spa>
                  {{ record.id_of_es }}
                </spa>
                <a-button type="ghost" shape="circle" size="small" style="margin-left: 5px">
                  <Icon icon="mdi:content-copy" size="14" />
                </a-button>
              </template>
              <a-button type="primary" shape="circle" size="small">
                <Icon icon="mdi:eye" size="12" />
              </a-button>
            </a-popover>
          </template>
          <template #toolbar>
            <Icon icon="ic:baseline-add" size="24" @click="handleFull()" />
          </template>
          <template #images="{ record, column }">
            <a-popover title="图片" trigger="hover" placement="right">
              <template #content>
                <img
                  :src="img.path"
                  v-for="img in record.images"
                  :key="img.path"
                  class="mr-1 img"
                  @click="handleClick(img.path)"
                  :alt="img.path"
                />
              </template>
              <a-button type="primary" size="small">
                {{ record.images.length }} 张图片...
              </a-button>
            </a-popover>
          </template>
          <template #colors="{ record, column }">
            <a-popover :title="record.name + ' - 规格'" trigger="hover" placement="left">
              <template #content>
                <div class="pcode" v-for="color in record.colors">
                  <input
                    type="text"
                    v-model="color.code"
                    style="background: #eee; border: 0"
                    placeholder="请输入规格名称"
                  />
                  <input
                    type="text"
                    v-model="color.price"
                    style="background: #eee; border: 0"
                    placeholder="请输入价格"
                  />
                </div>
              </template>
              <a-button type="primary" size="small">
                {{ record.colors.length }} 种规格...
              </a-button>
            </a-popover>
          </template>
          <template #action="{ record, column }">
            <a-button type="default" size="small" style="margin: 0 5px" @click="handleFull(record)">
              详情
            </a-button>
          </template>
          <template #enabled="{ record, column }">
            <a-switch
              checked-children="开"
              un-checked-children="关"
              :loading="isLoading(record.id_of_es)"
              :checked="record.enabled"
              @change="enabledChange(record)"
            />
          </template>
        </BasicTable>
      </Col>
    </Row>
    <div
      style="position: fixed; top: 80px; width: 199px; height: calc(100% - 80px); background: #fff"
    >
      <CategoryPage @click-item="onCategoryItem" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { createImgPreview } from '/@/components/Preview/index';
  import { productInfoList } from '/@/api/yi/product';
  import type { Category, ProductInfo } from '/@/api/yi/product';

  import { productSetEnabled } from '/@/api/user';

  import { FETCH_SETTING } from '/@/api/const';
  import { Tag, Row, Col, Popconfirm } from 'ant-design-vue';
  import router from '/@/router';
  import { Columns } from './config';
  import Icon from '/@/components/Icon/index';

  import { bToN } from '/@/utils/conversion';

  export const CategoryPage = createAsyncComponent(() => import('./category/index.vue'));

  export default defineComponent({
    components: { BasicTable, Tag, TableAction, Row, Col, CategoryPage, Icon, Popconfirm },
    setup() {
      function handleClick(img: string) {
        createImgPreview({ imageList: [img] });
      }

      function handleFull(record?: any) {
        if (record) {
          router.push({ name: 'ProductFull', params: { id: record.id_of_es } });
        } else {
          router.push({ name: 'ProductFull', params: { id: '添加商品' } });
        }
      }

      const [registerTable] = useTable({
        title: '商品列表',
        api: productInfoList,
        filtersConfig: { schemas: [] },
        fetchSetting: FETCH_SETTING,
        columns: Columns,
        showTableSetting: true,
        showIndexColumn: false,
      });

      const enableLoads: any = reactive({});
      const delLoads: any = reactive({});

      const isLoading = (id: string) => enableLoads[id];
      const isDelLoads = (id: string) => delLoads[id];

      function onCategoryItem(e: Category) {
        console.log(e);
      }

      // 开关切换时执行
      // 禁用/启用商品
      async function enabledChange(e: ProductInfo) {
        if (!e.id_of_es) return;
        try {
          e.enabled = !e.enabled;
          enableLoads[e.id_of_es] = true;
          await productSetEnabled({
            enabled: bToN(e.enabled),
            id_of_es: e.id_of_es,
          });
        } catch (error) {
          console.log(error);
          e.enabled = !e.enabled;
        } finally {
          enableLoads[e.id_of_es] = false;
        }
      }

      return {
        registerTable,
        handleClick,
        handleFull,
        onCategoryItem,
        isLoading,
        isDelLoads,
        enabledChange,
      };
    },
  });
</script>
<style lang="less" scoped>
  .img {
    width: 40px;
    // height: 100px;
    max-height: 40px;

    &::after {
      // position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 30px;
      height: 30px;
      // background: url('/img/default.png');
      background-size: 100%;
      content: '';
    }
  }

  .pcode {
    // display: inline-block;
  }
</style>
