<template>
  <BasicTable @register="registerTable"> </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { brokerInfoList } from '/@/api/yi/brokerManager';
  import { Columns } from './config';

  export default defineComponent({
    components: { BasicTable },
    setup() {
      const [registerTable] = useTable({
        title: '运营商列表',
        api: brokerInfoList,
        fetchSetting: FETCH_SETTING,
        columns: Columns,
        showTableSetting: true,
        showFilter: true,
      });

      return {
        registerTable,
      };
    },
  });
</script>
