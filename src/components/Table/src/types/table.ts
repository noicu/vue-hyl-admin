import type { VNodeChild } from 'vue';
import type { PaginationProps } from './pagination';
import type { FormProps } from '/@/components/Form';
import type {
  ColumnProps,
  TableRowSelection as ITableRowSelection,
} from 'ant-design-vue/lib/table/interface';
import { ComponentType } from './componentType';
// import { ColumnProps } from './column';
export declare type SortOrder = 'ascend' | 'descend';
export interface TableCurrentDataSource<T = any> {
  currentDataSource: T[];
}

export interface TableRowSelection<T = any> extends ITableRowSelection {
  /**
   * 选定行更改时执行回调
   * @type Function
   */
  onChange?: (selectedRowKeys: string[] | number[], selectedRows: T[]) => any;

  /**
   * 选择或取消选择一行时执行回调
   * @type FunctionT
   */
  onSelect?: (record: T, selected: boolean, selectedRows: Object[], nativeEvent: Event) => any;

  /**
   * 选择或取消选择所有行时执行回调
   * @type Function
   */
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => any;

  /**
   * 反选时执行回调
   * @type Function
   */
  onSelectInvert?: (selectedRows: string[] | number[]) => any;
}

export interface TableCustomRecord<T> {
  record?: T;
  index?: number;
}

export interface ExpandedRowRenderRecord<T> extends TableCustomRecord<T> {
  indent?: number;
  expanded?: boolean;
}
export interface ColumnFilterItem {
  text?: string;
  value?: string;
  children?: any;
}

export interface TableCustomRecord<T = any> {
  record?: T;
  index?: number;
}

export interface SorterResult {
  column: ColumnProps;
  order: SortOrder;
  field: string;
  columnKey: string;
}

export interface RenderEditableCellParams {
  dataIndex: string;
  component?: ComponentType;
  componentProps?: any;
  placeholder?: string;
}

export interface FetchParams {
  searchInfo?: any;
  page?: number;
  sortInfo?: any;
  filterInfo?: any;
}

export interface GetColumnsParams {
  ignoreIndex?: boolean;
  ignoreAction?: boolean;
}

export type SizeType = 'default' | 'middle' | 'small' | 'large';

export interface TableActionType {
  reload: (opt?: FetchParams) => Promise<void>;
  getSelectRows: <T = any>() => T[];
  clearSelectedRowKeys: () => void;
  getSelectRowKeys: () => string[];
  deleteSelectRowByKey: (key: string) => void;
  setPagination: (info: Partial<PaginationProps>) => void;
  setTableData: <T = any>(values: T[]) => void;
  getColumns: (opt?: GetColumnsParams) => BasicColumn[];
  setColumns: (columns: BasicColumn[] | string[]) => void;
  getDataSource: <T = any>() => T[];
  setLoading: (loading: boolean) => void;
  setProps: (props: Partial<BasicTableProps>) => void;
  redoHeight: () => void;
  setSelectedRowKeys: (rowKeys: string[] | number[]) => void;
  getPaginationRef: () => PaginationProps | boolean;
  getSize: () => SizeType;
}

export interface FetchSetting {
  // 请求接口当前页数
  pageField: string;
  // 每页显示多少条
  sizeField: string;
  // 请求结果列表字段  支持 a.b.c
  listField: string;
  // 请求结果总数字段  支持 a.b.c
  totalField: string;
}

export interface TableSetting {
  redo?: boolean;
  size?: boolean;
  setting?: boolean;
  fullScreen?: boolean;
}

export interface BasicTableProps<T = any> {
  // 自定义排序方法
  sortFn?: (sortInfo: SorterResult) => any;
  // 取消表格的默认padding
  inset?: boolean;
  // 显示表格设置
  showTableSetting?: boolean;
  tableSetting?: TableSetting;
  // 斑马纹
  striped?: boolean;
  // 是否自动生成key
  autoCreateKey?: boolean;
  // 计算合计行的方法
  summaryFunc?: (...arg: any) => any[];
  // 是否显示合计行
  showSummary?: boolean;
  // 是否可拖拽列
  canColDrag?: boolean;
  // 是否树表
  isTreeTable?: boolean;
  // 接口请求对象
  api?: (...arg: any) => Promise<any>;
  // 请求之前处理参数
  beforeFetch?: Fn;
  // 自定义处理接口返回参数
  afterFetch?: Fn;
  // 查询条件请求之前处理
  handleSearchInfoFn?: Fn;
  // 请求接口配置
  fetchSetting?: FetchSetting;
  // 立即请求接口
  immediate?: boolean;
  // 在开起搜索表单的时候，如果没有数据是否显示表格
  emptyDataIsShowTable?: boolean;
  // 额外的请求参数
  searchInfo?: any;
  // 使用搜索表单
  useSearchForm?: boolean;
  // 表单配置
  formConfig?: Partial<FormProps>;
  // 列配置
  columns: BasicColumn[];
  // 是否显示序号列
  showIndexColumn?: boolean;
  // 序号列配置
  indexColumnProps?: BasicColumn;
  actionColumn?: BasicColumn;
  // 文本超过宽度是否显示。。。
  ellipsis?: boolean;
  // 是否可以自适应高度
  canResize?: boolean;
  // 自适应高度偏移， 计算结果-偏移量
  resizeHeightOffset?: number;

