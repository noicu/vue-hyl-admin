<template>
  <div class="high-form">
    <a-page-header title="商品详情" sub-title="ID：BXT5aHUBUEDNcUc8voXi" :ghost="false">
    </a-page-header>

    <div class="main-content">
      <a-card title="基本信息" :bordered="false">
        <BasicForm @register="register" layout="vertical" />
      </a-card>
      <a-card title="颜色管理" :bordered="false" class="mt-5">
        <a-form layout="vertical">
          <CardGrid v-for="it in 3" class="color-input-card">
            <a-form-item label="名称" style="margin-bottom: 0">
              <a-input placeholder="" />
            </a-form-item>
            <a-form-item label="价格" style="margin-bottom: 0">
              <a-input placeholder="" />
            </a-form-item>
          </CardGrid>
        </a-form>
      </a-card>
      <a-card title="图片管理" :bordered="false" class="mt-5">
        <!-- <draggable
          v-model="data2"
          group="people"
          @start="drag = true"
          @end="drag = false"
          item-key="id"
        >
          <template #item="{ element }">
            <CardGrid class="img-input-card">
              <img
                :src="'http://p.0755yicai.com/63159644-5cbf-4345-8faa-a481be7b56a6?e=1919315383&token=gEpp05gnISRQeLZ6d5GCnAryXSFDnMfl_G5iG5p5:42Hi6nvqOEn3v3JAHaglMwusKoU='"
                class="img"
                @click="
                  handleClick(
                    'http://p.0755yicai.com/63159644-5cbf-4345-8faa-a481be7b56a6?e=1919315383&token=gEpp05gnISRQeLZ6d5GCnAryXSFDnMfl_G5iG5p5:42Hi6nvqOEn3v3JAHaglMwusKoU='
                  )
                "
                :alt="'img'"
              />
            </CardGrid>
          </template>
        </draggable> -->

        <!-- <CardGrid class="img-input-card">

        </CardGrid> -->
      </a-card>
    </div>

    <app-footer>
      <template #left> 最近更新时间：2020-10-27 15:34:31 </template>
      <template #right>
        <a-button type="primary" @click="submitAll">提交</a-button>
      </template>
    </app-footer>
  </div>
</template>
<script lang="ts">
  import { Card } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { computed, defineComponent, ref, unref } from 'vue';
  import PersonTable from './PersonTable.vue';
  import { schemas } from './data';
  import { useRouter } from 'vue-router';
  import { createImgPreview } from '/@/components/Preview/index';
  // import Draggable from 'vuedraggable';

  export default defineComponent({
    components: { BasicForm, PersonTable, CardGrid: Card.Grid },
    setup() {
      const { currentRoute } = useRouter();
      const tableRef = ref<{ getDataSource: () => any } | null>(null);

      const [register, { validate }] = useForm({
        baseColProps: {
          span: 6,
        },
        model: {
          cate_id: 16,
          cate_name: '图书',
          colors: [
            {
              code: '灰色',
              price: 100,
            },
            {
              code: '黄色',
              price: 1000,
            },
            {
              code: '金色',
              price: 10000,
            },
          ],
          created: '2020-10-27 15:37:41',
          enabled: true,
          id_of_es: 'B3T9aHUBUEDNcUc8voXM',
          image_main: 'pic-main',
          images: [
            {
              path: 'pic1',
              sort_no: 1,
            },
          ],
          key_word: '周易, 大荒',
          last_updated: '2020-10-27 15:37:41',
          name: '周易',
          remark: '周易',
          visit_count: 6,
        },
        schemas: schemas,
        showActionButtonGroup: false,
      });

      // async function getProduct(){
      //   try {

      //   } catch (error) {}
      // }

      function handleClick(img: string) {
        createImgPreview({ imageList: [img] });
      }

      async function submitAll() {
        try {
          if (tableRef.value) {
            console.log('table data:', tableRef.value.getDataSource());
          }

          const [values, taskValues] = await Promise.all([validate()]);
          console.log('form data:', values, taskValues);
        } catch (error) {}
      }

      const data = [
        {
          title: 'Title 1',
        },
        {
          title: 'Title 2',
        },
        {
          title: 'Title 3',
        },
        {
          title: 'Title 4',
        },
        {
          title: 'Title 5',
        },
        {
          title: 'Title 6',
        },
      ];

      const data2 = [
        { name: 'John', id: 1 },
        { name: 'Joao', id: 2 },
        { name: 'Jean', id: 3 },
        { name: 'Gerard', id: 4 },
      ];

      return {
        handleClick,
        register,
        submitAll,
        tableRef,
        data,
        data2,
        params: computed(() => {
          return unref(currentRoute).params;
        }),
      };
    },
  });
</script>
<style lang="less" scoped>
  @import (reference) '../../../design/index.less';

  .high-form {
    padding-bottom: 48px;
  }

  .main-content {
    margin: 20px;
  }

  .color-input {
    &-card {
      padding: 15px;
    }
  }

  .img-input {
    &-card {
      width: 100px;
      min-height: 100px;
      padding: 5px;
      cursor: pointer;
    }
  }

  .img {
    width: 100%;
  }

  .respond-to(xsmall-only,{
    .color-input {
      &-card {
        width: 100%;
      }
    }
    .main-content{
      margin:0;
    }
  });
  .respond-to(small-only,{
    .color-input {
      &-card {
        width: 50%;
      }
    }
  });
  .respond-to(medium-only,{
    .color-input{
      &-card {
        width: 50%;
      }
    }
  });
</style>
