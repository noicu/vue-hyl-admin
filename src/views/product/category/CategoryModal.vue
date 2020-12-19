<template>
  <BasicModal v-bind="$attrs" @register="register" :title="title" :canFullscreen="false">
    <div>
      <Row type="flex" style="flex-wrap: initial">
        <Col flex="140px">1 </Col>
        <Col>
          <Form layout="vertical" :model="form">
            <FormItem label="名称" style="margin-bottom: 0">
              <a-input v-model:value="form.name" placeholder="请输入分类名称" />
            </FormItem>
            <FormItem label="顺序" style="margin-bottom: 0">
              <a-input v-model:value="form.sort_no" placeholder="请输入分类顺序" />
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
    <template #footer>
      <a-button
        v-if="form.id"
        key="delete"
        type="danger"
        style="float: left"
        :loading="obp.loading"
        @click="onDelete"
      >
        删除
      </a-button>
      <a-button key="back" @click="closeModal"> 关闭 </a-button>
      <a-button key="submit" type="primary" v-bind="obp"> 确定 </a-button>
    </template>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, unref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Form, Row, Col } from 'ant-design-vue';
  import { categoryCh, categoryAdd, categoryRm, Category } from '/@/api/yi/productManager';
  // import { useLoading } from '/@/components/Loading';

  export default defineComponent({
    emits: ['return'],
    components: { BasicModal, Form, FormItem: Form.Item, Row, Col },
    setup({}, { emit }) {
      const title = computed(() => (form.id ? '编辑' : '添加') + '分类');
      let form = reactive<Category>({
        name: '',
        icon: '',
        sort_no: 0,
      });
      const obp = reactive({
        loading: false,
        onClick: () => onClick(),
      });

      const [register, { closeModal }] = useModalInner((data) => {
        obp.loading = false;
        if (data.id) {
          form.id = data.id;
          form.name = data.name;
          form.icon = data.icon;
          form.sort_no = data.sort_no;
        } else {
          form.id = 0;
          form.name = '';
          form.icon = '';
          form.sort_no = 0;
        }
        console.log(form);
      });

      async function onClick() {
        obp.loading = true;
        try {
          if (form.id) {
            await categoryCh(
              {
                name: form.name,
                icon: form.icon,
                sort_no: 1,
              },
              form.id
            );
            emit('return', unref(form));
          } else {
            await categoryAdd({
              name: form.name,
              icon: form.icon,
              sort_no: 1,
            });
            emit('return', unref(form));
          }
          closeModal();
        } catch (error) {
          console.log(error);
        } finally {
          obp.loading = false;
        }
      }

      async function onDelete() {
        obp.loading = true;
        try {
          if (form.id) await categoryRm(form.id);
          emit('return', unref(form));
          closeModal();
        } catch (error) {
          console.log(error);
        } finally {
          obp.loading = false;
        }
      }

      return {
        register,
        form,
        title,
        obp,
        closeModal,
        onDelete,
      };
    },
  });
</script>
