<template>
  <BasicTable @register="registerTable">
    <template #type="{ record, column }">
      <a-tag color="blue" v-if="record.b_type == 'user-recharge'"> 用户充值 </a-tag>
      <a-tag color="cyan" v-else-if="record.b_type == 'recharge'"> 充值 </a-tag>
      <a-tag color="orange" v-else-if="record.b_type == 'broker-draw-money'"> 运营商提现 </a-tag>
      <a-tag color="orange" v-else-if="record.b_type == 'master-draw-money'"> 大师提现 </a-tag>
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
      {{ record.AmtStart + record.amt }}
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { businessPlatPage } from '/@/api/trade';
  import { AdminColumns } from './config';

  import riseSvg from '/@/assets/svg/dashboard/analysis-rise.svg';
  import downSvg from '/@/assets/svg/dashboard/analysis-down.svg';

  export default defineComponent({
    components: { BasicTable },
    props: {},
    setup() {
      const [registerTable] = useTable({
        title: '平台账单',
        api: businessPlatPage,
        fetchSetting: FETCH_SETTING,
        columns: AdminColumns,
        showIndexColumn: false,
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
                  label: '用户充值',
                  value: 'user-recharge',
                },
                {
                  label: '充值',
                  value: 'recharge',
                },
                {
                  label: '运营商提现',
                  value: 'broker-draw-money',
                },
                {
                  label: '大师提现',
                  value: 'master-draw-money',
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
