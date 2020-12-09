export interface Result<T> {
  code: number;
  msg: string;
  data: T;
}

export interface GetListParams<T> {
  sort?: T;
  page_no: number;
  rows_per_page: number;
  where?: Where | WObj;
}

export interface ResultList<T> {
  data: Array<T>;
  page_no: number;
  pages_count: number;
  rows_count: number;
  rows_per_page: number;
  sort?: T;
  where?: Where | WObj;
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
