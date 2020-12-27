<template>
  <div class="p-4">
    <Description
      class="mt-4"
      title="投诉信息"
      layout="vertical"
      :collapseOptions="{ canExpand: true, helpMessage: 'help me' }"
      :column="2"
      :data="mockData"
      :schema="schema"
    />
    <Description
      class="mt-4"
      title="运营商处理信息"
      layout="vertical"
      :collapseOptions="{ canExpand: true, helpMessage: 'help me' }"
      :column="2"
      :data="mockData"
      :schema="schemaB"
    />
    <Description
      class="mt-4"
      title="平台处理信息"
      layout="vertical"
      :collapseOptions="{ canExpand: true, helpMessage: 'help me' }"
      :column="2"
      :data="mockData"
      :schema="schemaP"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';
  import { Alert, Tag } from 'ant-design-vue';
  import { Description, DescItem } from '/@/components/Description/index';
  const mockData: any = {
    CreateDate: '2020-11-23 17:13:31',
    amt: 0,
    audit_date: '0001-01-01 00:00:00',
    auditor_icon: '',
    auditor_id: 0,
    auditor_nick: '',
    b_audit_date: '0001-01-01 00:00:00',
    b_auditor_icon: '',
    b_auditor_id: 0,
    b_auditor_nick: '',
    b_type: 'mall',
    brief: '搓要-简单说明',
    broker_id: 61,
    broker_name: '',
    create_time_int: 1606122811349370400,
    detail: '详情',
    draw_back: true,
    icon:
      'http://p.0755yicai.com/09ef3a05-c020-40a8-9301-6da957defe89?e=1921136738&token=gEpp05gnISRQeLZ6d5GCnAryXSFDnMfl_G5iG5p5:q1cbhTeFrEbspWm_ZA_z1OiHBOE=',
    id: '000000000000000000000000',
    images: ['http://abc.a/a.jpeg', 'b.jpeg'],
    last_updated: '2020-11-23 17:13:31',
    master_icon: '',
    master_id: 10,
    master_nick: '',
    nick: '会员349',
    order_id: '5fb4caad4067695383928af2',
    stat: 0,
    uid: 349,
  };
  const schema: DescItem[] = [
    {
      field: 'nick',
      label: 'nick',
    },
    {
      field: 'order_id',
      label: 'order_id',
    },
    {
      field: 'draw_back',
      label: '是否退款',
      render(val) {
        if (val) {
          return h(
            Tag,
            {
              color: 'blue',
            },
            '是'
          );
        } else {
          return h(Tag, '否');
        }
      },
    },
    {
      field: 'b_type',
      label: '类型',
    },
    {
      field: 'detail',
      label: '描述',
      span: 2,
    },
    {
      field: 'images',
      label: '图片',
      render(val) {
        if (val) {
          return h(
            Tag,
            {
              color: 'blue',
            },
            '是'
          );
        } else {
          return h(Tag, '否');
        }
      },
    },
  ];
  const schemaP: DescItem[] = [
    {
      field: 'auditor_nick',
      label: '昵称',
    },
    {
      field: 'audit_date',
      label: '处理时间',
    },
  ];
  const schemaB: DescItem[] = [
    {
      field: 'b_auditor_nick',
      label: '昵称',
    },
    {
      field: 'b_audit_date',
      label: '处理时间',
    },
  ];
  export default defineComponent({
    components: { Description, Alert },
    setup() {
      return { mockData, schema, schemaB, schemaP };
    },
  });
</script>
