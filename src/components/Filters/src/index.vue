<template>
  <div class="filter">
    <div class="filter-exposed-container"></div>
    <div class="filter-icon" @click="onFilter">
      <Icon icon="mdi:filter-variant" size="20" />
    </div>
    <div class="filter-edit-area" @click="onFilter">
      <div class="filter-chip-list">
        <transition-group name="slide-x-fade" appear>
          <div class="filter-chip-content" v-for="(it, i) in filterData" :key="it.id">
            <div class="filter-chip-text-content">
              <div class="filter-chip-text-key">{{ it.label }}</div>
              <div class="filter-chip-text-linq">{{ it.linq }}</div>
              <div class="filter-chip-text-value">{{ it.placeholder || it.value }}</div>
            </div>
            <div class="filter-chip-close" @click.stop="(e) => handleDelete(i, e)">
              <Icon icon="mdi:close-circle-outline" />
            </div>
          </div>
        </transition-group>

        <div class="filter-input-container">
          <div class="filter-input">
            <div
              ref="filterInput"
              class="input"
              contenteditable
              :placeholder="placeholder"
              spellcheck="false"
              autocapitalize="none"
              tabindex="0"
              @input="handleInput"
              @compositionstart="handleStart"
              @compositionend="handleEnd"
              @blur="handleBlur"
              @focus="handleFocus"
              @keydown="handleAdd"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <a-popover title="查询">
      <template #content>
        <div>使用属性来创建细化过滤条件的查询，</div>
        <div>以缩小搜索结果范围。</div>
        <div>
          <span>示例：</span>
          <div class="filter-chip-content">
            <div class="filter-chip-text-content">
              <div class="filter-chip-text-key">名称</div>
              <div class="filter-chip-text-linq">:</div>
              <div class="filter-chip-text-value">张三</div>
            </div>
            <div class="filter-chip-close">
              <Icon icon="mdi:close-circle-outline" />
            </div>
          </div>
        </div>
        <div>在过滤条件查询之间添加 OR 可搜索多个字词。</div>
        <div>
          <span>示例：</span>
          <div class="filter-chip-content">
            <div class="filter-chip-text-content">
              <div class="filter-chip-text-key">名称</div>
              <div class="filter-chip-text-linq">:</div>
              <div class="filter-chip-text-value">张三</div>
            </div>
            <div class="filter-chip-close">
              <Icon icon="mdi:close-circle-outline" />
            </div>
          </div>
          <div class="filter-chip-content">
            <div class="filter-chip-text-content">
              <div class="filter-chip-text-key"></div>
              <div class="filter-chip-text-linq">或</div>
              <div class="filter-chip-text-value"></div>
            </div>
            <div class="filter-chip-close">
              <Icon icon="mdi:close-circle-outline" />
            </div>
          </div>
          <div class="filter-chip-content">
            <div class="filter-chip-text-content">
              <div class="filter-chip-text-key">名称</div>
              <div class="filter-chip-text-linq">:</div>
              <div class="filter-chip-text-value">李四</div>
            </div>
            <div class="filter-chip-close">
              <Icon icon="mdi:close-circle-outline" />
            </div>
          </div>
        </div>
      </template>
      <div class="filter-icon filter-clear-icon">
        <Icon icon="mdi:help-circle-outline" size="20" />
      </div>
    </a-popover>
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
  import { buildUUID } from '/@/utils/uuid';

  export default defineComponent({
    components: { Icon },
    props,
    setup({ filtersConfig, dataSource: data, placeholder }) {
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

      function addFilterData(fd: Omit<FilterDataRT, 'id'>) {
        let fds: FilterDataRT = { ...fd, id: buildUUID() };
        let el = unref(filterInput.value) as any;
        filterData.push(fds);
        el.innerText = '';
        innerText.value = el.innerText;
      }

      function handleAdd(e: any) {
        if (e.keyCode == 13) {
          e.preventDefault();
        }
        if (e.keyCode == 8 && !e.target.innerText && filterData.length) {
          filterData.splice(filterData.length - 1, 1);
          console.log(e);
        }
      }

      watch(
        () => unref(data),
        (v) => {
          console.log(v, '==========');
        }
      );

      function toOrm() {
        createOptionsMenu();

        // let obj: any = {
        //   aa: 1,
        // };
        let _and: any = {};

        if (filterData.length) {
          filterData.forEach((fd) => {
            if (_and.hasOwnProperty(fd.field)) {
              _and[fd.field].push(fd.value);
            } else {
              _and[fd.field] = [fd.value];
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
              field: kbj.field,
              label: ta[1],
              linq: ta[2],
              value: e.label,
              placeholder: e.label,
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
        handleAdd,
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
        placeholder,
      };
    },
  });
</script>
<style lang="less" scoped>
  p {
    padding: 0;
    margin: 0;
  }

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
    flex: 1;

    &-exposed-container {
      display: inline-flex;
      align-self: flex-start;
      margin-top: 8px;
      flex-grow: 1;
    }

    &-icon {
      display: inline-block;
      width: 34px;
      height: 34px;
      // margin: 1px 4px 1px 19px;
      line-height: 34px;
      text-align: center;
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
        line-height: 21px;
        fill: white;
        color: white;
        word-break: break-word;
        cursor: default;
        background-color: rgb(2, 143, 251);
        border-width: 0;
        border-radius: 10px;
        outline: none;
        align-items: center;
        box-sizing: border-box;
      }

      &-text {
        &-key {
          display: inline-block;
          color: rgba(255, 255, 255, 0.76);
        }

        &-linq {
          display: inline-block;
          padding: 0 5px;
          text-align: center;
          cursor: pointer;

          &:hover {
            background: #ffffff36;
          }
        }

        &-value {
          display: inline-block;
        }
      }

      &-close {
        margin-left: 5px;
        // line-height: 21px;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;

        &:hover {
          color: rgba(255, 255, 255);
        }
      }
    }

    &-clear-icon {
      // width: 24px;
      // height: 24px;
      // padding: 0;
      // line-height: 24px;
    }
  }
</style>
