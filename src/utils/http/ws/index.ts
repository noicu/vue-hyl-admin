import { useGlobSetting } from '/@/hooks/setting';
import { getToken } from '/@/utils/auth';
import { isJSON } from '/@/utils/is';

const WS_URL = useGlobSetting().wsUrl;

let WS: WebSocket | null = null;

export function initWs() {
  let jwt = getToken();
  if (!WS && jwt) {
    WS = new WebSocket(WS_URL + '?jwt=' + jwt);

    WS.onopen = function () {
      console.log('连接成功');
    };

    WS.onmessage = function (this: WebSocket, ev: MessageEvent<any>) {
      if (isJSON(ev.data)) {
        let { content, content_type } = JSON.parse(ev.data) as WSMsgData<Notify>;
        console.log(content, content_type, '收到消息');
      } else {
        console.log(ev, '未知类型消息');
      }
    };

    WS.onerror = function () {
      if (!jwt) return;
      initWs();
    };

    WS.onclose = function () {};
  }
}

export interface WSMsgData<T> {
  content: T;
  content_type: string | 'notify';
}

export interface Notify {
  ack: boolean;
  content: NotifyContent;
  create_date: string;
  create_date_int: number;
  id: string;
  to: number;
}

export interface NotifyContent {
  body: string;
  code: string | 'master_apply_handIn';
  comment: string;
}
