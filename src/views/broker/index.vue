<template>
  <BasicTable @register="registerTable">
    <template #enabled="{ record, column, text }">
      <Checkbox :checked="text ? true : false" />{{ text }}
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Checkbox } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { brokerInfoList } from '/@/api/yi/broker';
  import { Columns } from './config';

  export default defineComponent({
    components: { BasicTable, Checkbox },
    setup() {
      const sw = ref({
        checkedChildren: '开',
        unCheckedChildren: '关',
        loading: 'isLoading(record)',
        checked: 'nToB(record.enabled)',
        onChange: 'enabledChange(record)',
      });

      const [registerTable] = useTable({
        title: '运营商列表',
        api: brokerInfoList,
        fetchSetting: FETCH_SETTING,
        columns: Columns,
        showTableSetting: true,
        showIndexColumn: false,
        showFilter: true,
        bordered: true,
      });

      return {
        registerTable,
        sw,
      };
    },
  });
</script>
