<template>
  <BasicTable @register="registerTable"> </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { bProductPage } from '/@/api/yi/product';
  import { ProductColumns } from './config';

  export default defineComponent({
    components: { BasicTable },
    props: {
      brokerId: Number,
    },
    setup({ brokerId }) {
      const [registerTable] = useTable({
        title: '商品订单',
        api: bProductPage,
        fetchSetting: FETCH_SETTING,
        columns: ProductColumns,
        showIndexColumn: false,
        searchInfo: {
          cate_id: 48,
          where: {
            broker_id: brokerId,
          },
        },
      });

      return {
        registerTable,
      };
    },
  });
</script>
