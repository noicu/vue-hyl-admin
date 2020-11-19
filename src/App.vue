<template>
  <ConfigProvider :locale="zhCN" :transform-cell-text="transformCellText" v-bind="lockOn">
    <router-view />
  </ConfigProvider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ConfigProvider } from 'ant-design-vue';
  import { createBreakpointListen } from '/@/hooks/event/useBreakpoint';

  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import moment from 'moment';
  import 'moment/dist/locale/zh-cn';

  import { useConfigProvider, useInitAppConfigStore } from './useApp';
  import { useLockPage } from '/@/hooks/web/useLockPage';
  import { useSetting } from '/@/hooks/core/useSetting';

  moment.locale('zh-cn');

  export default defineComponent({
    name: 'App',
    components: { ConfigProvider },
    setup() {
      // 初始化应用程序设置
      useInitAppConfigStore();
      // 初始化断点监控
      createBreakpointListen();
      // 获取系统配置
      const { projectSetting } = useSetting();
      // 获取提供者配置
      const { transformCellText } = useConfigProvider();

      console.log(projectSetting,transformCellText)

      let lockOn = {};
      if (projectSetting.lockTime) {
        // 监控鼠标或键盘时间，用于重新计算锁定屏幕时间
        const { on } = useLockPage();
        lockOn = on;
      }

      return {
        transformCellText,
        zhCN,
        lockOn,
      };
    },
  });
</script>
