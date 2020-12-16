<template>
  <BasicTable @register="registerTable">
    <template #enabled="{ record, column }">
      <a-switch
        checked-children="开"
        un-checked-children="关"
        :loading="isLoading(record)"
        :checked="record.enabled === 1 ? true : false"
        @change="enabledChange(record)"
      />
    </template>
    <template #action="{ record, column }">
      <Popconfirm :title="`确定要删除 ${record.user_code} 吗?`" @confirm="onDelete(record)">
        <template #icon><Icon icon="mdi:alert" style="color: red" /></template>
        <a-button type="danger" size="small"> 删除 </a-button>
      </Popconfirm>
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { Popconfirm } from 'ant-design-vue';
  import { BasicColumn, BasicTable, useTable } from '/@/components/Table';
  import Icon from '/@/components/Icon';

  import { adminInfoList, adminCh } from '/@/api/yi/adminManager';
  import { AdminInfo } from '/@/api/yi/adminManager';
  import { FETCH_SETTING } from '/@/api/const';

  const Columns: BasicColumn[] = [
    {
      title: 'UID',
      width: 150,
      dataIndex: 'uid',
    },
    {
      title: '昵称',
      dataIndex: 'nick',
      width: 120,
    },
    {
      title: '用户名',
      dataIndex: 'user_code',
    },
    {
      title: '状态',
      width: 120,
      dataIndex: 'enabled',
      slots: { customRender: 'enabled' },
    },
    {
      title: '操作',
      width: 120,
      slots: { customRender: 'action' },
    },
  ];

  export default defineComponent({
    components: { BasicTable, Icon, Popconfirm },
    setup() {
      const [registerTable] = useTable({
        title: '系统管理员列表',
        api: adminInfoList,
        fetchSetting: FETCH_SETTING,
        columns: Columns,
        showIndexColumn: false,
        showTableSetting: true,
      });

      const loadings: any = reactive({});

      const isLoading = (e: AdminInfo) => loadings[e.uid];

      // 开关切换时执行
      // 请求后端API
      async function enabledChange(e: AdminInfo) {
        try {
          e.enabled = e.enabled == 1 ? 0 : 1;
          loadings[e.uid] = true;
          await adminCh({
            uid: e.uid,
            enabled: e.enabled,
          });
          loadings[e.uid] = false;
        } catch (error) {
          console.log(error);
          e.enabled = e.enabled == 1 ? 0 : 1;
          loadings[e.uid] = false;
        }
      }

      async function onDelete(e: AdminInfo) {
        try {
          console.log(e);
        } catch (error) {}
      }

      return {
        registerTable,
        enabledChange,
        isLoading,
        onDelete,
      };
    },
  });
</script>
