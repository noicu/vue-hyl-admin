<template>
  <div ref="chartzuRef" :style="{ width: '100%' }" />
</template>
<script lang="ts">
  import { defineComponent, ref, Ref, onMounted, computed, watch } from 'vue';
  import { useApexCharts } from '/@/hooks/web/useApexCharts';
  import { basicProps } from './props';

  export default defineComponent({
    props: basicProps,
    setup(props) {
      const chartzuRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useApexCharts(chartzuRef as Ref<HTMLDivElement>);

      watch(
        () => props.data,
        () => {
          console.log(props.data);
          setOptions(options.value);
        },
        {
          deep: true,
        }
      );

      const data = computed(() => props.data);

      const options = computed(() => ({
        series: [
          {
            data: data.value,
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
      }));

      onMounted(() => {
        if (
          props.data.reduce(function (prev, curr) {
            return prev + curr;
          }) == 0
        ) {
          setOptions(options.value);
        }
      });
      return { chartzuRef };
    },
  });
</script>
