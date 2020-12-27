<template>
  <div class="p-4">
    <div class="mb-4">
      <a-button class="mr-2" @click="opHis">商品订单历史</a-button>
    </div>
    <BasicTable @register="registerTable">
      <template #action="{ record, column }">
        <a-button type="primary" size="small" @click="opm(record)"> 发货 </a-button>
      </template>
    </BasicTable>
    <BasicModal @register="register" title="发货" @ok="ok" width="300px">
      <a-form :model="form" layout="vertical">
        <a-form-item label="备注">
          <a-textarea
            v-model:value="form.bill_no"
            style="width: 100%"
            placeholder="请输入备注"
            allow-clear
          />
        </a-form-item>
      </a-form>
    </BasicModal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, unref } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { bOProductOrderPage, productOrderDelivery } from '/@/api/trade';
  import { ProductColumns } from './config';
  import router from '/@/router';
  import { userStore } from '/@/store/modules/user';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { BasicModal, useModal } from '/@/components/Modal';

  export default defineComponent({
    components: { BasicTable, BasicModal },
    props: {},
    setup() {
      const Columns = [...ProductColumns];
      if (userStore.getRoleListState.includes(RoleEnum.BROKER))
        Columns.splice(Columns.length - 1, 1);

      const [registerTable, { reload }] = useTable({
        title: '商品订单',
        api: bOProductOrderPage,
        fetchSetting: FETCH_SETTING,
        columns: Columns,
        showIndexColumn: false,
        searchInfo: {
          where: {
            broker_id: userStore.getRoleListState.includes(RoleEnum.BROKER)
              ? userStore.getUserInfoState.broker_id
              : null,
          },
        },
      });

      const [register, { openModal }] = useModal();

      const form = reactive({
        id: '',
        bill_no: '',
      });

      function opm(e: any) {
        form.id = e.id;
        form.bill_no = '';
        openModal();
      }

      const loading = reactive([]);
      const isLoads = (e: any) => loading[e.id];

      async function ok() {
        try {
          await productOrderDelivery(unref(form));
          openModal(false);
          await reload();
        } catch (error) {
          console.log(error);
        }
      }

      function opHis() {
        router.push({ name: 'ProductHis' });
      }

      return {
        registerTable,
        opHis,
        isLoads,
        register,
        form,
        opm,
        ok,
      };
    },
  });
</script>
