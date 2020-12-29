<template>
  <div class="p-4">
    <div class="mb-4">
      <a-button class="mr-2" @click="opHis">大师订单历史</a-button>
      <!-- <a-radio-group button-style="solid" v-model:value="stat">
        <a-radio-button :value="1"> 已付款 </a-radio-button>
        <a-radio-button :value="2"> 待收货 </a-radio-button>
        <a-radio-button :value="0"> 待付款 </a-radio-button>
      </a-radio-group> -->
    </div>
    <BasicTable @register="registerTable">
      <template #stat="{ record, column }">
        <a-tag v-if="record.stat == 0"> 待付款 </a-tag>
        <a-tag color="green" v-if="record.stat == 1"> 已付款 </a-tag>
        <a-tag color="cyan" v-if="record.stat == 2"> 待收货 </a-tag>
      </template>
      <template #items="{ record, column }">
        <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, unref, ref, watch, computed } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { boYiOrderPage } from '/@/api/trade';
  import { MasterColumns } from './config';
  import router from '/@/router';
  import { userStore } from '/@/store/modules/user';
  import { RoleEnum } from '/@/enums/roleEnum';

  export default defineComponent({
    components: { BasicTable },
    props: {},
    setup() {
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
        title: '大师订单',
        api: boYiOrderPage,
        fetchSetting: FETCH_SETTING,
        columns: MasterColumns,
        showIndexColumn: false,
        searchInfo: () => unref(where),
      });

      const loading = reactive([]);
      const isLoads = (e: any) => loading[e.id];

      function opHis() {
        router.push({ name: 'MasterHis' });
      }

      return {
        registerTable,
        opHis,
        isLoads,
        stat,
      };
    },
  });
</script>
