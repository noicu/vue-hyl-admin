<template>
  <Menu
    :selectedKeys="selectedKeys"
    :defaultSelectedKeys="defaultSelectedKeys"
    :mode="mode"
    :openKeys="getOpenKeys"
    :inlineIndent="inlineIndent"
    :theme="theme"
    @openChange="handleOpenChange"
    :class="getMenuClass"
    @click="handleMenuClick"
    :subMenuOpenDelay="0.2"
    v-bind="getInlineCollapseOptions"
  >
    <template v-for="item in items" :key="item.path">
      <BasicSubMenuItem
        :item="item"
        :theme="theme"
        :level="1"
        :showTitle="showTitle"
        :isHorizontal="isHorizontal"
      />
    </template>
  </Menu>
</template>
<script lang="ts">
  import type { MenuState } from './types';
  import { computed, defineComponent, unref, reactive, watch, toRefs, ref } from 'vue';
  import { Menu } from 'ant-design-vue';
  import BasicSubMenuItem from './components/BasicSubMenuItem.vue';
  import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';
  import { useOpenKeys } from './useOpenKeys';
  import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router';
  import { isFunction } from '/@/utils/is';
  import { basicProps } from './props';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { REDIRECT_NAME } from '/@/router/constant';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { getCurrentParentPath } from '/@/router/menus';
  // import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  import { listenerLastChangeTab } from '/@/logics/mitt/tabChange';

  export default defineComponent({
    name: 'BasicMenu',
    components: {
      Menu,
      BasicSubMenuItem,
      // BasicSubMenuItem: createAsyncComponent(() => import('./components/BasicSubMenuItem.vue')),
    },
    props: basicProps,
    emits: ['menuClick'],
    setup(props, { emit }) {
      const isClickGo = ref(false);
      const menuState = reactive<MenuState>({
        defaultSelectedKeys: [],
        openKeys: [],
        selectedKeys: [],
        collapsedOpenKeys: [],
      });
      const { prefixCls } = useDesign('basic-menu');
      const { items, mode, accordion } = toRefs(props);
      const { getCollapsed, getIsHorizontal, getTopMenuAlign, getSplit } = useMenuSetting();
      const { currentRoute } = useRouter();
      const { handleOpenChange, setOpenKeys, getOpenKeys } = useOpenKeys(
        menuState,
        items,
        mode,
        accordion
      );
      const getIsTopMenu = computed(() => {
        const { type, mode } = props;
        return (
          (type === MenuTypeEnum.TOP_MENU && mode === MenuModeEnum.HORIZONTAL) ||
          (props.isHorizontal && unref(getSplit))
        );
      });
      const getMenuClass = computed(() => {
        return [
          prefixCls,
          `justify-${unref(getTopMenuAlign)}`,
          {
            [`${prefixCls}--hide-title`]: !unref(showTitle),
            [`${prefixCls}--collapsed-show-title`]: props.collapsedShowTitle,
            [`${prefixCls}__second`]: !props.isHorizontal && unref(getSplit),
            [`${prefixCls}__sidebar-hor`]: unref(getIsTopMenu),
          },
        ];
      });
      const showTitle = computed(() => props.collapsedShowTitle && unref(getCollapsed));
      const getInlineCollapseOptions = computed(() => {
        const isInline = props.mode === MenuModeEnum.INLINE;
        const inlineCollapseOptions: { inlineCollapsed?: boolean } = {};
        if (isInline) {
          inlineCollapseOptions.inlineCollapsed = unref(getCollapsed);
        }
        return inlineCollapseOptions;
      });

      listenerLastChangeTab((route) => {
        if (route.name === REDIRECT_NAME) return;
        handleMenuChange(route);
      }, false);
      watch(
        () => props.items,
        () => {
          handleMenuChange();
        },
        {
          immediate: true,
        }
      );
      async function handleMenuClick({ key, keyPath }: { key: string; keyPath: string[] }) {
        const { beforeClickFn } = props;
        if (beforeClickFn && isFunction(beforeClickFn)) {
          const flag = await beforeClickFn(key);
          if (!flag) return;
        }
        emit('menuClick', key);
        isClickGo.value = true;
        menuState.openKeys = keyPath;
        menuState.selectedKeys = [key];
      }
      async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
        if (unref(isClickGo)) {
          isClickGo.value = false;
          return;
        }
        const path = (route || unref(currentRoute)).path;
        if (props.mode !== MenuModeEnum.HORIZONTAL) {
          setOpenKeys(path);
        }
        if (props.isHorizontal && unref(getSplit)) {
          const parentPath = await getCurrentParentPath(path);
          menuState.selectedKeys = [parentPath];
        } else {
          menuState.selectedKeys = [path];
        }
      }
      return {
        prefixCls,
        getIsHorizontal,
        handleMenuClick,
        getInlineCollapseOptions,
        getMenuClass,
        handleOpenChange,
        getOpenKeys,
        showTitle,
        ...toRefs(menuState),
      };
    },
  });
</script>
<style lang="less">
  @import './index.less';
</style>
