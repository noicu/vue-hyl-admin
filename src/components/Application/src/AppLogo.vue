<!--
 * @Author: hyl
 * @Description: logo component
-->
<template>
  <div
    class="anticon"
    :class="[prefixCls, theme, { 'collapsed-show-title': getCollapsedShowTitle }]"
    @click="handleGoHome"
  >
    <img src="/@/assets/images/logo.png" alt="" />
    <div class="ml-2 ellipsis" :class="[`${prefixCls}__title`]" v-show="showTitle">
      {{ globSetting.title }}
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { useGlobSetting } from '/@/hooks/setting';
  import { useGo } from '/@/hooks/web/usePage';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';

  import { PageEnum } from '/@/enums/pageEnum';

  import { propTypes } from '/@/utils/propTypes';

  import { useDesign } from '/@/hooks/web/useDesign';

  export default defineComponent({
    name: 'AppLogo',
    props: {
      /**
       * The theme of the current parent component
       */
      theme: propTypes.oneOf(['light', 'dark']),
      // Whether to show title
      showTitle: propTypes.bool.def(true),
    },
    setup() {
      const { prefixCls } = useDesign('app-logo');

      const { getCollapsedShowTitle } = useMenuSetting();

      const globSetting = useGlobSetting();

      const go = useGo();

      function handleGoHome(): void {
        go(PageEnum.BASE_HOME);
      }

      return {
        handleGoHome,
        globSetting,
        getCollapsedShowTitle,
        prefixCls,
      };
    },
  });
</script>
<style lang="less" scoped>
  @import (reference) '../../../design/index.less';
  @prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;

    &.collapsed-show-title {
      padding-left: 20px;
    }

    &.light {
      border-bottom: 1px solid @border-color-base;
    }

    &.light &__title {
      color: @primary-color;
    }

    &.dark &__title {
      color: @white;
    }

    &__title {
      font-size: 16px;
      font-weight: 700;
      opacity: 0;
      transition: all 0.5s;

      .respond-to(medium,{
       opacity: 1;
      });
    }
  }
</style>
