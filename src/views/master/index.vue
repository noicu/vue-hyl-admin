<template>
  <BasicTable @register="registerTable">
    <template #enabled="{ record, column }">
      <a-switch
        checked-children="开"
        un-checked-children="关"
        :loading="isLoading(record)"
        :checked="nToB(record.enabled)"
        @change="enabledChange(record)"
      />
    </template>
    <template #action="{ record, column }">
      <a-button type="default" size="small" @click="handleFull(record)"> 详情 </a-button>
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { BasicTable, useTable, EditRecordRow } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { masterInfoList, masterCh, MasterInfo } from '/@/api/yi/master';
  import { Columns } from './config';
  import { nToB, reN } from '/@/utils/conversion';
  import router from '/@/router';

  export default defineComponent({
    components: { BasicTable },
    setup() {
      const [registerTable] = useTable({
        title: '大师列表',
        api: masterInfoList,
        fetchSetting: FETCH_SETTING,
        columns: Columns,
        showTableSetting: true,
        filtersConfig: { schemas: [] },
      });

      const enableLoads: any = reactive({});

      const isLoading = (e: MasterInfo) => enableLoads[e.uid];

      function handleFull(record: EditRecordRow) {
        console.log(record);
        router.push({ name: 'MasterFull', params: { id: record.uid } });
      }

      // 开关切换时执行
      // 禁用/启用大师
      async function enabledChange(e: MasterInfo) {
        try {
          e.enabled = reN(e.enabled);
          enableLoads[e.uid] = true;
          await masterCh({
            master_id: e.uid,
            enabled: e.enabled,
          });
          enableLoads[e.uid] = false;
        } catch (error) {
          console.log(error);
          e.enabled = reN(e.enabled);
          enableLoads[e.uid] = false;
        }
      }

      return {
        registerTable,
        isLoading,
        enabledChange,
        handleFull,
        nToB,
      };
    },
  });
</script>
