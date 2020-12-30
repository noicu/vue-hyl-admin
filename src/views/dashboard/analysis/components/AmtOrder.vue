<template>
  <div ref="chartRef" :style="{ height, width }" />
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, Ref, computed, watch } from 'vue';

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

      const data = computed(() => props.data);

      const options = computed(() => ({
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, .6)',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          itemWidth: 15,
          right: 10,
          data: ['订单量', '退单量'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              inside: true, // 刻度朝内
            },
            data: ['大师订单', '商城订单'],
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              inside: true, // 刻度朝内
            },
          },
        ],
        series: [
          {
            name: '订单金额',
            type: 'bar',
            itemStyle: {
              color: '#3ca0f6',
            },
            data: [data.value[0], data.value[2]],
            animationDuration: 4000,
          },
          {
            name: '退单金额',
            type: 'bar',
            itemStyle: {
              color: '#7dd9b9',
            },
            data: [data.value[1], data.value[3]],
            animationDuration: 4000,
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
