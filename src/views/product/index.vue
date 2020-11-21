<template>
  <BasicTable @register="registerTable">
    <template #expandedRowRender="{ record }">
      <div>
        <div class="pcode" v-for="color in record.colors">
          <Tag color="default">
            <span>{{ color.code }}</span
            >:
            <span> {{ color.price }}</span>
          </Tag>
        </div>
      </div>
      <div>
        <img
          :src="img.path"
          v-for="img in record.images"
          :key="img.path"
          class="mr-2 img"
          @click="handleClick(img.path)"
          :alt="img.path"
        />
      </div>
    </template>
    <template #action="{ record, column }">
      <TableAction :actions="createActions(record)" />
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import {
    BasicColumn,
    BasicTable,
    FormProps,
    useTable,
    TableAction,
    EditRecordRow,
    ActionItem,
  } from '/@/components/Table';
  import { createImgPreview } from '/@/components/Preview/index';
  import { productInfoList } from '/@/api/product/product';
  import { Tag } from 'ant-design-vue';
  import router from '/@/router';

  // import { useGo } from '/@/hooks/web/usePage';
  const Columns: BasicColumn[] = [
    {
      title: 'UID',
      width: 150,
      dataIndex: 'uid',
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '类型',
      dataIndex: 'cate_name',
    },
    {
      title: '状态',
      dataIndex: 'enabled',
    },
  ];

  const FormItem: Partial<FormProps> = {
    labelWidth: 100,
    schemas: [
      {
        field: `user_code`,
        label: `用户名`,
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: `nick`,
        label: `昵称`,
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };

  export default defineComponent({
    components: { BasicTable, Tag, TableAction },
    setup() {
      // const go = useGo();

      function handleClick(img: string) {
        createImgPreview({ imageList: [img] });
      }
      function handleEdit(record: EditRecordRow) {
        // currentEditKeyRef.value = record.key;
        router.push({ name: 'ProductDesc', params: { id: record.id_of_es },meta:{a:1} });
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
      const [registerTable] = useTable({
        title: '商品列表',
        api: productInfoList,
        fetchSetting: {
          pageField: 'page_no',
          sizeField: 'rows_per_page',
          listField: 'data',
          totalField: 'rows_count',
        },
        columns: Columns,
        useSearchForm: true,
        formConfig: FormItem,
        showTableSetting: true,
        actionColumn: {
          width: 160,
          title: '操作',
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
    width: 100px;
    // height: 100px;
    max-height: 100px;
  }

  .pcode {
    display: inline-block;
  }
</style>
