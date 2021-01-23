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
        <!-- <a-button size="small" @click="opm(record)"> 详情 </a-button> -->
      </template>
      <template #stat="{ record, column }">
        <a-tag v-if="record.stat == 0"> 待付款 </a-tag>
        <a-tag color="green" v-if="record.stat == 1"> 已付款 </a-tag>
        <a-tag color="cyan" v-if="record.stat == 2"> 待收货 </a-tag>
      </template>
      <template #items="{ record, column }">
        <div v-for="it in record.items">
          名称：{{ it.name }} 规格：{{ it.color_code }} 价格：¥{{ it.price }} 数量：{{ it.qty }}
        </div>
      </template>
    </BasicTable>
    <BasicModal @register="register" title="发货" @ok="ok" width="700px">
      <a-descriptions bordered size="small">
        <a-descriptions-item label="收货人"> {{ order.contact }} </a-descriptions-item>
        <a-descriptions-item label="联系方式" :span="2"> {{ order.mobile }} </a-descriptions-item>
        <a-descriptions-item label="总额"> ¥{{ order.amt }} </a-descriptions-item>
        <a-descriptions-item label="下单时间" :span="2">
          {{ order.CreateDate }}
        </a-descriptions-item>
        <a-descriptions-item label="收货地址" :span="3">
          {{ order.Addr.province }} {{ order.Addr.city }} {{ order.Addr.area }}
          {{ order.Addr.detail }}; {{ order.Addr.zipcode }}
        </a-descriptions-item>
        <a-descriptions-item label="商品信息">
          <div v-for="it in order.items">
            名称：{{ it.name }} 规格：{{ it.color_code }} 价格：¥{{ it.price }} 数量：{{ it.qty }}
          </div>
        </a-descriptions-item>
      </a-descriptions>
      <a-form class="mt-2" :model="form" layout="vertical">
        <a-form-item label="发货单号">
          <a-textarea
            v-model:value="form.bill_no"
            style="width: 100%"
            placeholder="请输入发货单号"
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

      const order = ref<any>({});

      const form = reactive({
        id: '',
        bill_no: '',
      });

      function opm(e: any) {
        order.value = e;
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
        order,
      };
    },
  });
</script>
