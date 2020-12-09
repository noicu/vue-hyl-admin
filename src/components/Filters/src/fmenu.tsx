import { defineComponent, computed, ref, unref, onUnmounted, Transition } from 'vue';

import { fmenuProps as props } from './props';
import { Divider } from 'ant-design-vue';

import './index.less';
import { FilterMenuItem, FMIT } from './types';
import { findKey } from './utils';
import { unique } from '/@/utils';
const prefixCls = 'filter-menu';

export default defineComponent({
  name: 'ContextMenu',
  props,
  emits: ['finished'],
  setup(props, { emit }) {
    const wrapRef = ref<Nullable<HTMLDivElement>>(null);

    onUnmounted(() => {
      const el = unref(wrapRef);
      el && document.body.removeChild(el);
    });

    const items = computed(() => {
      const { schemas, val } = unref(props);
      if (val[1] === '') {
        return [
          {
            label: '运算符',
            type: FMIT.title,
          },
          {
            label: '或',
            type: FMIT.operator,
          },
          {
            label: '属性',
            type: FMIT.title,
          },
          ...schemas.map((it) => ({ label: it.label, type: FMIT.key })),
        ] as FilterMenuItem[];
      }
      if (val[1] != '' && val[2] == '') {
        return [
          {
            label: '属性',
            type: FMIT.title,
          },
          ...schemas
            .filter((it) => it.label.indexOf(val[1]) !== -1)
            .map((it) => ({
              label: it.label,
              type: FMIT.key,
              pos: getPos(it.label, val[1]),
            })),
        ] as FilterMenuItem[];
      }
      if (val[2] != '') {
        return [
          {
            label: '属性',
            type: FMIT.title,
          },
          ...searchValue(),
        ] as FilterMenuItem[];
      }
      return [];
    });

    function searchValue(): FilterMenuItem[] {
      const { schemas, val, data } = unref(props);
      const field: any = findKey(schemas, val[1])?.field;
      const arr = [];
      if (field != null) {
        let label;
        const bol = val[3] == '';

        for (let i = 0; i < data.length; i++) {
          label = data[i][field];
          if (label && label != '' && (bol || label.indexOf(val[3]) !== -1)) {
            arr.push({ label, type: FMIT.value, pos: getPos(label, val[3]) });
          }
        }
      }
      return unique(arr, 'label');
    }

    const getStyle = computed(() => {
      const { axis, val } = props;
      let x = axis.x || 0;
      const y = axis.y || 0;
      if (val[2] != '') x += val[1].replace(/[\u0391-\uFFE5]/g, 'aa').length * 8;
      const menuHeight = (items.value || []).length * 24;
      const menuWidth = 180;
      const body = document.body;
      return {
        // 判断 位置加组件宽度 是否大于屏幕宽度
        left: (body.clientWidth < x + menuWidth ? x - menuWidth : x) + 'px',
        top: (body.clientHeight < y + menuHeight ? y - menuHeight : y) + 'px',
      };
    });

    function handlerItemClick(e: MouseEvent) {
      e.preventDefault();
    }

    function handlerItemUp(it: FilterMenuItem) {
      emit('finished', it);
    }

    // 消除点击失去焦点事件
    function handlerStoppage(e: MouseEvent) {
      e.preventDefault();
    }

    function renderMenuItem() {
      return unref(items).map((item) => {
        if (!item) return null;
        switch (item.type) {
          case FMIT.title:
            return (
              <li class="filter-menu-title" onMousedown={handlerStoppage}>
                {item.label}
                <Divider />
              </li>
            );
          case FMIT.operator:
            return (
              <li class="filter-menu-operator">
                {item.label}
                <Divider />
              </li>
            );
        }
        return (
          <li
            class="filter-menu-item"
            onMousedown={handlerItemClick}
            onMouseup={() => handlerItemUp(item)}
          >
            {item.pos && item.pos.length ? item.pos : item.label}
          </li>
        );
      });
    }

    function getPos(source: string, str: string) {
      if (!str || !source) return [];
      const ff = '-^`*-';
      return source
        .replace(new RegExp(str, 'g'), ff + str + ff)
        .split(ff)
        .map((it) => (it == str ? <span class="filter-menu-high">{str}</span> : it));
    }

    return () => {
      const { show } = props;
      // return (
      //   <div class={[prefixCls]} ref={wrapRef} style={unref(getStyle)}>
      //     {renderMenuItem()}
      //   </div>
      // );

      // if (!items.value.filter((it) => it.type !== FMIT.title).length) return null;
      return (
        <Transition name="slide-fade">
          {!items.value.filter((it) => it.type !== FMIT.title).length || !show ? null : (
            <div class={[prefixCls]} ref={wrapRef} style={unref(getStyle)}>
              {renderMenuItem()}
            </div>
          )}
        </Transition>
      );
    };
  },
});
