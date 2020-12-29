<template>
  <div>
    <a-page-header :ghost="false" title="2020年 12月财报">
      <template #extra>
        <a-select default-value="lucy">
          <a-select-option value="jack"> 2020年 </a-select-option>
          <a-select-option value="lucy"> 2021年 </a-select-option>
        </a-select>
        <a-select default-value="lucy">
          <template v-for="it in 12">
            <a-select-option :value="it"> {{ it }}月 </a-select-option>
          </template>
        </a-select>
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
                <ProfitPan />
              </a-col>
              <a-col :span="12" class="my-3">
                <ProfitZu />
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
                <QtyOrder />
              </a-col>
              <a-col :span="12" class="my-3">
                <AmtOrder />
              </a-col>
            </a-row>
          </CollapseContainer>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import GrowCard from './components/GrowCard.vue';

  import ProfitPan from './components/ProfitPan.vue';
  import AmtOrder from './components/AmtOrder.vue';
  import QtyOrder from './components/QtyOrder.vue';
  import ProfitZu from './components/ProfitZu.vue';

  import { CollapseContainer } from '/@/components/Container/index';

  import iconSvg1 from '/@/assets/svg/dashboard/analysis-icon1.svg';
  import iconSvg2 from '/@/assets/svg/dashboard/analysis-icon2.svg';
  import iconSvg3 from '/@/assets/svg/dashboard/analysis-icon3.svg';
  import iconSvg4 from '/@/assets/svg/dashboard/analysis-icon4.svg';

  export default defineComponent({
    components: {
      GrowCard,
      CollapseContainer,
      ProfitPan,
      AmtOrder,
      QtyOrder,
      ProfitZu,
    },
    setup() {
      const growCardList: any[] = [
        {
          title: '用户充值总额',
          icon: iconSvg1,
          price: 80000,
        },
        {
          title: '总营业额',
          icon: iconSvg3,
          price: 3000000,
        },
        {
          title: '大师提现额',
          icon: iconSvg2,
          price: 4000,
        },
        {
          title: '运营商提现额',
          icon: iconSvg4,
          price: 10000,
        },
      ];

      return { growCardList };
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
