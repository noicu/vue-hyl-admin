<template>
  <BasicTable @register="registerTable" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicColumn, BasicTable, FormProps, useTable } from '/@/components/Table';

  import { adminInfoList } from '/@/api/yi/adminManager';

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
        title: '系统管理员列表',
        api: adminInfoList,
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
      });

      console.log(registerTable, 81);

      return {
        registerTable,
      };
    },
  });
</script>
