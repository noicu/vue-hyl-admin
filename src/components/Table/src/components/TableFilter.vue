<template>
  <Filters v-bind="getProps"></Filters>
</template>

<script lang="ts">
  import { Filters, FiltersConfig } from '/@/components/Filters';
  import { defineComponent, computed, watch, reactive } from 'vue';
  import { injectTable } from '../hooks/useProvinceTable';

  export default defineComponent({
    components: { Filters },

    setup() {
      const table = injectTable();
      console.log(table.getDataSource);
      let filtersConfig: FiltersConfig[] = [];
      let dataSource = reactive<any[]>([]);

      watch(table.getDataSource, (v) => {
        dataSource.push(...v);
      });

      table.getColumns({ ignoreIndex: true, ignoreAction: true }).forEach((item) => {
        console.log(item);
        filtersConfig.push({
          field: item.dataIndex as string,
          label: item.title as string,
        });
      });
      const getProps = computed(() => ({
        filtersConfig,
        dataSource,
      }));
      return {
        getProps,
      };
    },
  });
</script>

<style></style>
