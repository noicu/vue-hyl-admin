<template>
  <BasicTable @register="registerTable"></BasicTable>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { brokerDrawMoneyHis, masterDrawMoneyHis } from '/@/api/trade';
  import { BrokerHisColumns, MasterHisColumns } from './config';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    components: { BasicTable },
    setup() {
      const { currentRoute } = useRouter();

      const params = computed(() => {
        return unref(currentRoute).params;
      });

      const cdata = computed(() => {
        switch (unref(params).role) {
          case 'break':
            return {
              title: '运营商提现历史',
              api: brokerDrawMoneyHis,
              columns: BrokerHisColumns,
            };
          case 'master':
            return {
              title: '大师提现历史',
              api: masterDrawMoneyHis,
              columns: MasterHisColumns,
            };
        }
      });

      const [registerTable] = useTable({
        title: unref(cdata)?.title,
        api: unref(cdata)?.api,
        fetchSetting: FETCH_SETTING,
        columns: unref(cdata)?.columns,
        showTableSetting: true,
        showFilter: true,
      });

      console.log(unref(params).role);

      return {
        registerTable,
      };
    },
  });
</script>
