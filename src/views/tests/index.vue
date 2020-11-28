<template>
  <div class="filter">
    <div class="filter-exposed-container"></div>
    <div class="filter-icon">
      <Icon icon="ant-design:format-painter-outlined" size="18" />
    </div>
    <div class="filter-edit-area" @click="onFilter">
      <div class="filter-chip-list">
        <div class="filter-chip-content" v-for="it in 10">
          <div class="filter-chip-text-content">
            <div class="filter-chip-text-key">kay</div>
            <div class="filter-chip-text-linq">:</div>
            <div class="filter-chip-text-value">123</div>
          </div>
          <div class="filter-chip-close">
            <Icon icon="ant-design:close-outlined" />
          </div>
        </div>
        <div class="filter-input-container">
          <div class="filter-input">
            <div
              ref="filterInput"
              class="input"
              contenteditable
              placeholder="请输入文字"
              spellcheck="false"
              autocapitalize="none"
              tabindex="0"
              @input="handleInput"
              @compositionstart="handleStart"
              @compositionend="handleEnd"
              @blur="handleBlur"
              @focus="handleFocus"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="filter-icon filter-clear-icon">
      <Icon icon="ant-design:format-painter-outlined" size="18" />
    </div>
    <div class="filter-exposed-container"></div>
  </div>
</template>
<script lang="ts">
  import Icon from '/@/components/Icon';
  /// https://webix.com/
  /// https://console.cloud.google.com/iam-admin/iam?project=trans-crawler-232514
  /// https://blog.csdn.net/michael2012zhao/article/details/1485650
  import { computed, createVNode, defineComponent, ref, render, watch } from 'vue';
  // import { Menu, Divider } from 'ant-design-vue';
  import Fmenu from './fmenu';
  // interface Filter<T> {
  //   key: string;
  //   value: T;
  // }
  const filtersConfig = [
    {
      key: 'key',
      key_text: 'k键值key',
      type: 'string',
      linq: false,
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
      linq: false, // 表达式
      option: [
        {
          label: '',
          value: '',
        },
      ],
    },
  ];

  export default defineComponent({
    components: { Icon },
    setup() {
      const innerText = ref('');
      const filterInput = ref<Nullable<HTMLElement>>(null);
      const focus = ref<boolean>(false);

      watch(innerText, () => {
        // let text = v.match(/([\u4e00-\u9fa5_a-zA-Z_0-9\\-]*)(:|：*)(=|!|<=|>=|<|>|.*)([0-9]*)/);
        // if (text && text[1]) {
        //   const k = text[1];
        //   console.log(filtersConfig.map((item) => item.key).indexOf(k));
        //   console.log(filtersConfig.map((item) => item.key).map((item) => item.indexOf(k)));
        //   console.log(filtersConfig.map((item) => item.key_text).indexOf(k));
        //   console.log(filtersConfig.map((item) => item.key_text.indexOf(k)));
        // }
        // console.log(text);
        createOptionsMenu();
      });

      const textArray = computed(() =>
        innerText.value.match(/([\u4e00-\u9fa5_a-zA-Z_0-9\\-]*)(:|：*)(=|!|<=|>=|<|>|.*)([0-9]*)/)
      );

      function handleInput(event: any) {
        innerText.value = event.target.innerText;
      }

      function handleStart() {
        console.log('开始输入中文');
      }

      function handleEnd() {
        console.log('输入中文结束');
      }

      function handleBlur() {
        focus.value = false;
        console.log('失去焦点');
      }
      function handleFocus() {
        focus.value = true;
        console.log('获得焦点', filterInput);
      }

      watch(focus, () => createOptionsMenu());

      function createOptionsMenu() {
        // console.log(textArray.value)
        const vm = createVNode(Fmenu, {
          axis: { x: getParentLeft(filterInput.value), y: getParentTop(filterInput.value) + 46 },
          show: focus.value,
          onFinished: () => {
            filterInput.value?.blur();
            if (textArray.value && textArray.value[3] == '') filterInput.value?.focus();
          },
          val: textArray.value,
          schemas: filtersConfig, // 可用查询的key 及配置
          data: [], // 当前表格数据，用于分析推荐值
          items: [
            {
              label: innerText.value,
              icon: 'ant-design:plus-outlined',
            },
          ],
        });
        render(vm, document.body);
      }

      function onFilter() {
        const el = filterInput.value as any;
        getC(el);
        // const value = el.innerText;
        // el.focus();
        // el.innerText = '';
        // el.innerText = value;
        // document.body.createTextRange();
        // el.selectionStart = el.selectionEnd = value.length;

        console.log(document.getElementsByClassName('input')[0]);
        console.log(filterInput);
        // console.log(getParentTop(filterInput.value));
        // console.log(getParentLeft(filterInput.value));

        // filterInput.value.focus();
      }
      // div contenteditable 重新编辑时focus光标定位到前面问题解决
      function getC(el: any) {
        el.focus();
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        //判断光标位置，如不需要可删除
        if (sel?.anchorOffset != 0) {
          return;
        }
        sel.removeAllRanges();
        sel.addRange(range);
      }

      function getParentTop(e: any) {
        var offset = e.offsetTop;
        if (e.offsetParent != null) {
          offset += getParentTop(e.offsetParent);
        }
        return offset;
      }
      function getParentLeft(e: any) {
        var offset = e.offsetLeft;
        if (e.offsetParent != null) {
          offset += getParentLeft(e.offsetParent);
        }
        return offset;
      }
      return {
        filterInput,
        onFilter,
        filtersConfig,
        innerText,
        handleInput,
        handleStart,
        handleEnd,
        handleBlur,
        handleFocus,
      };
    },
  });
</script>
<style lang="less" scoped>
  .input {
    // width: 200px;
    // height: 24px;
    padding: 5px 8px;
    font-size: 14px;
    line-height: 24px;
    // border: 1px solid #ddd;

    &:empty::before {
      content: attr(placeholder);
    }
  }

  .filter {
    display: flex;
    width: 100%;
    flex-direction: row;
    background: #fff;

    &-exposed-container {
      display: inline-flex;
      align-self: flex-start;
      margin-top: 8px;
      flex-grow: 1;
    }

    &-icon {
      display: inline-block;
      margin: 11px 4px 11px 19px;
      line-height: 0;
      vertical-align: middle;
    }

    &-edit-area {
      display: flex;
      align-items: center;
      width: 100%;
      cursor: text;
    }

    &-input {
      &-container {
        position: relative;
        // display: flex;
        min-width: 140px;
      }
    }

    &-chip {
      &-list {
        display: flex;
        align-items: center;
        margin-left: 5px;
        flex-wrap: wrap;
        box-sizing: border-box;
      }

      &-content {
        position: relative;
        display: inline-flex;
        height: auto;
        min-height: 20px;
        padding: 0 12px;
        padding-right: 2px;
        margin: 4px;
        font-family: 'Roboto';
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;
        fill: white;
        color: white;
        word-break: break-word;
        cursor: default;
        background-color: #3367d6;
        border-width: 0;
        border-radius: 10px;
        outline: none;
        align-items: center;
        box-sizing: border-box;
      }

      &-text {
        &-key {
          display: inline-block;
        }

        &-linq {
          display: inline-block;
        }

        &-value {
          display: inline-block;
        }
      }
    }

    &-clear-icon {
      width: 24px;
      height: 24px;
      padding: 0;
      line-height: 24px;
    }
  }
</style>
