<template>
  <div ref="chartRef" :style="{ width: '100%' }" />
</template>
<script lang="ts">
  import { defineComponent, ref, Ref, onMounted } from 'vue';
  import { useApexCharts } from '/@/hooks/web/useApexCharts';
  export default defineComponent({
    setup() {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useApexCharts(chartRef as Ref<HTMLDivElement>);
      onMounted(() => {
        setOptions({
          series: [
            {
              data: [400, 430, 448, 470],
            },
          ],
          chart: {
            type: 'bar',
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          dataLabels: {
            enabled: true,
          },
          xaxis: {
            categories: ['悬赏帖', '闪断帖', '商城', '大师'],
          },
        });
      });
      return { chartRef };
    },
  });
</script>
