<template>
  <div class="p-4">
    <div class="mb-4">
      <a-button class="mr-2" @click="opHis">大师订单历史</a-button>
    </div>
    <BasicTable @register="registerTable"> </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { boYiOrderPage } from '/@/api/trade';
  import { MasterColumns } from './config';
  import router from '/@/router';

  export default defineComponent({
    components: { BasicTable },
    props: {
      brokerId: [Number, String],
    },
    setup({ brokerId }) {
      const [registerTable] = useTable({
        title: '大师订单',
        api: boYiOrderPage,
        fetchSetting: FETCH_SETTING,
        columns: MasterColumns,
        showIndexColumn: false,
        searchInfo: {
          where: {
            broker_id: brokerId,
          },
        },
      });

      function opHis() {
        router.push({ name: 'MasterHis' });
      }

      return {
        registerTable,
        opHis,
      };
    },
  });
</script>
