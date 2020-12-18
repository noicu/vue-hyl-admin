<template>
  <BasicModal v-bind="$attrs" @register="register" :title="title" :canFullscreen="false">
    <Form layout="vertical" :model="form">
      <FormItem label="图标">
        <a-input v-model:value="form.icon" placeholder="请输入" />
      </FormItem>
      <FormItem label="名称">
        <a-input v-model:value="form.name" placeholder="请输入分类名称" />
      </FormItem>
      <FormItem label="顺序">
        <a-input v-model:value="form.sort_no" placeholder="请输入分类顺序" />
      </FormItem>
    </Form>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Form } from 'ant-design-vue';

  export default defineComponent({
    components: { BasicModal, Form, FormItem: Form.Item },
    setup() {
      const title = computed(() => (form.id ? '编辑' : '添加') + '分类');
      let form = reactive({});

      console.log(123);
      const [register] = useModalInner((data) => {
        if (data.id) {
          form.id = data.id;
          form.name = data.name;
          form.icon = data.icon;
          form.sort_no = data.sort_no;
        } else {
          form.id = '';
          form.name = '';
          form.icon = '';
          form.sort_no = '';
        }
        console.log(form);
      });

      return {
        register,
        form,
        title,
      };
    },
  });
</script>
