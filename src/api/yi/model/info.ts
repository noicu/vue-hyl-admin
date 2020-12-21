export enum Api {
  REG_USER_STATS = '/yi/user/RegUserStats', // 统计用户注册数据------B+S
  REG_MASTER_STATS = '/yi/user/RegMasterStats', // 统计大师注册数据------B+S
}

export interface RegStatsParams {
  start_date: string;
  end_date: string;
  calc_by: string;
  broker_id: number;
}
export interface RegStatsResult {
  c: number;
  t: number;
}
