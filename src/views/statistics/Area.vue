<template>
  <CollapseContainer :canExpan="false">
    <div ref="chartRef" :style="{ width: '100%' }" />

    <!-- <div style="text-align: center">
      <a-range-picker v-model:value="picker" :format="'YYYY/MM'" />
    </div> -->

    <template #title>
      <Space align="center">
        用户注册量
        <a-radio-group v-model:value="mode" button-style="solid">
          <a-radio-button value="year"> 年份 </a-radio-button>
          <a-radio-button value="month"> 月份 </a-radio-button>
          <a-radio-button value="day"> 天 </a-radio-button>
        </a-radio-group>
      </Space>
    </template>
  </CollapseContainer>
</template>
<script lang="ts">
  import { defineComponent, ref, Ref, onMounted, reactive, computed } from 'vue';
  import moment from 'moment';
  import { useApexCharts } from '/@/hooks/web/useApexCharts';
  import { regUserStats } from '/@/api/user';
  import { CollapseContainer } from '/@/components/Container/index';
  import { Space } from 'ant-design-vue';

  export default defineComponent({
    components: { CollapseContainer, Space },
    setup() {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useApexCharts(chartRef as Ref<HTMLDivElement>);
      const categories = ref<string[]>([]);
      const data = ref<number[]>([]);
      const picker = reactive([
        moment('2015/01/01', 'YYYY/MM/DD'),
        moment('2015/01/01', 'YYYY/MM/DD'),
      ]);

      const mode = ref<'day' | 'month' | 'year'>('day');

      const option = computed(() => {
        return {
          series: [
            {
              name: '注册用户',
              data: data.value,
            },
          ],
          chart: {
            height: 350,
            type: 'area',
            toolbar: {
              show: false,
            },
          },
          stroke: {
            curve: 'smooth',
          },
          xaxis: {
            type: 'date',
            categories: categories.value,
          },
          tooltip: {
            x: {
              format: 'yy/MM/dd',
            },
          },
        };
      });

      async function getData() {
        try {
          const res = await regUserStats({
            start_date: '2020-12-01 00:00:00',
            end_date: '2020-12-06 00:00:00',
            calc_by: 'month',
            broker_id: 1,
          });
          switch (mode.value) {
            case 'year':
              break;
            case 'month':
              break;
            case 'day':
              break;
          }
          // dateUtil('2020-12-01', '2020-12-06')
          categories.value = dateUtil('2020-12-01', '2020-12-28');
          data.value = [];
          res.forEach((it: any, i: number) => {
            console.log(i);
            // categories.value.push(`${it.year}-${it.month}-${it.day}`);
            data.value.push(it.count);
          });
          setOptions(option.value);
          console.log(data);
        } catch (error) {}
      }

      function dateUtil(start: any, end: any) {
        function getDate(datestr: any) {
          var temp = datestr.split('-');
          var date = new Date(temp[0], temp[1] - 1, temp[2]);
          return date;
        }
        var startTime = getDate(start);
        var endTime = getDate(end);

        const arr = [];

        while (endTime.getTime() - startTime.getTime() >= 0) {
          var year = startTime.getFullYear();

          var month =
            (startTime.getMonth() + 1).toString().length == 1
              ? '0' + (startTime.getMonth() + 1).toString()
              : startTime.getMonth() + 1;

          var day =
            startTime.getDate().toString().length == 1
              ? '0' + startTime.getDate()
              : startTime.getDate();
          arr.push(year + '-' + month + '-' + day);
          startTime.setDate(startTime.getDate() + 1);
        }
        return arr;
      }

      onMounted(() => {
        getData();
      });

      return { chartRef, moment, picker, mode };
    },
  });
</script>
