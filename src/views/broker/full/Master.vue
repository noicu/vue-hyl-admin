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
  import { bMasterPage } from '/@/api/yi/master';
  import { MasterColumns } from './config';

  export default defineComponent({
    components: { BasicTable },
    props: {
      brokerId: [Number, String],
    },
    setup({ brokerId }) {
      const [registerTable] = useTable({
        api: bMasterPage,
        fetchSetting: FETCH_SETTING,
        columns: MasterColumns,
        showIndexColumn: false,
        searchInfo: {
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
