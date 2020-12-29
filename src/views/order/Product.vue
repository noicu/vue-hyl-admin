<template>
  <div class="p-4">
    <div class="mb-4">
      <a-button class="mr-2" @click="opHis">商品订单历史</a-button>
      <a-radio-group button-style="solid" v-model:value="stat">
        <a-radio-button :value="1"> 已付款 </a-radio-button>
        <a-radio-button :value="2"> 待收货 </a-radio-button>
        <a-radio-button :value="0"> 待付款 </a-radio-button>
      </a-radio-group>
    </div>
    <BasicTable @register="registerTable">
      <template #action="{ record, column }">
        <a-button
          class="mr-2"
          v-if="record.stat == 1"
          type="primary"
          size="small"
          @click="opm(record)"
        >
          发货
        </a-button>
        <a-button size="small" @click="opm(record)"> 详情 </a-button>
      </template>
      <template #stat="{ record, column }">
        <a-tag v-if="record.stat == 0"> 待付款 </a-tag>
        <a-tag color="green" v-if="record.stat == 1"> 已付款 </a-tag>
        <a-tag color="cyan" v-if="record.stat == 2"> 待收货 </a-tag>
      </template>
      <template #items="{ record, column }">
        <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
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
  import { defineComponent, reactive, unref, ref, watch, computed } from 'vue';
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

      const stat = ref(1);

      const where = computed(() => ({
        where: {
          stat: stat.value,
          broker_id: userStore.getRoleListState.includes(RoleEnum.BROKER)
            ? userStore.getUserInfoState.broker_id
            : undefined,
        },
      }));

      watch(stat, () => reload({ page: 1 }));

      const [registerTable, { reload }] = useTable({
        title: '商品订单',
        api: bOProductOrderPage,
        fetchSetting: FETCH_SETTING,
        columns: Columns,
        showIndexColumn: false,
        searchInfo: () => unref(where),
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
        stat,
      };
    },
  });
</script>
