<template>
  <a-steps
    :current="record.stat == 4 ? 3 : getCurrent(record)"
    size="small"
    :status="record.stat == -1 ? 'error' : 'process'"
  >
    <template #progressDot="{ index, status, prefixCls }">
      <a-popover v-if="index == 0">
        <template #content>
          <span>投诉时间：</span>
          <span>{{ record.CreateDate }}</span>
        </template>
        <span :class="`${prefixCls}-icon-dot`" />
      </a-popover>
      <a-popover v-else-if="index == 1 && record.b_auditor_id">
        <template #content>
          <span>处理时间：</span>
          <span>{{ record.b_audit_date }}</span>
        </template>
        <span :class="`${prefixCls}-icon-dot`" />
      </a-popover>
      <a-popover v-else-if="index == 2 && record.auditor_id">
        <template #content>
          <span>处理时间：</span>
          <span>{{ record.audit_date }}</span>
        </template>
        <span :class="`${prefixCls}-icon-dot`" />
      </a-popover>
      <!-- {{status}} -->
      <span v-else-if="status == 'finish'" :class="`${prefixCls}-icon-dot none-dot`" />
      <span v-else :class="`${prefixCls}-icon-dot`" />
    </template>
    <a-step title="发起投诉">
      <template #description>
        <a-tag style="margin: 0; cursor: pointer" color="green" @click="opUser(record.uid)">
          {{ record.nick }}
        </a-tag>
      </template>
    </a-step>
    <a-step
      :title="
        record.b_auditor_id
          ? !record.auditor_id && record.stat == -1
            ? '驳回'
            : '审核通过'
          : '未审核'
      "
    >
      <template #description>
        <a-tag
          style="margin: 0; cursor: pointer"
          color="green"
          v-if="record.b_auditor_id"
          @click="opBroker(record.b_auditor_id)"
        >
          {{ record.b_auditor_nick }}
        </a-tag>
      </template>
    </a-step>
    <a-step :title="record.auditor_id ? (record.stat == -1 ? '驳回' : '审核通过') : '未审核'">
      <template #description>
        <a-tag
          style="margin: 0; cursor: pointer"
          color="green"
          v-if="record.auditor_id"
          @click="opAdmin(record.auditor_id)"
        >
          {{ record.auditor_nick }}
        </a-tag>
      </template>
    </a-step>
    <a-step title="完成" :description="record.stat == 4 ? record.last_updated : ''" />
  </a-steps>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Alert } from 'ant-design-vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import { Description } from '/@/components/Description/index';
  import router from '/@/router';

  export default defineComponent({
    components: { Description, Alert, CollapseContainer },
    props: {
      record: {
        type: Object as PropType<any>,
        default: () => ({} as any),
      },
    },
    setup({ record }) {
      function getCurrent(data: any) {
        if (data.auditor_id) {
          return 2;
        }
        if (data.b_auditor_id) {
          return 1;
        }
        console.log(data);
      }

      function opBroker(id: number) {
        router.push({ name: 'ComplaintFull', params: { id } });
      }

      function opAdmin(id: number) {
        router.push({ name: 'ComplaintFull', params: { id } });
      }

      function opUser(id: number) {
        router.push({ name: 'ComplaintFull', params: { id } });
      }
      return { record, getCurrent, opBroker, opAdmin, opUser };
    },
  });
</script>
<style lang="less" scoped>
  .none-dot {
    background: none !important;
    border: 2px solid rgb(24, 144, 255);
  }
</style>
