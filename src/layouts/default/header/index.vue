<template>
  <Header :class="getHeaderClass">
    <!-- left start -->
    <div :class="`${prefixCls}-left`">
      <!-- logo -->
      <AppLogo
        v-if="getShowHeaderLogo || getIsMobile"
        :class="`${prefixCls}-logo`"
        :theme="getHeaderTheme"
      />
      <LayoutTrigger
        v-if="(getShowContent && getShowHeaderTrigger && !getSplit) || getIsMobile"
        :theme="getHeaderTheme"
        :sider="false"
      />
      <LayoutBreadcrumb v-if="getShowContent && getShowBread" :theme="getHeaderTheme" />
    </div>
    <!-- left end -->

    <!-- menu start -->
    <div :class="`${prefixCls}-menu`" v-if="getShowTopMenu && !getIsMobile">
      <LayoutMenu
        :isHorizontal="true"
        :theme="getHeaderTheme"
        :splitType="getSplitType"
        :menuMode="getMenuMode"
      />
    </div>
    <!-- menu-end -->

    <!-- action  -->
    <div :class="`${prefixCls}-action`">
      <AppSearch :class="`${prefixCls}-action__item `" />

      <ErrorAction v-if="getUseErrorHandle" :class="`${prefixCls}-action__item error-action`" />

      <LockItem v-if="getUseLockPage" :class="`${prefixCls}-action__item lock-item`" />

      <Notify v-if="getShowNotice" :class="`${prefixCls}-action__item notify-item`" />

      <FullScreen v-if="getShowFullScreen" :class="`${prefixCls}-action__item fullscreen-item`" />

      <UserRemainder v-if="isBroker" :class="`${prefixCls}-action__item`" />

      <UserDropDown :theme="getHeaderTheme" />

      <!-- <AppLocalePicker
        v-if="getShowLocale"
        :reload="true"
        :showText="false"
        :class="`${prefixCls}-action__item`"
      /> -->
    </div>
  </Header>
</template>
<script lang="ts">
  import { defineComponent, unref, computed } from 'vue';
  import { propTypes } from '/@/utils/propTypes';
  import { Layout } from 'ant-design-vue';
  import { AppLogo } from '/@/components/Application';
  import LayoutMenu from '../menu';
  import LayoutTrigger from '../trigger/index.vue';
  import { AppSearch } from '/@/components/Application';
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useLocaleSetting } from '/@/hooks/setting/useLocaleSetting';
  import { MenuModeEnum, MenuSplitTyeEnum } from '/@/enums/menuEnum';
  import { AppLocalePicker } from '/@/components/Application';
  import {
    UserDropDown,
    LayoutBreadcrumb,
    FullScreen,
    Notify,
    LockItem,
    ErrorAction,
    UserRemainder,
  } from './components';
  import { useAppInject } from '/@/hooks/web/useAppInject';
  import { useDesign } from '/@/hooks/web/useDesign';

  import { userStore } from '/@/store/modules/user';
  import { RoleEnum } from '/@/enums/roleEnum';

  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      Header: Layout.Header,
      AppLogo,
      LayoutTrigger,
      LayoutBreadcrumb,
      UserRemainder,
      LayoutMenu,
      UserDropDown,
      AppLocalePicker,
      FullScreen,
      Notify,
      LockItem,
      AppSearch,
      ErrorAction,
    },
    props: {
      fixed: propTypes.bool,
    },
    setup(props) {
      const { prefixCls } = useDesign('layout-header');
      const { getShowTopMenu, getShowHeaderTrigger, getSplit } = useMenuSetting();
      const { getShowLocale } = useLocaleSetting();
      const { getUseErrorHandle } = useRootSetting();
      const {
        getHeaderTheme,
        getUseLockPage,
        getShowFullScreen,
        getShowNotice,
        getShowContent,
        getShowBread,
        getShowHeaderLogo,
      } = useHeaderSetting();
      const { getIsMobile } = useAppInject();
      const getHeaderClass = computed(() => {
        const theme = unref(getHeaderTheme);
        return [
          prefixCls,
          {
            [`${prefixCls}--fixed`]: props.fixed,
            [`${prefixCls}--mobile`]: unref(getIsMobile),
            [`${prefixCls}--${theme}`]: theme,
          },
        ];
      });
      const getSplitType = computed(() => {
        return unref(getSplit) ? MenuSplitTyeEnum.TOP : MenuSplitTyeEnum.NONE;
      });
      const getMenuMode = computed(() => {
        return unref(getSplit) ? MenuModeEnum.HORIZONTAL : null;
      });
      const isBroker = computed(() => userStore.getRoleListState.includes(RoleEnum.BROKER));
      return {
        prefixCls,
        getHeaderClass,
        getShowHeaderLogo,
        getHeaderTheme,
        getShowHeaderTrigger,
        getIsMobile,
        getShowBread,
        getShowContent,
        getSplitType,
        getSplit,
        getMenuMode,
        getShowTopMenu,
        getShowLocale,
        getShowFullScreen,
        getShowNotice,
        getUseLockPage,
        getUseErrorHandle,
        isBroker,
      };
    },
  });
</script>
<style lang="less">
  @import './index.less';
</style>
