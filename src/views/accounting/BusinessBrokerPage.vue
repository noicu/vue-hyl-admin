<template>
  <BasicTable @register="registerTable">
    <template #type="{ record, column }">
      <a-tag color="blue" v-if="record.b_type == 'user-recharge'"> 用户充值 </a-tag>
      <a-tag color="cyan" v-else-if="record.b_type == 'recharge'"> 充值 </a-tag>
      <a-tag color="orange" v-else-if="record.b_type == 'broker-draw-money'"> 运营商提现 </a-tag>
      <a-tag color="orange" v-else-if="record.b_type == 'master-draw-money'"> 大师提现 </a-tag>
      <a-tag color="purple" v-else-if="record.b_type == 'acc-adjust'"> 用户余额调整 </a-tag>
      <a-tag color="green" v-else-if="record.b_type == 'yi-order'"> 大师订单分润 </a-tag>
      <a-tag color="orange" v-else-if="record.b_type == 'yi-order-r'"> 大师订单退款 </a-tag>
      <a-tag color="green" v-else-if="record.b_type == 'bbs-prize'"> 悬赏贴分润 </a-tag>
      <a-tag color="green" v-else-if="record.b_type == 'bbs-vie'"> 闪断贴分润 </a-tag>
      <a-tag color="green" v-else-if="record.b_type == 'mall'"> 商城订单分润 </a-tag>

      <a-tag v-else> {{ record.b_type }} </a-tag>
    </template>
    <template #amt="{ record, column }">
      <a-tag color="">
        <img
          v-if="record.amt > 0"
          style="vertical-align: middle !important"
          :src="riseSvg"
          alt=""
        />
        <img
          v-if="record.amt < 0"
          style="vertical-align: middle !important"
          :src="downSvg"
          alt=""
        />
        {{ record.amt }}
      </a-tag>
    </template>
    <template #amtend="{ record, column }">
      {{ record.amt_start + record.amt }}
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { businessBrokerPage } from '/@/api/trade';
  import { BrokerColumns } from './config';

  import riseSvg from '/@/assets/svg/dashboard/analysis-rise.svg';
  import downSvg from '/@/assets/svg/dashboard/analysis-down.svg';

  export default defineComponent({
    components: { BasicTable },
    props: {
      brokerId: [Number, String],
    },
    setup() {
      const [registerTable] = useTable({
        title: '运营商账单',
        api: businessBrokerPage,
        fetchSetting: FETCH_SETTING,
        columns: BrokerColumns,
        showIndexColumn: false,
        // searchInfo: {
        //   where: {
        //     broker_id: brokerId,
        //   },
        // },
        filtersConfig: {
          schemas: [
            {
              field: 'bill_no',
              label: '业务单号',
            },
            {
              field: 'b_type',
              label: '业务类型',
              option: [
                {
                  label: '运营商提现',
                  value: 'broker-draw-money',
                },
                {
                  label: '用户余额调整',
                  value: 'acc-adjust',
                },
                {
                  label: '大师订单分润',
                  value: 'yi-order',
                },
                {
                  label: '大师订单退款',
                  value: 'yi-order-r',
                },
                {
                  label: '悬赏贴分润',
                  value: 'bbs-prize',
                },
                {
                  label: '闪断贴分润',
                  value: 'bbs-vie',
                },
                {
                  label: '商城订单分润',
                  value: 'mall',
                },
              ],
            },
          ],
        },
      });

      return {
        registerTable,
        riseSvg,
        downSvg,
      };
    },
  });
</script>
