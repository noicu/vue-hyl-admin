<template>
  <div class="filter">
    <div class="filter-exposed-container"></div>
    <div class="filter-icon">
      <Icon icon="ant-design:format-painter-outlined" size="18" />
    </div>
    <div class="filter-edit-area" @click="onFilter">
      <div class="filter-chip-list">
        <transition-group name="slide-x-fade" appear>
          <div class="filter-chip-content" v-for="(it, i) in filterData" :key="it">
            <div class="filter-chip-text-content">
              <div class="filter-chip-text-key">{{ it.key_show }}</div>
              <div class="filter-chip-text-linq">{{ it.linq }}</div>
              <div class="filter-chip-text-value">{{ it.value_show }}</div>
            </div>
            <div class="filter-chip-close" @click.stop="(e) => handleDelete(i, e)">
              <Icon icon="ant-design:close-outlined" />
            </div>
          </div>
        </transition-group>

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
  import {
    computed,
    createVNode,
    defineComponent,
    reactive,
    ref,
    render,
    unref,
    watch,
    onMounted,
  } from 'vue';

  import Fmenu from './fmenu';
  import { FilterDataRT, FilterMenuItem, FMIT } from './types';
  import { findKey } from './utils';
  import { filterProps as props } from './props';

  export default defineComponent({
    components: { Icon },
    props,
    setup({ filtersConfig, dataSource: data }) {
      const innerText = ref('');
      const filterInput = ref<Nullable<HTMLElement>>(null);
      const focus = ref<boolean>(false);
      const filterData = reactive<FilterDataRT[]>([]);
      onMounted(() => {
        createOptionsMenu();
      });

      watch(innerText, () => {
        // let text = v.match(/([\u4e00-\u9fa5_a-zA-Z_0-9\\-]*)(:|：*)(=|!|<=|>=|<|>|.*)([0-9]*)/);
        createOptionsMenu();
      });

      const textArray = computed(() => {
        let str = unref(innerText).match(/([\u4e00-\u9fa5_a-zA-Z_0-9\\-]*)(:|：|!|<.|>.|=|.*)(.*)/);
        if (!str) str = ['', '', '', ''];
        return str;
      });

      watch(filterData, () => toOrm());

      function addFilterData(fd: FilterDataRT) {
        let el = unref(filterInput.value) as any;
        filterData.push(fd);
        el.innerText = '';
        innerText.value = el.innerText;
      }

      function toOrm() {
        // let obj: any = {
        //   aa: 1,
        // };
        let _and: any = {};

        if (filterData.length) {
          filterData.forEach((fd) => {
            if (_and.hasOwnProperty(fd.key)) {
              _and[fd.key].push(fd.value);
            } else {
              _and[fd.key] = [fd.value];
            }
          });
        }

        console.log(_and);
      }

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
        const vm = createVNode(Fmenu, {
          axis: { x: getParentLeft(filterInput.value), y: getParentTop(filterInput.value) + 34 },
          show: focus.value,
          onFinished,
          val: textArray.value,
          schemas: filtersConfig, // 可用查询的key 及配置
          data, // 当前表格数据，用于分析推荐值
          items: [
            {
              label: innerText.value,
              icon: 'ant-design:plus-outlined',
            },
          ],
        });
        render(vm, document.body);
      }

      function onFinished(e: FilterMenuItem) {
        let el = unref(filterInput.value) as any;

        if (e.type != FMIT.value && e.type != FMIT.operator) {
          switch (e.type) {
            case FMIT.key:
              el.innerText = e.label + ':';
              break;
            default:
              el.innerText += e.label;
              break;
          }
          // 修改div.input的innerText不会触发input事件
          // 更新记录的字符串
          innerText.value = el.innerText;
          getC(el);
          return;
        }
        switch (e.type) {
          case FMIT.value:
            let ta = unref(textArray);
            let a = el.innerText.split(ta[2]);
            a[1] = e.label;
            el.innerText = a.join(ta[2]);
            let kbj = findKey(filtersConfig, ta[1]);
            addFilterData({
              key: kbj.key,
              key_show: ta[1],
              linq: ta[2],
              value: e.label,
              value_show: e.label,
            });
            break;
          case FMIT.operator:
            break;
        }
        filterInput.value?.blur();
      }

      function handleDelete(i: number, e: any) {
        e.preventDefault();
        filterData.splice(i, 1);
        // delete filterData[i];
        console.log(filterData);
      }

      function onFilter() {
        const el = filterInput.value as any;
        getC(el);
      }

      function handlerUp(e: any) {
        e.preventDefault();
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
      function handleChange(pagination: any, filters: any, sorter: any) {
        console.log('Various parameters', pagination, filters, sorter);
      }
      return {
        handleChange,
        filterInput,
        filterData,
        onFilter,
        handlerUp,
        filtersConfig,
        innerText,
        handleInput,
        handleStart,
        handleEnd,
        handleBlur,
        handleFocus,
        handleDelete,
      };
    },
  });
</script>
<style lang="less" scoped>
  .slide-x-fade-enter-active {
    transition: all 0.1s ease-out;
  }

  .slide-x-fade-leave-active {
    transition: all 0.1s ease-out;
  }

  .slide-x-fade-enter-from,
  .slide-x-fade-leave-to {
    opacity: 0;
    transform: translateX(-20px);
  }

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
