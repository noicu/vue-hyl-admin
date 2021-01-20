<template>
  <div class="p-4">
    <div class="mb-4">
      <a-button class="mr-2" type="primary" @click="audits(true)" :loading="eLoads"
        >批量通过</a-button
      >
      <a-button class="mr-2" type="danger" @click="audits(false)" :loading="eLoads"
        >批量拒绝</a-button
      >
      <a-button class="mr-2" @click="exp">导出选中</a-button>
      <a-button class="mr-2" @click="opHis">提现历史</a-button>
    </div>
    <BasicTable @register="registerTable">
      <template #action="{ record, column }">
        <a-button
          class="mr-2"
          type="primary"
          size="small"
          @click="drawMoneyAudit([record.id], true)"
          :loading="eLoads"
        >
          通过
        </a-button>
        <a-button
          class="mr-2"
          type="danger"
          size="small"
          @click="drawMoneyAudit([record.id], false)"
          :loading="eLoads"
        >
          驳回
        </a-button>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { brokerDrawMoneyPage, brokerDrawMoneyAudit } from '/@/api/trade';
  import { FETCH_SETTING } from '/@/api/const';
  import { BrokerColumns, ExBrokerColumns } from './config';
  import { exportExcle } from './exportExcle';
  import { useMessage } from '/@/hooks/web/useMessage';
  import router from '/@/router';

  export default defineComponent({
    components: { BasicTable },
    setup() {
      const { createMessage } = useMessage();
      const [registerTable, { getSelectRows, reload, clearSelectedRowKeys }] = useTable({
        title: '运营商提现列表',
        api: brokerDrawMoneyPage,
        fetchSetting: FETCH_SETTING,
        columns: BrokerColumns,
        showIndexColumn: false,
        showTableSetting: true,
        filtersConfig: { schemas: [] },
        titleHelpMessage: '使用useTable调用表格内方法',
        rowSelection: {
          type: 'checkbox',
        },
      });

      const eLoads = ref(false);

      function audits(ok: boolean) {
        let sr = getSelectRows();
        if (sr.length > 0) {
          drawMoneyAudit(
            sr.map((item) => item.id),
            ok
          );
        } else {
          createMessage.info('请选择需要处理的数据！');
        }
        getSelectRows();
      }

      async function drawMoneyAudit(list: any[], ok: boolean) {
        eLoads.value = true;
        try {
          await brokerDrawMoneyAudit({
            ok,
            lst_id: list,
          });
          clearSelectedRowKeys();
          await reload();
        } catch (error) {
          console.log(error);
        } finally {
          eLoads.value = false;
        }
      }

      function exp() {
        let sr = getSelectRows();
        if (sr.length > 0) {
          exportExcle(ExBrokerColumns, getSelectRows(), '运营商提现');
        } else {
          createMessage.info('请选择需要导出的数据！');
        }
      }

      function opHis() {
        router.push({ name: 'His', params: { role: 'break' } });
      }

      return {
        eLoads,
        drawMoneyAudit,
        registerTable,
        audits,
        exp,
        opHis,
      };
    },
  });
</script>

<style></style>
