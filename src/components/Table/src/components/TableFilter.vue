<template>
  <Filters v-bind="getProps"></Filters>
</template>

<script lang="ts">
  import { Filters, FiltersConfig } from '/@/components/Filters';
  import { defineComponent, computed, watch, ref, unref, reactive } from 'vue';
  import { injectTable } from '../hooks/useProvinceTable';

  export default defineComponent({
    components: { Filters },

    setup() {
      const table = injectTable();
      console.log(table.getDataSource);
      let filtersConfig: FiltersConfig[] = [];
      let dataSource = reactive([]);

      watch(table.getDataSource, (v: Proxy) => {
        unique()
        dataSource.push(...v)
        // v.forEach((it) => dataSource.push(it));

        // dataSource = unref(v.length);
        console.log(dataSource);
      });

      table.getColumns({ ignoreIndex: true, ignoreAction: true }).forEach((item) => {
        console.log(item);
        filtersConfig.push({
          key: item.dataIndex,
          key_text: item.title,
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
