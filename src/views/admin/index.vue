<template>
  <div class="p-4">
    <div class="mb-4">
      <a-button class="mr-2" type="primary" @click="opm">新增管理员</a-button>
    </div>
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
        <a-button class="ml-2" type="primary" size="small"> 详情 </a-button>
      </template>
    </BasicTable>
    <BasicModal @register="register" title="添加管理员" width="800px">
      <a-table :columns="columns" :customRow="customRow" :data-source="data" size="small" />
    </BasicModal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { Popconfirm } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { sysAdminPage, sysAdminCh, sysAdminRm } from '/@/api/user';
  import type { AdminInfo } from '/@/api/model/admin';
  import { FETCH_SETTING } from '/@/api/const';
  import { nToB, reN } from '/@/utils/conversion';
  import { AdminColumns } from './config';
  import Icon from '/@/components/Icon';
  import { BasicModal, useModal } from '/@/components/Modal';

  export default defineComponent({
    components: { BasicTable, Icon, Popconfirm, BasicModal },
    setup() {
      const [registerTable, methods] = useTable({
        title: '系统管理员列表',
        api: sysAdminPage,
        fetchSetting: FETCH_SETTING,
        columns: AdminColumns,
        showIndexColumn: false,
        showTableSetting: true,
        filtersConfig: { schemas: [] },
      });

      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
      ];
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        },
      ];

      const [register, { openModal }] = useModal();

      const enableLoads: any = reactive({});
      const delLoads: any = reactive({});

      const isLoading = (e: AdminInfo) => enableLoads[e.uid];
      const isDelLoads = (e: AdminInfo) => delLoads[e.uid];

      const customRow = (record: any) => ({
        onClick: (event: any) => {
          console.log(event, record);
        },
      });

      function opm() {
        openModal();
      }

      // 开关切换时执行
      // 禁用/启用管理员
      async function enabledChange(e: AdminInfo) {
        try {
          e.enabled = reN(e.enabled);
          enableLoads[e.uid] = true;
          await sysAdminCh({
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
          await sysAdminRm({ uid: e.uid });
          await methods.reload();
        } catch (error) {
          console.log(error);
        } finally {
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
        register,
        opm,
        columns,
        data,
        customRow,
      };
    },
  });
</script>
