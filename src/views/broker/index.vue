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
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 80,
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
    },
    {
      title: '结束时间',
      sorter: true,
      dataIndex: 'endTime',
    },
  ];

  const FormItem: Partial<FormProps> = {
    labelWidth: 100,
    schemas: [
      {
        field: `field11`,
        label: `字段33`,
        component: 'Select',
        defaultValue: '1',
        componentProps: {
          options: [
            {
              label: '选项1',
              value: '1',
            },
            {
              label: '选项2',
              value: '2',
            },
          ],
        },
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
        title: '运营商列表',
        api: brokerInfoList,
        columns: Columns,
        useSearchForm: true,
        formConfig: FormItem,
        showTableSetting: true,
      });

      console.log(registerTable)

      return {
        registerTable,
      };
    },
  });
</script>
