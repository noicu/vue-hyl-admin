<template>
  <div>
    <a-page-header title="管理员列表" :ghost="false" :class="`${prefixCls}__header`">
      <template #extra>
        <a-button type="primary" @click="add"> 新增管理员 </a-button>
      </template>
    </a-page-header>
    <div :class="`${prefixCls}__content`">
      <a-list :pagination="pagination">
        <template v-for="item in list" :key="item.id">
          <a-list-item class="list">
            <a-list-item-meta>
              <template #avatar>
                <img v-if="item.icon" :src="item.icon" class="icon" alt="" />
              </template>
              <template #title>
                <span>{{ item.user_code_ref }}</span>
                <div class="extra">
                  <Popconfirm
                    :title="`确定要删除 ${item.user_code_ref} 吗?`"
                    @confirm="onDelete(item)"
                  >
                    <template #icon><Icon icon="mdi:alert" style="color: red" /></template>
                    <a-button type="danger" size="small" :loading="isDelLoads(item)">
                      删除
                    </a-button>
                  </Popconfirm>
                </div>
              </template>
              <template #description>
                <div class="description">{{ item.nick }}</div>
                <div class="info">
                  <div><span>状态</span>{{ nToB(item.enabled) ? '正常' : '禁用' }}</div>
                  <div><span>更新时间</span>{{ item.update_at }}</div>
                </div>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script lang="ts">
  import { Popconfirm } from 'ant-design-vue';
  import { defineComponent, reactive, ref } from 'vue';
  import Icon from '/@/components/Icon/index';
  import { brokerAdminList, brokerAdminRm } from '/@/api/user';
  import { nToB } from '/@/utils/conversion';
  import router from '/@/router';

  export default defineComponent({
    components: { Icon, Popconfirm },
    setup() {
      const list = ref<any>([]);
      const delLoads: any = reactive({});

      const isDelLoads = (e: any) => delLoads[e.uid];

      getData();

      async function getData() {
        try {
          let l = await brokerAdminList();
          list.value = l;
          console.log(list);
        } catch (error) {
          console.log(error);
        }
      }

      async function onDelete(e: any) {
        try {
          delLoads[e.uid] = true;
          await brokerAdminRm({ uid: e.uid });
          await getData();
        } catch (error) {
          console.log(error);
        } finally {
          delLoads[e.uid] = false;
        }
      }

      function add() {
        router.push({ name: 'User' });
      }

      return {
        prefixCls: 'list-basic',
        list,
        isDelLoads,
        onDelete,
        nToB,
        add,
        pagination: {
          show: true,
          pageSize: 3,
        },
      };
    },
  });
</script>

<style lang="less" scoped>
  .list-basic {
    &__top {
      padding: 24px;
      margin: 24px 24px 0 24px;
      text-align: center;
      background: #fff;

      &-col {
        &:not(:last-child) {
          border-right: 1px dashed rgba(206, 206, 206, 0.4);
        }

        div {
          margin-bottom: 12px;
          font-size: 14px;
          line-height: 22px;
          color: rgba(0, 0, 0, 0.45);
        }

        p {
          margin: 0;
          font-size: 24px;
          line-height: 32px;
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }

    &__content {
      padding: 24px;
      margin: 12px 24px;
      background: #fff;

      .list {
        position: relative;
      }

      .icon {
        font-size: 40px !important;
      }

      .extra {
        position: absolute;
        top: 20px;
        right: 15px;
        font-weight: normal;
        // color: #1890ff;
        cursor: pointer;
      }

      .description {
        display: inline-block;
        width: 40%;
      }

      .info {
        display: inline-block;
        width: 30%;
        text-align: center;

        div {
          display: inline-block;
          padding: 0 20px;

          span {
            display: block;
          }
        }
      }

      .progress {
        display: inline-block;
        width: 15%;
        vertical-align: top;
      }
    }
  }
</style>
