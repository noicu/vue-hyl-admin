import {
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  computed,
  ref,
  unref,
  watch,
  onUnmounted,
} from 'vue';

import { props } from './props';
import { Divider } from 'ant-design-vue';

import './index.less';
import { findPos } from '/@/utils';
const prefixCls = 'filter-menu';

interface FilterDataRT {
  key: string;
  key_show: string;
  linq: '>' | '<' | '>=' | '<=' | '=';
  value: string;
  value_show: string;
}
enum FMIT {
  title,
  key,
  value,
  operator,
}

interface FilterMenuItem {
  label: string;
  type: FMIT;
  pos?: Array<string | JSX.Element>;
}

export default defineComponent({
  name: 'ContextMenu',
  props,
  setup(props) {
    const wrapRef = ref<Nullable<HTMLDivElement>>(null);
    // const items = ref<Array<any>>([]);

    onUnmounted(() => {
      const el = unref(wrapRef);
      el && document.body.removeChild(el);
    });

    function analysis() {
      // const { schemas, val } = props;
      // console.log(val);
      // schemas.forEach((it) => {
      //   items.value.push({
      //     label: it.key_text,
      //     value: '',
      //   });
      //   console.log(it);
      // });
    }

    const items = computed(() => {
      const { schemas, val, data } = unref(props);
      console.log(val);
      let its: Array<FilterMenuItem> = [];
      if (val[1] === '') {
        its = [
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
          ...schemas.map((it) => ({ label: it.key_text, type: FMIT.key, value: it.key })),
        ];
      }
      if (val[1] != '' && val[2] == '') {
        its = [
          {
            label: '属性',
            type: FMIT.title,
          },
          ...schemas
            .filter((it) => it.key_text.indexOf(val[1]) !== -1)
            .map((it) => ({
              label: it.key_text,
              type: FMIT.key,
              value: it.key,
              pos: getPos(it.key_text, val[1]),
            })),
        ];
      }
      if (val[2] != '') {
        its = [
          {
            label: '属性',
            type: FMIT.title,
          },
          ...data
            .filter((it) => it[val[1]] && it[val[1]] != '')
            .map((it, i) => ({ label: it[val[1]], type: FMIT.key, value: it[val[1]] })),
        ];
      }
      console.log(its);
      return its;
    });

    const getStyle = computed(() => {
      const { axis } = props;
      const { x, y } = axis || { x: 0, y: 0 };
      const menuHeight = (items.value || []).length * 24;
      const menuWidth = 180;
      const body = document.body;
      return {
        left: (body.clientWidth < x + menuWidth ? x - menuWidth : x) + 'px',
        top: (body.clientHeight < y + menuHeight ? y - menuHeight : y) + 'px',
      };
    });

    function handlerItemClick(e: MouseEvent) {
      e.preventDefault();
    }

    function handlerItemUp(it: any) {
      console.log('handlerItemUp');
      props.onFinished(it);
    }

    // 消除点击失去焦点事件
    function handlerStoppage(e: MouseEvent) {
      e.preventDefault();
    }

    function renderMenuItem() {
      let itemss = unref(items);
      console.log(itemss);
      return itemss.map((item, index) => {
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
          case FMIT.key:
            return (
              <li
                class="filter-menu-item"
                onMousedown={handlerItemClick}
                onMouseup={(e: MouseEvent) => handlerItemUp(item)}
              >
                {item.pos ? item.pos : item.label}
              </li>
            );
        }
      });
    }

    function getPos(source: string, str: string) {
      let ff = '-^`*-';
      return source
        .replace(new RegExp(str, 'g'), ff + str + ff)
        .split(ff)
        .map((it) => (it == str ? <span class="filter-menu-high">{str}</span> : it));
    }

    return () => {
      const { show } = props;
      console.log(items);
      if (!items.value.filter((it) => it.type !== FMIT.title).length) return null;
      return !show ? null : (
        <div class={[prefixCls]} ref={wrapRef} style={unref(getStyle)}>
          {renderMenuItem()}
        </div>
      );
      // return (
      //   <div class={[prefixCls]} ref={wrapRef} style={unref(getStyle)}>
      //     {renderMenuItem()}
      //   </div>
      // );
    };
  },
});
