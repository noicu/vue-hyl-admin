<template>
  <BasicTable @register="registerTable"></BasicTable>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';

  export default defineComponent({
    components: { BasicTable },
    setup() {
      const [registerTable] = useTable({
        title: '大师列表',
        // api: masterInfoList,
        fetchSetting: FETCH_SETTING,
        columns: [],
        showTableSetting: true,
        showFilter: true,
      });

      return {
        registerTable,
      };
    },
  });
</script>
