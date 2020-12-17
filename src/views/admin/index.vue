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
      <Popconfirm :title="`确定要删除 ${record.user_code} 吗?`" @confirm="onDelete(record)">
        <template #icon><Icon icon="mdi:alert" style="color: red" /></template>
        <a-button type="danger" size="small" :loading="isDelLoads(record)"> 删除 </a-button>
      </Popconfirm>
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { Popconfirm } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { adminInfoList, adminCh, adminDel } from '/@/api/yi/adminManager';
  import { AdminInfo } from '/@/api/yi/adminManager';
  import { FETCH_SETTING } from '/@/api/const';
  import { nToB, reN } from '/@/utils/conversion';
  import { Columns } from './config';
  import Icon from '/@/components/Icon';

  export default defineComponent({
    components: { BasicTable, Icon, Popconfirm },
    setup() {
      const [registerTable, methods] = useTable({
        title: '系统管理员列表',
        api: adminInfoList,
        fetchSetting: FETCH_SETTING,
        columns: Columns,
        showIndexColumn: false,
        showTableSetting: true,
        showFilter: true,
      });

      const enableLoads: any = reactive({});
      const delLoads: any = reactive({});

      const isLoading = (e: AdminInfo) => enableLoads[e.uid];
      const isDelLoads = (e: AdminInfo) => delLoads[e.uid];

      // 开关切换时执行
      // 禁用/启用管理员
      async function enabledChange(e: AdminInfo) {
        try {
          e.enabled = reN(e.enabled);
          enableLoads[e.uid] = true;
          await adminCh({
            uid: e.uid,
            enabled: e.enabled,
          });
          enableLoads[e.uid] = false;
        } catch (error) {
          console.log(error);
          e.enabled = reN(e.enabled);
          enableLoads[e.uid] = false;
        }
      }

      // 删除管理员
      async function onDelete(e: AdminInfo) {
        try {
          delLoads[e.uid] = true;
          await adminDel({ uid: e.uid });
          delLoads[e.uid] = false;
          await methods.reload();
        } catch (error) {
          console.log(error);
          delLoads[e.uid] = false;
        }
      }

      return {
        registerTable,
        enabledChange,
        isLoading,
        isDelLoads,
        onDelete,
        nToB,
      };
    },
  });
</script>
