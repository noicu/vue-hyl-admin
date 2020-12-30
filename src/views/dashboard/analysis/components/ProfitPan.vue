<template>
  <div ref="chartRef" :style="{ height, width }" />
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, Ref, watch, computed } from 'vue';

  import { useECharts } from '/@/hooks/web/useECharts';

  import { basicProps } from './props';

  export default defineComponent({
    name: 'AnalysisLine',
    props: basicProps,
    setup(props) {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

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

      const m2R2Data = computed(() => [
        { value: props.data[0], name: '悬赏帖', itemStyle: { color: '#1b65b9' } },
        { value: props.data[1], name: '闪断帖', itemStyle: { color: '#3ca0f6' } },
        { value: props.data[2], name: '商城', itemStyle: { color: '#2dc0c0' } },
        { value: props.data[3], name: '大师', itemStyle: { color: '#7dd9b9' } },
      ]);

      const options = computed(() => ({
        title: [
          {
            text: '总利润',
            subtext:
              '¥' +
              props.data
                .reduce(function (prev, curr) {
                  return prev + curr;
                })
                .toString(),
            textStyle: {
              fontSize: 12,
              color: '#4B535E85',
            },
            subtextStyle: {
              fontSize: 24,
              color: 'black',
            },
            textAlign: 'center',
            // @ts-ignore
            x: '34.5%',
            y: '40%',
          },
        ],
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 0, 0, .6)',
        },
        legend: {
          icon: 'circle',
          itemHeight: 10,
          type: 'scroll',
          orient: 'vertical',
          left: '70%',
          align: 'left',
          top: 'middle',
          textStyle: {
            color: '#8C8C8C',
          },
          height: 250,
        },
        series: [
          {
            name: '利润',
            type: 'pie',
            center: ['35%', '50%'],
            radius: ['45%', '65%'],
            label: {
              show: true,
            },
            data: m2R2Data.value,
            animationDuration: 3000,
          },
        ],
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
      return { chartRef };
    },
  });
</script>
