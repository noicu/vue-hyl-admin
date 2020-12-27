<template>
  <BasicTable @register="registerTable">
    <template #stat="{ record, column }">
      <a-tag v-if="record.stat == 0"> 待处理 </a-tag>
      <a-tag color="green" v-if="record.stat == 1"> 已通过 </a-tag>
      <a-tag color="red" v-if="record.stat != 1 && record.stat != 0"> 已驳回 </a-tag>
    </template>
    <template #action="{ record, column }">
      <div v-if="record.stat == 0">
        <a-button
          class="mr-2"
          type="primary"
          size="small"
          @click="setStat(record, 1)"
          :loading="isLoading(record)"
        >
          通过
        </a-button>
        <a-button
          type="danger"
          size="small"
          @click="setStat(record, 2)"
          :loading="isLoading(record)"
        >
          驳回
        </a-button>
      </div>
      <div v-else> - </div>
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { FETCH_SETTING } from '/@/api/const';
  import { masterInfoApplyPage, masterInfoApplyAudit } from '/@/api/user';
  import { MasterColumns } from './config';

  export default defineComponent({
    components: { BasicTable },
    props: {},
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '大师申请列表',
        api: masterInfoApplyPage,
        fetchSetting: FETCH_SETTING,
        columns: MasterColumns,
        showIndexColumn: false,
        searchInfo: {
          sort: {
            stat: 1,
          },
          // where: {
          //   stat: 0,
          // }
        },
      });

      const loading: any = reactive({});

      const isLoading = (e: any) => loading[e.id];

      async function setStat(data: any, stat: Number) {
        loading[data.id] = true;
        try {
          await masterInfoApplyAudit({
            id: data.id,
            stat,
          });
          await reload();
        } catch (error) {
          console.log(error);
        } finally {
          loading[data.id] = false;
        }
      }

      return {
        registerTable,
        setStat,
        isLoading,
      };
    },
  });
</script>
