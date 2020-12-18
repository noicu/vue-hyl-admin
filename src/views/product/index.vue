<template>
  <div>
    <Row type="flex" style="flex-wrap: initial">
      <Col flex="200px" style="border-right: 1px solid #ededed"> </Col>
      <Col flex="auto">
        <BasicTable @register="registerTable">
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
                  <input type="text" v-model="color.code" />
                  <input type="text" v-model="color.price" />
                </div>
              </template>
              <a-button type="primary" size="small">
                {{ record.colors.length }} 种规格...
              </a-button>
            </a-popover>
          </template>
          <template #action="{ record, column }">
            <a-button type="default" size="small" @click="handleFull(record)"> 详情 </a-button>
          </template>
          <template #enabled="{ record, column }">
            <a-switch checked-children="开" un-checked-children="关" default-checked />
          </template>
        </BasicTable>
      </Col>
    </Row>
    <div
      style="position: fixed; top: 80px; width: 199px; height: calc(100% - 80px); background: #fff"
    >
      <Category />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { createImgPreview } from '/@/components/Preview/index';
  import { productInfoList, Category } from '/@/api/yi/productManager';
  import { FETCH_SETTING } from '/@/api/const';
  import { Tag, Row, Col } from 'ant-design-vue';
  import router from '/@/router';
  import { Columns } from './config';

  export const Category = createAsyncComponent(() => import('./category/index.vue'));

  export default defineComponent({
    components: { BasicTable, Tag, TableAction, Row, Col, Category },
    setup() {
      function handleClick(img: string) {
        createImgPreview({ imageList: [img] });
      }

      function handleFull(record: EditRecordRow) {
        router.push({ name: 'ProductFull', params: { id: record.id_of_es } });
      }

      const [registerTable] = useTable({
        title: '商品列表',
        api: productInfoList,
        showFilter: true,
        fetchSetting: FETCH_SETTING,
        columns: Columns,
        showTableSetting: true,
        showIndexColumn: false,
      });

      return {
        registerTable,
        handleClick,
        handleFull,
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
