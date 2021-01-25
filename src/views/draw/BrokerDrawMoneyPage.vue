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
          @click="drawMoneyAudit(record.id)"
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
          {{ remainder }}
        </a-form-item>
        <a-form-item label="提现金额">
          <InputNumber v-model:value="form.amt" :min="0" />
        </a-form-item>
      </a-form>
    </BasicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, unref, computed } from 'vue';
  import { InputNumber } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { brokerDrawMoneyPage, brokerDrawMoneyCancel, brokerDrawMoneyAdd } from '/@/api/trade';
  import { FETCH_SETTING } from '/@/api/const';
  import { BrokerColumns, ExBrokerColumns } from './config';
  import { exportExcle } from './exportExcle';
  import { useMessage } from '/@/hooks/web/useMessage';
  import router from '/@/router';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { userStore } from '/@/store/modules/user';

  export default defineComponent({
    components: { BasicTable, BasicModal, InputNumber },
    setup() {
      const remainder = computed(() => userStore.getRemainderState);
      const { createMessage } = useMessage();
      const [registerTable, { getSelectRows, reload, clearSelectedRowKeys }] = useTable({
        title: '运营商提现列表',
        api: brokerDrawMoneyPage,
        fetchSetting: FETCH_SETTING,
        columns: BrokerColumns,
        showIndexColumn: false,
        showTableSetting: true,
        rowSelection: {
          type: 'checkbox',
        },
        filtersConfig: {
          schemas: [
            {
              field: 'nick',
              label: '昵称',
            },
            {
              field: 'amt',
              label: '提现金额',
            },
            {
              field: 'tax',
              label: '税金',
            },
          ],
        },
      });

      const [register, { openModal }] = useModal();

      const form = reactive({
        amt: 0,
      });

      function opm() {
        form.amt = 0;
        userStore.getRemainder();
        openModal();
      }

      async function ok() {
        try {
          await brokerDrawMoneyAdd({
            ...unref(form),
            broker_id: userStore.getUserInfoState.broker_id,
          });
          createMessage.success('提现申请已提，请等待审核！');
          openModal(false);
          await reload();
        } catch (error) {
          console.log(error);
        }
      }

      const eLoads = ref(false);

      async function drawMoneyAudit(id: any) {
        eLoads.value = true;
        try {
          await brokerDrawMoneyCancel({ id });
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
        remainder,
      };
    },
  });
</script>

<style></style>
