<template>
  <div class="p-4">
    <div class="mb-4">
      <a-button class="mr-2" @click="opHis">返回商品订单</a-button>
      <a-radio-group button-style="solid" v-model:value="stat">
        <a-radio-button :value="3"> 已收货 </a-radio-button>
        <a-radio-button :value="4"> 已作废 </a-radio-button>
      </a-radio-group>
    </div>
    <BasicTable @register="registerTable">
      <template #stat="{ record, column }">
        <a-tag color="purple" v-if="record.stat == 3"> 已收货 </a-tag>
        <a-tag color="red" v-if="record.stat == 4"> 已作废 </a-tag>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, ref, watch, unref } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { productOrderHisPage } from '/@/api/trade';
  import { ProductHisColumns } from './config';
  import { userStore } from '/@/store/modules/user';
  import { RoleEnum } from '/@/enums/roleEnum';
  import router from '/@/router';

  export default defineComponent({
    components: { BasicTable },
    props: {},
    setup() {
      const stat = ref(3);

      const where = computed(() => ({
        where: {
          stat: stat.value,
          broker_id: userStore.getRoleListState.includes(RoleEnum.BROKER)
            ? userStore.getUserInfoState.broker_id
            : undefined,
        },
      }));

      const [registerTable, { reload }] = useTable({
        title: '商品订单历史',
        api: productOrderHisPage,
        fetchSetting: FETCH_SETTING,
        columns: ProductHisColumns,
        showIndexColumn: false,
        searchInfo: () => unref(where),
      });

      watch(stat, () => reload({ page: 1 }));

      function opHis() {
        router.push({ name: 'OrderProduct' });
      }

      return {
        registerTable,
        stat,
        opHis,
      };
    },
  });
</script>
