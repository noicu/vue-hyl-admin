<template>
  <div class="high-form" v-loading="loading">
    <div class="p-4">
      <Description
        class="mt-4"
        title="投诉信息"
        layout="vertical"
        :collapseOptions="{ canExpand: true }"
        :column="2"
        :data="data"
        :schema="schema"
      />
    </div>
    <PageFooter v-if="data.id">
      <template #left>
        <div class="pt-4 pb-4">
          <ComplaintSteps v-if="!loading" :record="data" />
        </div>
      </template>
      <template #right v-if="getAuditStatus">
        <a-button class="mr-2" type="danger" @click="onAudit(false)" :loading="loadingAudit"
          >驳回</a-button
        >
        <a-button type="primary" @click="onAudit(true)" :loading="loadingAudit">通过</a-button>
      </template>
    </PageFooter>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, h, computed, unref, onMounted } from 'vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import { Description } from '/@/components/Description/index';
  import ComplaintSteps from './ComplaintSteps.vue';
  import { useRouter } from 'vue-router';
  import { refundOrderGet, refundOrderBAudit, refundOrderAudit } from '/@/api/trade';
  import { DescItem } from '/@/components/Description/index';
  import { Alert, Tag, Image } from 'ant-design-vue';
  import { PageFooter } from '/@/components/Page';
  import { userStore } from '/@/store/modules/user';
  import { RoleEnum } from '/@/enums/roleEnum';
  import router from '/@/router';
  import { useTabs } from '/@/hooks/web/useTabs';

  export default defineComponent({
    components: { Description, Alert, CollapseContainer, ComplaintSteps, Image, PageFooter },
    props: { his: { type: Boolean, default: () => false } },
    setup({ his }) {
      const { closeCurrent } = useTabs();
      const { currentRoute } = useRouter();
      const loading = ref(false);
      const loadingAudit = ref(false);

      const params = computed(() => {
        return unref(currentRoute).params;
      });

      const data = ref<any>({});

      onMounted(() => {
        getData();
      });

      async function getData() {
        loading.value = true;
        try {
          const res = await refundOrderGet(unref(params).id as string, his);
          data.value = res;
        } catch (e) {
          console.log(e);
        } finally {
          loading.value = false;
        }
      }

      const schema: DescItem[] = [
        {
          field: 'nick',
          label: '投诉人',
        },
        {
          field: 'order_id',
          label: '订单号',
        },
        {
          field: 'draw_back',
          label: '退款',
          render(val, { amt }) {
            if (val) {
              return h(
                Tag,
                {
                  color: 'blue',
                },
                () => '¥' + amt
              );
            } else {
              return h(Tag, () => '否');
            }
          },
        },
        {
          field: 'b_type',
          label: '订单类型',
          render(val) {
            if (!val) return '无';
            switch (val) {
              case 'yi-order':
                return '大师订单';
              case 'mall':
                return '商城订单';
              default:
                return val;
            }
          },
        },
        {
          field: 'detail',
          label: '描述',
          span: 2,
        },
        {
          field: 'images',
          label: '图片',
          render(val: any) {
            if (!val) return '无';
            return h(Image.PreviewGroup, () =>
              val.map((it: any) =>
                h(Image, {
                  style: {
                    marginRight: '10px',
                  },
                  width: 100,
                  src: it,
                })
              )
            );
          },
        },
      ];

      const role = ref({
        broker: userStore.getRoleListState.includes(RoleEnum.BROKER),
        super: userStore.getRoleListState.includes(RoleEnum.SUPER),
      });

      async function onAudit(ok: boolean) {
        if (!data.value.id) return;
        loadingAudit.value = true;
        try {
          let aud = false;
          if (unref(role).broker) {
            await refundOrderBAudit({
              id: data.value.id,
              ok,
            });
            if (!ok) {
              aud = true;
            } else {
              aud = false;
              getData();
            }
          }
          if (unref(role).super) {
            await refundOrderAudit({
              id: data.value.id,
              ok,
            });
            aud = true;
          }
          if (aud) {
            closeCurrent();
            router.push({ name: 'ComplaintFullHis', params: { id: data.value.id } });
          }
        } catch (error) {
          console.log(error);
        } finally {
          loadingAudit.value = false;
        }
      }

      const getAuditStatus = computed(() => {
        if (data.value.stat == -1) return false;
        if (role.value.broker) {
          return data.value.stat != 1;
        }
        if (role.value.super) {
          return data.value.stat != 4;
        }
      });

      return { data, schema, loading, loadingAudit, onAudit, role, getAuditStatus };
    },
  });
</script>
<style lang="less" scoped>
  .high-form {
    padding-bottom: 24px;
  }
</style>
