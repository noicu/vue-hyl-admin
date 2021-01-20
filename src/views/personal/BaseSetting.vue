<template>
  <CollapseContainer title="基本设置" :canExpan="false" :loading="loadingRef">
    <a-row :gutter="24">
      <a-col :span="14">
        <a-form
          :model="form"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 14 }"
          layout="horizontal"
        >
          <a-form-item label="用户名">
            <a-input v-model:value="form.user_name" />
          </a-form-item>
          <a-form-item label="性别">
            <a-radio-group v-model:value="form.sex">
              <a-radio :value="0"> 女 </a-radio>
              <a-radio :value="1"> 男 </a-radio>
              <a-radio :value="2"> 保密 </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="昵称">
            <a-input v-model:value="form.nick" />
          </a-form-item>
          <a-form-item label="身份证号">
            <a-input v-model:value="form.id_card" />
          </a-form-item>
          <a-form-item label="生日">
            <a-date-picker
              v-model:value="birth"
              format="YYYY-MM-DD"
              style="width: 100%"
              @change="chBirth"
            />
          </a-form-item>
          <a-form-item label="地区">
            <Districts v-model:value="districts" @change="chDistricts" />
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="10">
        <div class="change-avatar">
          <div class="mb-2">头像</div>
          <img width="140" :src="headerImg" alt="" />
          <Upload :showUploadList="false">
            <Button type="ghost" class="ml-5"> <Icon icon="feather:upload" />更换头像 </Button>
          </Upload>
        </div>
      </a-col>
    </a-row>
    <div style="text-align: center">
      <Button class="m-5" type="primary" @click="handleSubmit" :loading="loading"
        >更新基本信息</Button
      >
    </div>
  </CollapseContainer>
</template>
<script lang="ts">
  import { Button, Upload } from 'ant-design-vue';
  import { defineComponent, onMounted, reactive, ref, unref } from 'vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import Icon from '/@/components/Icon/index';

  import { useMessage } from '/@/hooks/web/useMessage';

  import headerImg from '/@/assets/images/header.jpg';
  import { Districts } from '/@/components/Districts';

  import { userStore } from '/@/store/modules/user';

  export default defineComponent({
    components: { CollapseContainer, Button, Upload, Icon, Districts },
    setup() {
      const { createMessage } = useMessage();
      const form = reactive<any>({
        country: '中国',
        birth_year: 1990,
        birth_month: 1,
        birth_day: 1,
        province: '',
        city: '',
        sex: 0,
        user_name: '',
        area: '',
        id_card: '',
        nick: '',
        icon: '',
      });

      const loading = ref(false);
      const loadingRef = ref(false);

      const districts = ref<string[]>([]);
      const birth = ref('');

      onMounted(async () => {
        getData();
      });

      async function getData() {
        loadingRef.value = true;
        try {
          const src = await userStore.getUserInfo();

          if (!src) return;

          const data = src as any;
          const birthA: number[] = [];

          Object.keys(unref(form)).forEach((key) => {
            if (key != 'country') form[key] = data[key];
            if (key == 'birth_year') birthA[0] = data[key] || 1990;
            if (key == 'birth_month') birthA[1] = data[key] || 1;
            if (key == 'birth_day') birthA[2] = data[key] || 1;
            if (key == 'province') districts.value[0] = data[key];
            if (key == 'city') districts.value[1] = data[key];
            if (key == 'area') districts.value[2] = data[key];
          });
          birth.value = birthA.join('-');
        } catch (error) {
          console.log(error);
        } finally {
          loadingRef.value = false;
        }
      }

      function chBirth(e: any) {
        let tt = e
          .format('YYYY-MM-DD')
          .split('-')
          .map((t: string) => Number(t));
        form.birth_year = tt[0];
        form.birth_month = tt[1];
        form.birth_day = tt[2];
      }

      function chDistricts(e: any) {
        console.log(e);
        form.province = e[0] || '';
        form.city = e[1] || '';
        form.area = e[2] || '';
      }

      async function handleSubmit() {
        loading.value = true;
        try {
          await userStore.setUserInfo(unref(form));
          createMessage.success('更新成功！');
        } catch (err) {
          createMessage.error('更新失败！');
        } finally {
          loading.value = false;
        }
      }

      return {
        loading,
        loadingRef,
        headerImg,
        form,
        districts,
        birth,
        chBirth,
        chDistricts,
        handleSubmit,
      };
    },
  });
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
