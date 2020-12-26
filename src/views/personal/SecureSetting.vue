<template>
  <CollapseContainer title="安全设置" :canExpan="false">
    <List>
      <ListItem>
        <ListItemMeta>
          <template #title>
            账户密码
            <div class="extra">
              <a-button type="primary" @click="openModal"> 修改 </a-button>
            </div>
          </template>
          <template #description>
            <div>当前密码强度：：强</div>
          </template>
        </ListItemMeta>
      </ListItem>
    </List>
    <BasicModal @register="register" title="修改密码" @ok="ok" width="500px">
      <a-form
        :model="form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12 }"
        layout="horizontal"
      >
        <a-form-item label="当前密码">
          <a-input v-model:value="form.old_pwd" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item label="新密码">
          <a-input v-model:value="form.new_pwd" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item label="再次输入新密码">
          <a-input v-model:value="newPwd" type="password" autocomplete="off" />
        </a-form-item>
      </a-form>
    </BasicModal>
  </CollapseContainer>
</template>
<script lang="ts">
  import { List } from 'ant-design-vue';
  import { defineComponent, reactive, ref } from 'vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import { BasicModal, useModal } from '/@/components/Modal';

  import { secureSettingList } from './data';

  export default defineComponent({
    components: {
      CollapseContainer,
      List,
      ListItem: List.Item,
      ListItemMeta: List.Item.Meta,
      BasicModal,
    },
    setup() {
      const [register, { openModal }] = useModal();
      const form = reactive({
        old_pwd: '',
        new_pwd: '',
      });
      const newPwd = ref('');

      function ok(e: any) {
        console.log(e);
      }

      return {
        register,
        openModal,
        list: secureSettingList,
        form,
        newPwd,
        ok,
      };
    },
  });
</script>
<style lang="less" scoped>
  .extra {
    float: right;
    margin-top: 10px;
    margin-right: 30px;
    font-weight: normal;
    color: #1890ff;
    cursor: pointer;
  }
</style>
