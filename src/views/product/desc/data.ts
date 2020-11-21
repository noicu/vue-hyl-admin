import { FormSchema } from '/@/components/Form';

const basicOptions: SelectOptions = [
  {
    label: '付晓晓',
    value: '1',
  },
  {
    label: '周毛毛',
    value: '2',
  },
];

const storeTypeOptions: SelectOptions = [
  {
    label: '私密',
    value: '1',
  },
  {
    label: '公开',
    value: '2',
  },
];

export const schemas: FormSchema[] = [
  {
    field: 'f1',
    component: 'Input',
    label: '名称',
    required: true,
  },
  {
    field: 'f2',
    component: 'Input',
    label: '备注',
    required: true,
    componentProps: {
      addonBefore: 'http://',
      addonAfter: 'com',
    },
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'f3',
    component: 'Select',
    label: '关键词',
    componentProps: {
      options: basicOptions,
    },
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'f4',
    component: 'Select',
    label: '访问次数',
    componentProps: {
      options: basicOptions,
    },
    required: true,
  },
  {
    field: 'f5',
    component: 'RangePicker',
    label: '类别',
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'f6',
    component: 'Select',
    label: '公开',
    componentProps: {
      options: storeTypeOptions,
    },
    required: true,
    colProps: {
      offset: 2,
    },
  },
];
export const taskSchemas: FormSchema[] = [
  {
    field: 't1',
    component: 'Input',
    label: '任务名',
    required: true,
  },
  {
    field: 't2',
    component: 'Input',
    label: '任务描述',
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 't3',
    component: 'Select',
    label: '执行人',
    componentProps: {
      options: basicOptions,
    },
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 't4',
    component: 'Select',
    label: '责任人',
    componentProps: {
      options: basicOptions,
    },
    required: true,
  },
  {
    field: 't5',
    component: 'TimePicker',
    label: '生效日期',
    required: true,
    componentProps: {
      style: { width: '100%' },
    },
    colProps: {
      offset: 2,
    },
  },
  {
    field: 't6',
    component: 'Select',
    label: '任务类型',
    componentProps: {
      options: storeTypeOptions,
    },
    required: true,
    colProps: {
      offset: 2,
    },
  },
];
