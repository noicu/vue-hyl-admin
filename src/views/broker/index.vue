<template>
  <BasicTable @register="registerTable" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicColumn, BasicTable, FormProps, useTable } from '/@/components/Table';

  import { brokerInfoList } from '/@/api/brokers/brokerAdmin';

  const Columns: BasicColumn[] = [
    {
      title: 'ID',
      width: 150,
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '摘要',
      dataIndex: 'brief',
    },
    {
      title: '服务码',
      dataIndex: 'service_code',
    },
    {
      title: '更新时间',
      dataIndex: 'update_at',
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'created_at',
    },
  ];

  const FormItem: Partial<FormProps> = {
    labelWidth: 100,
    schemas: [
      {
      field: `name`,
      label: `名称`,
      component: 'Input',
      colProps: {
        xl: 12,
        xxl: 8,
      },
    }
      // {
      //   field: `name`,
      //   label: `字段33`,
      //   component: 'Select',
      //   defaultValue: '1',
      //   componentProps: {
      //     options: [
      //       {
      //         label: '选项1',
      //         value: '1',
      //       },
      //       {
      //         label: '选项2',
      //         value: '2',
      //       },
      //     ],
      //   },
      //   colProps: {
      //     xl: 12,
      //     xxl: 8,
      //   },
      // },
    ],
  };

  export default defineComponent({
    components: { BasicTable },
    setup() {
      const [registerTable] = useTable({
        title: '运营商列表',
        api: brokerInfoList,
        fetchSetting: {
          pageField:'page_no',
          sizeField:'rows_per_page',
          listField:'data',
          totalField:'rows_count',
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
