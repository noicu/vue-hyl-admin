<template>
  <BasicTable @register="registerTable"> </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { businessPlatPage } from '/@/api/trade';
  import { AdminColumns } from './config';

  export default defineComponent({
    components: { BasicTable },
    props: {},
    setup() {
      const [registerTable] = useTable({
        title: '平台账单',
        api: businessPlatPage,
        fetchSetting: FETCH_SETTING,
        columns: AdminColumns,
        showIndexColumn: false,
        searchInfo: {},
      });

      return {
        registerTable,
      };
    },
  });
</script>
