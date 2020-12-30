import { PropType } from 'vue';

export interface BasicProps {
  width: string;
  height: string;
}
export const basicProps = {
  width: {
    type: String as PropType<string>,
    default: '100%',
  },
  height: {
    type: String as PropType<string>,
    default: '280px',
  },
  data: {
    type: Array as PropType<Array<number>>,
    default: () => [0, 0, 0, 0],
  },
};
