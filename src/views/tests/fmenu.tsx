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

import './index.less';
const prefixCls = 'filter-menu';
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
      const { schemas, val } = props;
      console.log(val);
      let its: Array<any> = [];
      if (val[1] === '') {
        its = [
          {
            label: '属性',
            type: 'title',
          },
          ...schemas.map((it) => ({ label: it.key_text })),
        ];
      }
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

    function handlerClick(el: any) {
      el.preventDefault();
    }

    function handlerUp() {
      props.onFinished();
    }

    function renderMenuItem() {
      return items.value.map((item, index) => {
        if (item.type == 'title') {
          return <li class="filter-menu-title">{item.label}</li>;
        }
        return (
          <li class="filter-menu-item" onMousedown={handlerClick} onMouseup={handlerUp}>
            {item.label}
          </li>
        );
      });
    }

    return () => {
      const { show } = props;
      if (!items.value.length) return null;
      return !show ? null : (
        <div class={[prefixCls]} ref={wrapRef} style={unref(getStyle)}>
          {renderMenuItem()}
        </div>
      );
    };
  },
});
