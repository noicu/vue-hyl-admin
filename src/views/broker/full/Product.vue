<template>
  <BasicTable @register="registerTable">
    <template #enabled="{ record, column }">
      <a-tag color="green" v-if="record.enabled"> 正常 </a-tag>
      <a-tag color="red" v-else> 已冻结 </a-tag>
    </template>
  </BasicTable>
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
      brokerId: [Number, String],
    },
    setup({ brokerId }) {
      const [registerTable] = useTable({
        title: '运营商商品列表',
        api: bProductPage,
        fetchSetting: FETCH_SETTING,
        columns: ProductColumns,
        showIndexColumn: false,
        searchInfo: {
          cate_id: 48,
          broker_id: Number(brokerId),
        },
      });

      return {
        registerTable,
      };
    },
  });
</script>
