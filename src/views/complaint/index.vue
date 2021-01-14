<template>
  <BasicTable @register="registerTable">
    <template #stat="{ record, column }">
      {{ record.stat }}
      <!-- <a-tag color="green" v-if="record.stat == 4"> 通过 </a-tag> -->
      <!-- <a-tag color="green" v-if="record.stat == 1"> 运营商通过 </a-tag> -->
      <!-- <a-tag color="green" v-if="record.stat == -1"> 运营商拒绝 </a-tag> -->
      <div style="text-align: left">
        <a-steps :current="1" size="small" status="error">
          <template #progressDot="{ index, status, prefixCls }">
            <a-popover>
              <template #content>
                {{ index + status }}
                <span>处理时间：{{ record.CreateDate }}</span>
              </template>
              <span :class="`${prefixCls}-icon-dot`" />
            </a-popover>
          </template>
          <a-step title="发起投诉" :description="record.nick" />
          <a-step title="运营商处理" :description="record.b_auditor_nick" />
          <a-step title="平台处理" :description="record.auditor_nick" />
          <a-step title="完成" :description="record.CreateDate" />
        </a-steps>
      </div>
    </template>
    <template #action="{ record, column }">
      <!-- <a-button size="small" @click="opFull(record)"> 详情 </a-button> -->
      <a-button size="small" @click="opFull(record)"> 驳回 </a-button>
      <a-button size="small" @click="opFull(record)"> 通过 </a-button>
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
