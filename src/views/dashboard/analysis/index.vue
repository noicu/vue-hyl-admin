<template>
  <div v-loading="loadingRef" loading-tip="加载中...">
    <a-page-header :ghost="false">
      <template #title>
        <Space align="center">
          <a-select v-model:value="year" @change="dateChange">
            <template v-for="it in [2020, 2021]" :key="it">
              <a-select-option :value="it"> {{ it }} </a-select-option>
            </template>
          </a-select>
          <span> 年 </span>

          <a-select v-model:value="month" @change="dateChange">
            <template v-for="it in 12" :key="it">
              <a-select-option :value="it"> {{ it }} </a-select-option>
            </template>
          </a-select>
          <span> 月财报 </span>
        </Space>
      </template>
    </a-page-header>

    <div class="analysis p-4">
      <a-row class="pl-2">
        <template v-for="item in growCardList" :key="item.title">
          <ACol :sm="24" :md="12" :lg="6">
            <GrowCard :info="item" />
          </ACol>
        </template>
      </a-row>

      <a-row>
        <a-col :span="24" class="my-3">
          <CollapseContainer title="利润" :canExpan="false">
            <a-row>
              <a-col :span="12" class="my-3">
                <ProfitPan v-model:data="profitpan" />
              </a-col>
              <a-col :span="12" class="my-3">
                <ProfitZu v-model:data="profitpan" />
              </a-col>
            </a-row>
          </CollapseContainer>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24" class="my-3">
          <CollapseContainer title="订单" :canExpan="false">
            <a-row>
              <a-col :span="12" class="my-3">
                <QtyOrder v-model:data="qtyOrder" />
              </a-col>
              <a-col :span="12" class="my-3">
                <AmtOrder v-model:data="amtOrder" />
              </a-col>
            </a-row>
          </CollapseContainer>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, onMounted, ref } from 'vue';
  import { Space } from 'ant-design-vue';
  import GrowCard from './components/GrowCard.vue';

  import ProfitPan from './components/ProfitPan.vue';
  import AmtOrder from './components/AmtOrder.vue';
  import QtyOrder from './components/QtyOrder.vue';
  import ProfitZu from './components/ProfitZu.vue';

  import { incomePlatMonthPage } from '/@/api/trade';

  import { CollapseContainer } from '/@/components/Container/index';

  import iconSvg1 from '/@/assets/svg/dashboard/analysis-icon1.svg';
  import iconSvg2 from '/@/assets/svg/dashboard/analysis-icon2.svg';
  import iconSvg3 from '/@/assets/svg/dashboard/analysis-icon3.svg';
  // import iconSvg4 from '/@/assets/svg/dashboard/analysis-icon4.svg';
  import iconSvg5 from '/@/assets/svg/dashboard/analysis-icon5.svg';

  import moment from 'moment';

  export default defineComponent({
    components: {
      GrowCard,
      CollapseContainer,
      ProfitPan,
      AmtOrder,
      QtyOrder,
      ProfitZu,
      Space,
    },
    setup() {
      const growCardList = reactive<any[]>([
        {
          title: '用户充值总额(暂无)',
          icon: iconSvg1,
          price: 0,
        },
        {
          title: '总收入',
          icon: iconSvg3,
          price: 0,
        },
        {
          title: '大师提现额',
          icon: iconSvg5,
          price: 0,
        },
        {
          title: '运营商提现额',
          icon: iconSvg2,
          price: 0,
        },
      ]);

      const profitpan = reactive([0, 0, 0, 0]);
      const qtyOrder = reactive([0, 0, 0, 0]);
      const amtOrder = reactive([0, 0, 0, 0]);

      const loadingRef = ref(false);

      const year = ref(moment().format('YYYY'));
      const month = ref(moment().format('MM'));

      function dateChange() {
        getData();
      }

      async function getData() {
        loadingRef.value = true;
        try {
          const { data: dd } = await incomePlatMonthPage({
            rows_per_page: 1,
            where: {
              year: year.value,
              month: month.value,
            },
          });
          if (dd.length) {
            const d = dd[0];
            growCardList[0].price = 0;
            growCardList[1].price =
              d.profit_bbs_prize + d.profit_bbs_vie + d.profit_mall + d.profit_yi_order;
            growCardList[2].price = d.amt_draw_money_master;
            growCardList[3].price = d.amt_draw_money_broker;

            profitpan[0] = d.profit_bbs_prize; // profit_bbs_prize
            profitpan[1] = d.profit_bbs_vie; // profit_bbs_vie
            profitpan[2] = d.profit_mall; // profit_mall
            profitpan[3] = d.profit_yi_order; // profit_yi_order

            qtyOrder[0] = d.qty_yi_order; // qty_yi_order
            qtyOrder[1] = d.qty_yi_order_r; // qty_yi_order_r
            qtyOrder[2] = d.qty_mall; // qty_mall
            qtyOrder[3] = d.qty_mall_r; // qty_mall_r

            amtOrder[0] = d.amt_yi_order; // amt_yi_order
            amtOrder[1] = d.amt_yi_order_r; // amt_yi_order_r
            amtOrder[2] = d.amt_mall; // amt_mall
            amtOrder[3] = d.amt_mall_r; // amt_mall_r
          } else {
            setInit();
          }
        } catch (error) {
          console.log(error);
          setInit();
        } finally {
          loadingRef.value = false;
        }
      }

      function setInit() {
        growCardList[0].price = 0;
        growCardList[1].price = 0;
        growCardList[2].price = 0;
        growCardList[3].price = 0;

        profitpan[0] = 0;
        profitpan[1] = 0;
        profitpan[2] = 0;
        profitpan[3] = 0;

        qtyOrder[0] = 0;
        qtyOrder[1] = 0;
        qtyOrder[2] = 0;
        qtyOrder[3] = 0;

        amtOrder[0] = 0;
        amtOrder[1] = 0;
        amtOrder[2] = 0;
        amtOrder[3] = 0;
      }

      onMounted(() => {
        getData();
      });

      return {
        growCardList,
        profitpan,
        year,
        month,
        dateChange,
        qtyOrder,
        amtOrder,
        loadingRef,
      };
    },
  });
</script>
<style lang="less" scoped>
  @import (reference) '../../../design/index.less';

  .analysis {
    width: 100%;

    .product-total {
      .respond-to(small-and-medium, {padding-right: 0;margin-bottom: 24px;});
    }
  }
</style>
