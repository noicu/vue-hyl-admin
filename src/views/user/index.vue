<template>
  <BasicTable @register="registerTable">
    <template #enabled="{ record, column }">
      <a-tag color="green" v-if="record.enabled"> 正常 </a-tag>
      <a-tag color="red" v-else> 已冻结 </a-tag>
    </template>
    <template #sex="{ record, column }">
      <a-tag style="margin: 0" v-if="record.sex == 0" color="pink"> 女 </a-tag>
      <a-tag style="margin: 0" v-if="record.sex == 1" color="blue"> 男 </a-tag>
      <a-tag style="margin: 0" v-if="record.sex == 2" color="purple"> 保密 </a-tag>
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
  import { defineComponent, reactive, ref, unref } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { brokerUserInfoPage, brokerAdminAdd, sysAdminAdd } from '/@/api/user';
  import { Columns } from './config';
  import { Popconfirm } from 'ant-design-vue';

  import { userStore } from '/@/store/modules/user';
  import { RoleEnum } from '/@/enums/roleEnum';

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
        filtersConfig: {
          schemas: [
            {
              field: 'nick',
              label: '昵称',
            },
            {
              field: 'user_code',
              label: '手机号',
            },
            {
              field: 'enabled',
              label: '状态',
              option: [
                {
                  label: '启用',
                  value: 1,
                },
                {
                  label: '禁用',
                  value: 0,
                },
              ],
            },
          ],
        },
      });

      const role = ref({
        broker: userStore.getRoleListState.includes(RoleEnum.BROKER),
        super: userStore.getRoleListState.includes(RoleEnum.SUPER),
      });

      const loading: any = reactive({});

      const isLoading = (e: any) => loading[e.id];

      async function toAdmin(data: any) {
        loading[data.id] = true;
        try {
          if (unref(role).broker) {
            await brokerAdminAdd({ uid: data.id });
          }
          if (unref(role).super) {
            await sysAdminAdd(data.id);
          }
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
