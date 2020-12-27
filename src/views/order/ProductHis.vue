<template>
  <BasicTable @register="registerTable"> </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { productOrderHisPage } from '/@/api/trade';
  import { ProductColumns } from './config';
  import { userStore } from '/@/store/modules/user';
  import { RoleEnum } from '/@/enums/roleEnum';

  export default defineComponent({
    components: { BasicTable },
    props: {},
    setup() {
      const [registerTable] = useTable({
        title: '商品订单历史',
        api: productOrderHisPage,
        fetchSetting: FETCH_SETTING,
        columns: ProductColumns,
        showIndexColumn: false,
        searchInfo: {
          where: {
            broker_id: userStore.getRoleListState.includes(RoleEnum.BROKER)
              ? userStore.getUserInfoState.broker_id
              : null,
          },
        },
      });

      return {
        registerTable,
      };
    },
  });
</script>
