import { TaskItem } from './types';
export const taskList: TaskItem[] = [
  {
    percent: 50,
    title: '开发任务一',
    updateTime: '2020.7.12',
    desc: '开发任务一简介',
    status: 'active',
  },
  {
    percent: 67,
    title: '开发任务二',
    updateTime: '2020.3.12',
    desc: '开发任务二简介',
    status: 'exception',
  },
  {
    percent: 100,
    title: '开发任务三',
    updateTime: '2020.4.12',
    desc: '开发任务三简介',

    status: 'success',
  },
];

export const randomizeArray = function (arg: any) {
  const array = arg.slice();
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export const sparklineData = [
  47,
  45,
  54,
  38,
  56,
  24,
  65,
  31,
  37,
  39,
  62,
  51,
  35,
  41,
  35,
  27,
  93,
  53,
  61,
  27,
  54,
  43,
  19,
  46,
];
