<template>
  <BasicModal v-bind="$attrs" @register="register" title="添加分类" @ok="ok" :canFullscreen="false">
    <div>
      <div :style="{ borderBottom: '1px solid #E9E9E9' }">
        <a-checkbox
          v-model:checked="checkAll"
          :indeterminate="indeterminate"
          @change="onCheckAllChange"
        >
          全选
        </a-checkbox>
      </div>
      <br />
      <a-checkbox-group v-model:value="checked" style="width: 100%" @onChange="onChange">
        <div v-for="cat in categorys">
          <a-checkbox :value="cat.id" style="width: 100%" :disabled="bp.indexOf(cat.id) != -1">
            {{ cat.name }}
          </a-checkbox>
        </div>
      </a-checkbox-group>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Form, Row, Col } from 'ant-design-vue';
  import { categoryList, brokerCateAdd } from '/@/api/user';

  export default defineComponent({
    emits: ['return'],
    components: { BasicModal, Form, FormItem: Form.Item, Row, Col },
    setup({}, { emit }) {
      const bp = ref<any[]>([]);

      const categorys = ref<any[]>([]);
      const checked = ref<any[]>([]);
      const loadingRef = ref(false);
      const checkAll = ref(false);
      const indeterminate = ref(false);

      const [register, { closeModal }] = useModalInner((data) => {
        loadingRef.value = false;
        checkAll.value = false;
        indeterminate.value = false;
        checked.value = [];
        bp.value = data.bp.map((it: any) => it.cate_id);
      });

      getCategory();

      function getCategory() {
        loadingRef.value = true;
        categoryList({})
          .then((res) => {
            categorys.value = res;
          })
          .finally(() => {
            loadingRef.value = false;
          });
      }

      async function ok() {
        try {
          await brokerCateAdd({
            list_cate_id: checked.value.filter((it) => bp.value.indexOf(it) == -1),
          });
        } catch (error) {
          console.log(error);
        } finally {
          closeModal();
          emit('return', checked.value);
        }
      }

      function onChange() {
        indeterminate.value =
          !!checked.value.length && checked.value.length < categorys.value.length;
        checkAll.value = checked.value.length === categorys.value.length;
      }
      function onCheckAllChange(e: any) {
        checked.value = e.target.checked ? categorys.value.map((it) => it.id) : [];
        indeterminate.value = false;
      }

      return {
        register,
        closeModal,
        categorys,
        checked,
        checkAll,
        indeterminate,
        onChange,
        onCheckAllChange,
        bp,
        ok,
      };
    },
  });
</script>
<style lang="less" scoped>
  .category__a {
    color: #fff !important;
    background: #2196f3 !important;
  }

  .product {
    &-category {
      display: flex;
      height: 32px;
      padding-left: 8px;
      line-height: 32px;
      background: #fff;
      border-bottom: 1px solid #ededed;

      &-title {
        font-size: 18px;
        font-weight: 700;
      }

      &-item {
        font-size: 14px;

        &:hover {
          background-color: #fafafa;
        }
      }

      &:hover &-edit {
        display: block;
      }

      &-icon {
        width: 32px;
        height: 32px;
        padding: 3px;
        line-height: 24px;
        color: #eee;
        text-align: center;

        img {
          width: 100%;
          height: 100%;
        }
      }

      &-name {
        flex: 1;
        padding-left: 3px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &-edit {
        display: none;
        width: 32px;
        color: #c01212;
        text-align: center;
        cursor: pointer;

        &:hover {
          color: #ff9b9b;
        }
      }

      &-add {
        width: 32px;
        color: #12c07d;
        text-align: center;
        cursor: pointer;

        &:hover {
          color: #9bdfff;
        }
      }

      &-del {
        width: 32px;
        color: #c01212;
        text-align: center;
        cursor: pointer;

        &:hover {
          color: #ff9b9b;
        }
      }
    }
  }
</style>
