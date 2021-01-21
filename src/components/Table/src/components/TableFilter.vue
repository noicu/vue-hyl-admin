<template>
  <Filters v-bind="getProps"></Filters>
</template>

<script lang="ts">
  import { Filters } from '/@/components/Filters';
  import type { FiltersConfig, RegisterFn } from '/@/components/Filters';
  import { defineComponent, computed, watch, reactive } from 'vue';
  import type { PropType } from 'vue';
  import { injectTable } from '../hooks/useProvinceTable';

  export default defineComponent({
    components: { Filters },
    props: {
      filtersConfig: {
        type: Object as PropType<FiltersConfig>,
        default: () => {},
      },
      register: {
        type: Object as PropType<RegisterFn>,
        default: () => {},
      },
    },
    setup({ filtersConfig, register }) {
      const table = injectTable();
      console.log(table.getDataSource);
      let dataSource = reactive<any[]>([]);

      // const [onRegister, { getFilterValue }] = useFilters();

      watch(table.getDataSource, (v) => {
        dataSource.push(...v);
      });

      const onChange = () => {
        table.reload();
      };

      // table.getColumns({ ignoreIndex: true, ignoreAction: true }).forEach((item) => {
      //   console.log(item);
      //   filtersConfig.push({
      //     field: item.dataIndex as string,
      //     label: item.title as string,
      //   });
      // });
      const getProps = computed(() => ({
        filtersConfig,
        dataSource,
        onChange,
        onRegister: register,
      }));
      return {
        getProps,
      };
    },
  });
</script>

<style></style>