  // 在分页改变的时候清空选项
  clearSelectOnPageChange?: boolean;
  //
  rowKey?: string | ((record: any) => string);
  // 数据
  dataSource?: any[];
  // 标题右侧提示
  titleHelpMessage?: string | string[];
  // 表格滚动最大高度
  maxHeight?: number;
  // 是否显示边框
  bordered?: boolean;
  // 分页配置
  pagination?: PaginationProps | boolean;
  // loading加载
  loading?: boolean;

  /**
   * 要显示列
   * @default 'children'
   * @type string | string[]
   */
  childrenColumnName?: string | string[];

  /**
   * 覆盖默认表元素
   * @type object
   */
  components?: object;

  /**
   * 默认初始展开所有行
   * @default false
   * @type boolean
   */
  defaultExpandAllRows?: boolean;

  /**
   * 初始展开行key
   * @type string[]
   */
  defaultExpandedRowKeys?: string[];

  /**
   * 当前展开行key
   * @type string[]
   */
  expandedRowKeys?: string[];

  /**
   * 扩展行的渲染
   * @type Function
   */
  expandedRowRender?: (record?: ExpandedRowRenderRecord<T>) => VNodeChild | JSX.Element;

  /**
   * 自定义行展开图标
   * @type Function | VNodeChild
   */
  expandIcon?: Function | VNodeChild | JSX.Element;

  /**
   * 是否通过单击整行中的任意位置来展开行
   * @default false
   * @type boolean
   */
  expandRowByClick?: boolean;

  /**
   * 当expandIconAsCell为假时，expandIcon的索引将插入哪一列。 默认0
   */
  expandIconColumnIndex?: number;

  /**
   * 表格页脚渲染器
   * @type Function | VNodeChild
   */
  footer?: Function | VNodeChild | JSX.Element;

  /**
   * 缩进大小以像素为单位的树数据
   * @default 15
   * @type number
   */
  indentSize?: number;

  /**
   * i18n文本，包括过滤器，排序，空文本等
   * @default { filterConfirm: 'Ok', filterReset: 'Reset', emptyText: 'No Data' }
   * @type object
   */
  locale?: object;

  /**
   * 行的className
   * @type Function
   */
  rowClassName?: (record: TableCustomRecord<T>) => string;

  /**
   * 行选中配置
   * @type object
   */
  rowSelection?: TableRowSelection;

  /**
   * 设置水平或垂直滚动，也可以用于指定滚动区域的宽度和高度
   * 建议为x设置一个数字，如果要将其设置为true，您需要添加样式 .ant-table td {white-space：nowrap; }
   * @type object
   */
  scroll?: { x?: number | true; y?: number };

  /**
   * 是否显示表头
   * @default true
   * @type boolean
   */
  showHeader?: boolean;

  /**
   * 表格尺寸
   * @default 'default'
   * @type string
   */
  size?: SizeType;

  /**
   * 表格标题渲染器
   * @type Function | ScopedSlot
   */
  title?: VNodeChild | JSX.Element;

  /**
   * 定制页眉行
   * @type Function
   */
  customHeaderRow?: (column: ColumnProps, index: number) => object;

  /**
   * 定制行
   * @type Function
   */
  customRow?: (record: T, index: number) => object;

  /**
   * 表格元素的 table-layout 属性
   * 固定标题/列时使用 fixed ，或使用 column.ellipsis
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout
   * @version 1.5.0
   */
  tableLayout?: 'auto' | 'fixed' | string;

  /**
   * 表中下拉菜单的渲染容器
   * @param triggerNode
   * @version 1.5.0
   */
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;

  /**
   * 渲染之前可以再次更改数据。
   * 常规用户空数据的默认配置。
   * 您可以通过[ConfigProvider]（https://antdv.com/components/config-provider-cn/）进行全局配置
   *
   * @version 1.5.4
   */
  transformCellText?: Function;

  /**
   * 更改分页，过滤器或排序器时执行的回调
   * @param pagination
   * @param filters
   * @param sorter
   * @param currentDataSource
   */
  onChange?: (pagination: any, filters: any, sorter: any, extra: any) => void;

  /**
   * 单击行扩展图标时执行回调
   *
   * @param expanded
   * @param record
   */
  onExpand?: (expande: boolean, record: T) => void;

  /**
   * 扩展行更改时执行回调
   * @param expandedRows
   */
  onExpandedRowsChange?: (expandedRows: string[] | number[]) => void;
}

export interface BasicColumn extends ColumnProps {
  children?: BasicColumn[];

  //
  flag?: 'INDEX' | 'DEFAULT' | 'CHECKBOX' | 'RADIO' | 'ACTION';

  slots?: Indexable;
}
