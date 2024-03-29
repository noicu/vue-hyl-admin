<template>
  <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]">
      <img :class="`${prefixCls}__header`" src="/@/assets/images/header.jpg" />
      <span :class="`${prefixCls}__info`">
        <span :class="`${prefixCls}__name anticon`">{{ getUserInfo.nick }}</span>
      </span>
    </span>

    <template #overlay>
      <Menu @click="handleMenuClick">
        <!-- <MenuItem key="doc" :text="t('layout.header.dropdownItemDoc')" icon="gg:loadbar-doc" /> -->
        <MenuItem key="personal" text="个人资料" icon="gg:loadbar-doc" />
        <MenuDivider v-if="getShowDoc" />
        <MenuItem
          key="loginOut"
          :text="t('layout.header.dropdownItemLoginOut')"
          icon="carbon:power"
        />
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts">
  // components
  import { Dropdown, Menu } from 'ant-design-vue';
  import { defineComponent, computed } from 'vue';
  // res
  import Icon from '/@/components/Icon/index';
  import { userStore } from '/@/store/modules/user';
  import { DOC_URL } from '/@/settings/siteSetting';
  import { openWindow } from '/@/utils';
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  import { propTypes } from '/@/utils/propTypes';
  import router from '/@/router';
  type MenuEvent = 'loginOut' | 'doc' | 'personal';
  export default defineComponent({
    name: 'UserDropdown',
    components: {
      Dropdown,
      Menu,
      MenuItem: createAsyncComponent(() => import('./DropMenuItem.vue')),
      MenuDivider: Menu.Divider,
      Icon,
    },
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
      const { prefixCls } = useDesign('header-user-dropdown');
      const { t } = useI18n();
      const { getShowDoc } = useHeaderSetting();
      const getUserInfo = computed(() => {
        const { nick = '' } = userStore.getUserInfoState || {};
        return { nick };
      });
      //  login out
      function handleLoginOut() {
        userStore.confirmLoginOut();
      }
      // open personal
      function openPersonal() {
        router.push({ name: 'Personal' });
      }

      // open doc
      function openDoc() {
        openWindow(DOC_URL);
      }
      function handleMenuClick(e: { key: MenuEvent }) {
        switch (e.key) {
          case 'loginOut':
            handleLoginOut();
            break;
          case 'doc':
            openDoc();
            break;
          case 'personal':
            openPersonal();
            break;
        }
      }
      return {
        prefixCls,
        t,
        getUserInfo,
        handleMenuClick,
        getShowDoc,
      };
    },
  });
</script>
<style lang="less">
  @import (reference) '../../../../../design/index.less';
  @prefix-cls: ~'@{namespace}-header-user-dropdown';
  .@{prefix-cls} {
    display: flex;
    height: @header-height;
    min-width: 100px;
    padding: 0 0 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    align-items: center;

    &:hover {
      background: @header-light-bg-hover-color;
    }

    img {
      width: 26px;
      height: 26px;
      margin-right: 12px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
    }

    &--dark {
      &:hover {
        background: @header-dark-bg-hover-color;
      }
    }

    &--light {
      .@{prefix-cls}__name {
        color: @text-color-base;
      }
      .@{prefix-cls}__desc {
        color: @header-light-desc-color;
      }
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 160px;
      }
    }
  }
</style>
