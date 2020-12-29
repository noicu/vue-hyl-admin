<template>
  <div :class="prefixCls">
    <Popover title="" trigger="click" :overlayClassName="`${prefixCls}__overlay`">
      <Badge :count="count" :numberStyle="numberStyle" :offset="[-10, 10]">
        <BellOutlined />
      </Badge>
      <template #content>
        <Tabs>
          <TabPane key="1">
            <template #tab>
              运营商申请
              <span v-if="brokerApply.rows_count">({{ brokerApply.rows_count }})</span>
            </template>
            <NoticeList v-model:list="brokerApply.data" />
            <div style="text-align: center">
              <Pagination simple :default-current="2" :total="50" />
            </div>
          </TabPane>
          <TabPane key="2">
            <template #tab>
              大师申请
              <span v-if="brokerApply.rows_count">({{ brokerApply.rows_count }})</span>
            </template>
            <NoticeList v-model:list="masterApply.data" />
          </TabPane>
        </Tabs>
      </template>
    </Popover>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Popover, Tabs, Badge } from 'ant-design-vue';
  import { BellOutlined } from '@ant-design/icons-vue';
  import NoticeList from './NoticeList.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { notifyMsgPage } from '/@/api/msg';

  export default defineComponent({
    components: { Popover, BellOutlined, Tabs, TabPane: Tabs.TabPane, Badge, NoticeList },
    setup() {
      const { prefixCls } = useDesign('header-notify');
      let count = 1;

      const brokerApply = ref<any>({
        data: [],
        page_no: 1,
        pages_count: 10,
        rows_count: 0,
        rows_per_page: 10,
      });

      const masterApply = ref<any>({});

      async function getBrokerApply() {
        try {
          const { data, rows_count } = await notifyMsgPage({});
          brokerApply.data = data;
          brokerApply.rows_count = rows_count;
        } catch (error) {}
      }
      async function getMasterApply() {}

      onMounted(() => {
        getBrokerApply();
        getMasterApply();
      });

      return {
        prefixCls,
        brokerApply,
        masterApply,
        count,
        numberStyle: {},
      };
    },
  });
</script>
<style lang="less">
  @import (reference) '../../../../../design/index.less';
  @prefix-cls: ~'@{namespace}-header-notify';
  .@{prefix-cls} {
    padding-top: 2px;

    &__overlay {
      max-width: 360px;
    }

    .ant-tabs-content {
      width: 300px;
    }

    .ant-badge {
      font-size: 18px;

      .ant-badge-multiple-words {
        padding: 0 4px;
      }

      svg {
        width: 0.9em;
      }
    }
  }
</style>
