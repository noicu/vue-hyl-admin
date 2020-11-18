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

export interface WObj {
  [key: string]: WhereExpression | number | string;
}

export interface WhereExpression {
  $gt?: number | string | Date;
  $gte?: number | string | Date;
  $lt?: number | string | Date;
  $lte?: number | string | Date;
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
