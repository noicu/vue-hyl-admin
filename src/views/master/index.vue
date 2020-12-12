<template>
  <BasicTable @register="registerTable" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicColumn, BasicTable, FormProps, useTable } from '/@/components/Table';

  import { masterInfoList } from '/@/api/yi/masterManager';

  const Columns: BasicColumn[] = [
    {
      title: 'UID',
      width: 150,
      dataIndex: 'uid',
    },
    {
      title: '昵称',
      dataIndex: 'nick',
      width: 120,
    },
    {
      title: '用户名',
      dataIndex: 'user_code',
    },
    {
      title: '状态',
      dataIndex: 'enabled',
    },
    {
      title: 'bad_rate',
      dataIndex: 'bad_rate',
    },
    {
      title: 'best_rate',
      dataIndex: 'best_rate',
    },
    {
      title: 'brief',
      dataIndex: 'brief',
    },
    {
      title: 'created_at',
      dataIndex: 'created_at',
    },
    {
      title: 'icon',
      dataIndex: 'icon',
    },
    {
      title: 'level',
      dataIndex: 'level',
    },
    {
      title: 'mid_rate',
      dataIndex: 'mid_rate',
    },
    {
      title: 'order_total',
      dataIndex: 'order_total',
    },
    {
      title: 'rate',
      dataIndex: 'rate',
    },
    {
      title: 'rebate',
      dataIndex: 'rebate',
    },
    {
      title: 'sign_date',
      dataIndex: 'sign_date',
    },
    {
      title: 'update_at',
      dataIndex: 'update_at',
    },
    {
      title: 'ver',
      dataIndex: 'ver',
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
    components: { BasicTable },
    setup() {
      const [registerTable] = useTable({
        title: '大师列表',
        api: masterInfoList,
        fetchSetting: {
          pageField: 'page_no',
          sizeField: 'rows_per_page',
          listField: 'data',
          totalField: 'rows_count',
        },
        columns: Columns,
        // useSearchForm: true,
        formConfig: FormItem,
        showTableSetting: true,
      });

      console.log(registerTable, 81);

      return {
        registerTable,
      };
    },
  });
</script>
