<template>
  <BasicTable @register="registerTable">
    <template #enabled="{ index, record, column, text }">
      <Checkbox
        v-model:checked="record[column.dataIndex]"
        @change="enabledChange(record, column.dataIndex)"
        :disabled="isSuper && column.dataIndex != 'enabled'"
      />
    </template>
    <template #action="{ index, record, column, text }">
      <Button type="default" size="small" style="margin: 0 5px" @click="handleFull(record)">
        大师
      </Button>
      <Button type="default" size="small" style="margin: 0 5px" @click="handleFull(record)">
        商品
      </Button>
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { Checkbox, Button } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { brokerInfoList, brokerSetEnable, brokerModuleCh } from '/@/api/yi/broker';
  import type { BrokerInfo } from '/@/api/yi/broker';
  import { Columns } from './config';
  import { nToB, bToN } from '/@/utils/conversion';
  import router from '/@/router';
  import { userStore } from '/@/store/modules/user';
  import { RoleEnum } from '/@/enums/roleEnum';

  export default defineComponent({
    components: { BasicTable, Checkbox, Button },
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
      async function enabledChange(it: any, key: string) {
        console.log(it);
        try {
          if (key == 'enabled') {
            await brokerSetEnable(bToN(it[key]), it.id);
          } else {
            await brokerModuleCh(
              {
                enable_mall: bToN(it.enable_mall),
                enable_master: bToN(it.enable_master),
                enable_prize: bToN(it.enable_prize),
                enable_vie: bToN(it.enable_vie),
              },
              it.id
            );
          }
        } catch (error) {
          console.log(error);
          it[key] = !it[key];
        }
      }

      function handleFull(it: any) {
        console.log(it);
        router.push({ name: 'BrokerFull', params: { id: it.id } });
      }

      return {
        registerTable,
        sw,
        nToB,
        enabledChange,
        brokerModules,
        handleFull,
        isSuper: computed(() => userStore.getRoleListState.includes(RoleEnum.SUPER)),
      };
    },
  });
</script>
