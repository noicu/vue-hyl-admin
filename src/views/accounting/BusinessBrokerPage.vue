<template>
  <BasicTable @register="registerTable"> </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { businessBrokerPage } from '/@/api/trade';
  import { BrokerColumns } from './config';

  export default defineComponent({
    components: { BasicTable },
    props: {
      brokerId: [Number, String],
    },
    setup({ brokerId }) {
      const [registerTable] = useTable({
        title: '运营商账单',
        api: businessBrokerPage,
        fetchSetting: FETCH_SETTING,
        columns: BrokerColumns,
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
