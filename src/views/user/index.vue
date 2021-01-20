<template>
  <BasicTable @register="registerTable">
    <template #enabled="{ record, column }">
      <a-tag color="green" v-if="record.enabled"> 正常 </a-tag>
      <a-tag color="red" v-else> 已冻结 </a-tag>
    </template>
    <template #action="{ record, column }">
      <Popconfirm :title="`确定要将 ${record.user_code} 转为管理员吗?`" @confirm="toAdmin(record)">
        <template #icon><Icon icon="mdi:alert" style="color: red" /></template>
        <a-button size="small" :loading="isLoading(record)"> 转为管理员 </a-button>
      </Popconfirm>
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { brokerUserInfoPage, brokerAdminAdd } from '/@/api/user';
  import { Columns } from './config';
  import { Popconfirm } from 'ant-design-vue';

  export default defineComponent({
    components: { BasicTable, Popconfirm },
    props: {
      brokerId: [Number, String],
    },
    setup({ brokerId }) {
      const [registerTable, { reload }] = useTable({
        title: '用户列表',
        api: brokerUserInfoPage,
        fetchSetting: FETCH_SETTING,
        columns: Columns,
        showIndexColumn: false,
        searchInfo: {
          where: {
            broker_id: Number(brokerId),
          },
        },
      });

      const loading: any = reactive({});

      const isLoading = (e: any) => loading[e.id];

      async function toAdmin(data: any) {
        loading[data.id] = true;
        try {
          await brokerAdminAdd({ uid: data.id });
          await reload();
        } catch (error) {
          console.log(error);
        } finally {
          loading[data.id] = false;
        }
      }

      return {
        registerTable,
        toAdmin,
        isLoading,
      };
    },
  });
</script>
