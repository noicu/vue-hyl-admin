<template>
  <BasicTable @register="registerTable">
    <template #stat="{ record, column }">
      {{ record.stat }}
      <a-tag color="green" v-if="record.stat == 4"> 运营商通过 </a-tag>
      <!-- <a-tag color="red" v-else> 已冻结 </a-tag> -->
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
  import { refundOrderPage } from '/@/api/trade';
  import { Columns } from './config';
  import { Popconfirm } from 'ant-design-vue';
  import router from '/@/router';

  export default defineComponent({
    components: { BasicTable, Popconfirm },
    props: {
      brokerId: [Number, String],
    },
    setup({ brokerId }) {
      const [registerTable] = useTable({
        title: '投诉列表',
        api: refundOrderPage,
        fetchSetting: FETCH_SETTING,
        columns: Columns,
        showIndexColumn: false,
        searchInfo: {
          broker_id: brokerId,
        },
      });

      function opFull(data: any) {
        router.push({ name: 'ComplaintFull', params: { id: data.id } });
      }

      return {
        registerTable,
        opFull,
      };
    },
  });
</script>
