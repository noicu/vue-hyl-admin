<template>
  <BasicTable @register="registerTable"> </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { yiOrderHisPage } from '/@/api/trade';
  import { MasterColumns } from './config';
  import { userStore } from '/@/store/modules/user';
  import { RoleEnum } from '/@/enums/roleEnum';

  export default defineComponent({
    components: { BasicTable },
    props: {},
    setup() {
      const [registerTable] = useTable({
        title: '大师订单历史',
        api: yiOrderHisPage,
        fetchSetting: FETCH_SETTING,
        columns: MasterColumns,
        showIndexColumn: false,
        searchInfo: {
          where: {
            broker_id: userStore.getRoleListState.includes(RoleEnum.BROKER)
              ? userStore.getUserInfoState.broker_id
              : undefined,
          },
        },
      });

      return {
        registerTable,
      };
    },
  });
</script>
