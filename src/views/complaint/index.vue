<template>
  <div class="p-4">
    <div class="mb-4">
      <a-button class="mr-2" type="primary" @click="opHis">投诉历史</a-button>
    </div>
    <BasicTable @register="registerTable">
      <template #stat="{ record, column }">
        <a-tag style="margin: 0" color="blue" v-if="record.stat == 4"> 平台通过 </a-tag>
        <a-tag style="margin: 0" color="green" v-if="record.stat == 1"> 运营商通过 </a-tag>
        <a-tag style="margin: 0" color="red" v-if="record.stat == -1"> 驳回 </a-tag>
        <a-tag style="margin: 0" v-if="record.stat == 0"> 待审核 </a-tag>
      </template>
      <template #drawback="{ record, column }">
        <a-tag style="margin: 0" color="red" v-if="record.draw_back"> ¥{{ record.amt }} </a-tag>
        <a-tag style="margin: 0" color="green" v-else> 否 </a-tag>
      </template>
      <template #action="{ record, column }">
        <a-button size="small" @click="opFull(record)"> 详情 </a-button>
      </template>
    </BasicTable>
  </div>
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
    // name: 'Complaint',
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

      function opHis() {
        router.push({ name: 'ComplaintHis' });
      }

      return {
        registerTable,
        opFull,
        opHis,
      };
    },
  });
</script>
