import { defHttp } from '/@/utils/http/axios';

export enum MsgApi {
  /**
   * 系统通知消息--分页查询
   */
  NotifyMsgPage = '/yi/msg/NotifyMsgPage',

  /**
   * 系统通知消息--ask
   */
  NotifyMsgAck = '/yi/msg/NotifyMsgAck',
}

/**
 * 系统通知消息--分页查询
 */
export function notifyMsgPage(params: any) {
  return defHttp.request<any>({
    url: MsgApi.NotifyMsgPage,
    method: 'POST',
    params,
  });
}

/**
 * 系统通知消息--ask
 */
export function notifyMsgAck(params: any) {
  return defHttp.request<any>({
    url: MsgApi.NotifyMsgAck,
    method: 'POST',
    params,
  });
}
