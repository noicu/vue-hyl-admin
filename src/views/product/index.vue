<template>
  <BasicTable @register="registerTable">
    <template #images="{ record, column }">
      <img
        :src="img.path"
        v-for="img in record.images"
        :key="img.path"
        class="mr-1 img"
        @click="handleClick(img.path)"
        :alt="img.path"
      />
    </template>
    <template #colors="{ record, column }">
      <div class="pcode" v-for="color in record.colors">
        <Tag color="default">
          <span>{{ color.code }}</span
          >:
          <span> {{ color.price }}</span>
        </Tag>
      </div>
    </template>
    <template #action="{ record, column }">
      <TableAction :actions="createActions(record)" />
    </template>
    <template #enabled="{ record, column }">
      <a-switch checked-children="开" un-checked-children="关" default-checked />
    </template>
  </BasicTable>
  <UpImg />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import {
    BasicTable,
    useTable,
    TableAction,
    EditRecordRow,
    ActionItem,
  } from '/@/components/Table';

  import { UpImg } from '/@/components/UpImg';
  import { createImgPreview } from '/@/components/Preview/index';
  import { productInfoList } from '/@/api/yi/productManager';
  import { Tag } from 'ant-design-vue';
  import router from '/@/router';
  import { Columns, FormItem } from './config';
  // import { upload } from '/@/api/img'

  export default defineComponent({
    components: { BasicTable, Tag, TableAction, UpImg },
    setup() {
      // const go = useGo();

      function handleClick(img: string) {
        createImgPreview({ imageList: [img] });
      }

      function handleEdit(record: EditRecordRow) {
        // currentEditKeyRef.value = record.key;
        router.push({ name: 'ProductDesc', params: { id: record.id_of_es } });
        // go({ name: 'ProductDesc', params: { id: record.id_of_es } }, false);
        console.log(record.id_of_es);
        record.editable = true;
      }

      function createActions(record: EditRecordRow): ActionItem[] {
        return [
          {
            label: '详情',
            onClick: handleEdit.bind(null, record),
          },
        ];
      }

      // upload()

      const [registerTable] = useTable({
        title: '商品列表',
        api: productInfoList,
        showFilter: true,
        fetchSetting: {
          pageField: 'page_no',
          sizeField: 'rows_per_page',
          listField: 'data',
          totalField: 'rows_count',
        },
        expandRowByClick: true,
        columns: Columns,
        // useSearchForm: true,
        formConfig: FormItem,
        showTableSetting: true,
        showIndexColumn: false,
        actionColumn: {
          width: 70,
          title: '操作',
          align: 'center',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      console.log(registerTable, 81);

      return {
        registerTable,
        handleClick,
        createActions,
      };
    },
  });
</script>
<style lang="less" scoped>
  .img {
    width: 20px;
    // height: 100px;
    max-height: 20px;

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
    display: inline-block;
  }
</style>
