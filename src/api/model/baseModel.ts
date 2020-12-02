export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T extends any> {
  items: T;
  total: number;
}

export interface Where {
  $and?: WObj;
  $or?: WObj[];
}

export type WObj = {
  [key in string | number]: WhereExpression | number | string;
};

export interface WhereExpression {
  $gt?: number | string | Date; // 大于
  $gte?: number | string | Date; // 大于等于
  $lt?: number | string | Date; // 小于
  $lte?: number | string | Date; // 小于等于
  $in?: any;
}

export interface ApiResult<T> {
  code: number;
  msg: string;
  data: T;
}

export interface ApiGetList<T> {
  sort?: T;
  page_no: number;
  rows_per_page: number;
  where?: Where | WObj;
}

export interface ApiResultList<T> {
  data: Array<T>;
  page_no: number;
  pages_count: number;
  rows_count: number;
  rows_per_page: number;
  sort?: T;
  where?: Where | WObj;
}
