<template>
  <BasicTable @register="registerTable">
    <template #enabled="{ index, record, column, text }">
      <Checkbox
        v-model:checked="record[column.dataIndex]"
        @change="enabledChange(record, column.dataIndex)"
      />
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Checkbox } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { brokerInfoList, brokerSetEnable, brokerModuleCh } from '/@/api/yi/broker';
  import type { BrokerInfo } from '/@/api/yi/broker';
  import { Columns } from './config';
  import { nToB, bToN } from '/@/utils/conversion';

  export default defineComponent({
    components: { BasicTable, Checkbox },
    setup() {
      const brokerModules = ref<any[]>([]);
      const sw = ref({
        checkedChildren: '开',
        unCheckedChildren: '关',
        loading: 'isLoading(record)',
        checked: 'nToB(record.enabled)',
        onChange: 'enabledChange(record)',
      });

      const [registerTable] = useTable({
        title: '运营商列表',
        api: brokerInfoList,
        fetchSetting: FETCH_SETTING,
        columns: Columns,
        showTableSetting: true,
        showIndexColumn: false,
        showFilter: true,
        bordered: true,
        afterFetch,
      });

      function afterFetch(e: BrokerInfo[]) {
        return e.map((it) => ({
          ...it,
          enable_mall: nToB(it.enable_mall),
          enable_master: nToB(it.enable_master),
          enable_prize: nToB(it.enable_prize),
          enable_vie: nToB(it.enable_vie),
          enabled: nToB(it.enabled),
        }));
        // console.log(brokerModules.value);
      }

      // 开关切换时执行
      // 禁用/启用
      async function enabledChange(data: any, key: string) {
        console.log(data);
        try {
          if (key == 'enabled') {
            await brokerSetEnable(bToN(data[key]), data.id);
          } else {
            await brokerModuleCh(
              {
                enable_mall: bToN(data.enable_mall),
                enable_master: bToN(data.enable_master),
                enable_prize: bToN(data.enable_prize),
                enable_vie: bToN(data.enable_vie),
              },
              data.id
            );
          }
        } catch (error) {
          console.log(error);
          data[key] = !data[key];
        }
      }

      return {
        registerTable,
        sw,
        nToB,
        enabledChange,
        brokerModules,
      };
    },
  });
</script>
