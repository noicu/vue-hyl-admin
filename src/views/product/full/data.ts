import { FormSchema } from '/@/components/Form';

const productTypeOptions = [
  {
    label: '类型1',
    value: 15,
  },
  {
    label: '类型2',
    value: 16,
  },
];

export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '名称',
    required: true,
  },
  {
    field: 'remark',
    component: 'Input',
    label: '备注',
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'key_word',
    component: 'Input',
    label: '关键词',
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'visit_count',
    component: 'InputNumber',
    label: '访问次数',
    rules: [
      {
        type: 'number',
        required: true,
      },
    ],
  },
  {
    field: 'cate_id',
    component: 'Select',
    label: '类别',
    rules: [
      {
        type: 'number',
        required: true,
      },
    ],
    colProps: {
      offset: 2,
    },
    componentProps: {
      options: productTypeOptions,
    },
  },
  {
    field: 'enabled',
    component: 'Switch',
    label: '公开',
    rules: [
      {
        type: 'boolean',
        required: true,
      },
    ],
    colProps: {
      offset: 2,
    },
  },
];
