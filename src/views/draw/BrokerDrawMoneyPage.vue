<template>
  <div class="p-4">
    <div class="mb-4">
      <a-button class="mr-2" @click="exp">导出选中</a-button>
      <a-button class="mr-2" @click="opHis">提现历史</a-button>
      <a-button class="mr-2" type="primary" @click="opm">申请提现</a-button>
    </div>
    <BasicTable @register="registerTable">
      <template #action="{ record, column }">
        <a-button
          class="mr-2"
          type="danger"
          size="small"
          @click="drawMoneyAudit([record.id], false)"
          :loading="eLoads"
        >
          取消
        </a-button>
      </template>
    </BasicTable>
    <BasicModal @register="register" title="申请提现" @ok="ok" width="300px">
      <a-form
        :model="form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12 }"
        layout="horizontal"
      >
        <a-form-item label="余额">
          {{ 0 }}
        </a-form-item>
        <a-form-item label="提现金额">
          <InputNumber v-model:value="form.amt" :min="0" />
        </a-form-item>
      </a-form>
    </BasicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, unref } from 'vue';
  import { InputNumber } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { brokerDrawMoneyPage, brokerDrawMoneyAudit, brokerDrawMoneyAdd } from '/@/api/trade';
  import { FETCH_SETTING } from '/@/api/const';
  import { BrokerColumns, ExBrokerColumns } from './config';
  import { exportExcle } from './exportExcle';
  import { useMessage } from '/@/hooks/web/useMessage';
  import router from '/@/router';
  import { BasicModal, useModal } from '/@/components/Modal';

  export default defineComponent({
    components: { BasicTable, BasicModal, InputNumber },
    setup() {
      const { createMessage } = useMessage();
      const [registerTable, { getSelectRows, reload, clearSelectedRowKeys }] = useTable({
        title: '运营商提现列表',
        api: brokerDrawMoneyPage,
        fetchSetting: FETCH_SETTING,
        columns: BrokerColumns,
        showIndexColumn: false,
        showTableSetting: true,
        showFilter: true,
        titleHelpMessage: '使用useTable调用表格内方法',
        rowSelection: {
          type: 'checkbox',
        },
      });

      const [register, { openModal }] = useModal();

      const form = reactive({
        amt: 0,
      });

      function opm() {
        form.amt = 0;
        openModal();
      }

      async function ok() {
        try {
          await brokerDrawMoneyAdd(unref(form));
          createMessage.success('登录密码修改成功！');
          openModal(false);
        } catch (error) {
          console.log(error);
        }
      }

      const eLoads = ref(false);

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
        exp,
        opHis,
        form,
        opm,
        ok,
        register,
      };
    },
  });
</script>

<style></style>