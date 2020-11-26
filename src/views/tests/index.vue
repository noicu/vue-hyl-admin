<template>
  <div style="padding: 10px">
    <div> </div>
    <input
      class="input"
      contenteditable
      placeholder="请输入文字"
      spellcheck="false"
      autocapitalize="none"
      v-model="innerText"
    ></input>
  </div>
</template>
<script lang="ts">

/// https://webix.com/
/// https://console.cloud.google.com/iam-admin/iam?project=trans-crawler-232514
/// https://blog.csdn.net/michael2012zhao/article/details/1485650
  import { defineComponent, ref, watch } from 'vue';
  // interface Filter<T> {
  //   key: string;
  //   value: T;
  // }
  export default defineComponent({
    components: {},
    setup() {
      const filtersConfig = [
        {
          key: 'key',
          key_text: 'k键值key',
          type: 'string',
          option: [
            {
              label: '',
              value: '',
            },
          ],
        },
        {
          key: 'key1',
          key_text: 'k键值key2',
          type: 'string',
          option: [
            {
              label: '',
              value: '',
            },
          ],
        },
      ];
      const innerText = ref('');
      watch(innerText, (v) => {
       let text = v.match(
          /([\u4e00-\u9fa5_a-zA-Z_0-9\\-]*)(:|：*)(=|!|<=|>=|<|>|.*)([0-9]*)/
        );
        if(text && text[1]){
          const k = text[1]
          console.log(filtersConfig.map((item) => item.key).indexOf(k))
          console.log(filtersConfig.map((item) => item.key).map((item) => item.indexOf(k)))
          console.log(filtersConfig.map((item) => item.key_text).indexOf(k))
          console.log(filtersConfig.map((item) => item.key_text.indexOf(k)))
        }
        console.log(text);
      });
      return { filtersConfig, innerText };
    },
  });
</script>
<style lang="less" scoped>
  .input {
    width: 200px;
    // height: 24px;
    padding: 5px 8px;
    font-size: 14px;
    line-height: 24px;
    border: 1px solid #ddd;

    &:empty::before {
      content: attr(placeholder);
    }
  }
</style>
