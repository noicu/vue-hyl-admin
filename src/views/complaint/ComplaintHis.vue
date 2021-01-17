<template>
  <BasicTable @register="registerTable">
    <template #stat="{ record, column }">
      <div style="text-align: left"><ComplaintSteps :record="record" /> </div>
    </template>
    <template #action="{ record, column }">
      <a-button size="small" @click="opFull(record)"> 详情 </a-button>
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { refundOrderHisPage } from '/@/api/trade';
  import { HisColumns } from './config';
  import { Popconfirm } from 'ant-design-vue';
  import router from '/@/router';
  import ComplaintSteps from './ComplaintSteps.vue';

  export default defineComponent({
    // name: 'ComplaintHis',
    components: { BasicTable, Popconfirm, ComplaintSteps },
    props: {
      brokerId: [Number, String],
    },
    setup({ brokerId }) {
      const [registerTable] = useTable({
        title: '投诉历史',
        api: refundOrderHisPage,
        fetchSetting: FETCH_SETTING,
        columns: HisColumns,
        showIndexColumn: false,
        searchInfo: {
          broker_id: brokerId,
        },
      });

      function opFull(data: any) {
        router.push({ name: 'ComplaintFullHis', params: { id: data.id } });
      }

      return {
        registerTable,
        opFull,
      };
    },
  });
</script>
