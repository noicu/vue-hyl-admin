<template>
  <BasicTable @register="registerTable"></BasicTable>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { drawMoneyPage } from '/@/api/trade';
  import { FETCH_SETTING } from '/@/api/const';
  import { Columns } from './config';

  export default defineComponent({
    components: { BasicTable },
    setup() {
      const [registerTable] = useTable({
        title: '运营商提现列表',
        api: drawMoneyPage,
        fetchSetting: FETCH_SETTING,
        columns: Columns,
        showIndexColumn: false,
        showTableSetting: true,
        showFilter: true,
      });

      return {
        registerTable,
      };
    },
  });
</script>

<style></style>
