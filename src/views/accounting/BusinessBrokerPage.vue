<template>
  <BasicTable @register="registerTable"> </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { bMasterPage } from '/@/api/yi/master';
  import { MasterColumns } from './config';

  export default defineComponent({
    components: { BasicTable },
    props: {
      brokerId: [Number, String],
    },
    setup({ brokerId }) {
      const [registerTable] = useTable({
        title: '运营商账单',
        api: bMasterPage,
        fetchSetting: FETCH_SETTING,
        columns: MasterColumns,
        showIndexColumn: false,
        searchInfo: {
          where: {
            broker_id: brokerId,
          },
        },
      });

      return {
        registerTable,
      };
    },
  });
</script>
