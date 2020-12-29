import { useGlobSetting } from '/@/hooks/setting';
import { getToken } from '/@/utils/auth';
import { isJSON } from '/@/utils/is';
import ReconnectingWebSocket from 'reconnectingwebsocket';

import { useMessage } from '/@/hooks/web/useMessage';

import { notifyMsgAck } from '/@/api/msg';

import router from '/@/router';
const WS_URL = useGlobSetting().wsUrl;

let WS: ReconnectingWebSocket | null = null;

export function initWs() {
  const jwt = getToken();
  if (!WS && jwt) {
    WS = new ReconnectingWebSocket(WS_URL + '?jwt=' + jwt);

    WS.onopen = function () {
      console.log('连接成功');
    };

    // WS.onmessage = function (this: ReconnectingWebSocket, event: MessageEvent) {
    //   if (isJSON(event.data)) {
    //     const { content, content_type } = JSON.parse(event.data) as WSMsgData<Notify>;
    //     console.log(content, content_type, '收到消息');
    //   } else {
    //     console.log(event, '未知类型消息');
    //   }
    // };

    WS.onmessage = function (
      this: ReconnectingWebSocket,
      event: ReconnectingWebSocket.MessageEvent
    ) {
      if (isJSON(event.data)) {
        const { content, content_type } = JSON.parse(event.data) as WSMsgData<Notify>;

        const { notification } = useMessage();

        notification.info({
          key: content.id,
          message: content.content.comment,
          description: content.create_date,
          duration: 60,
          onClick: () => {
            switch (content.content.code) {
              case 'broker_apply_handIn':
                router.push({ name: 'ApplyBroker' });
                break;
              case 'master_apply_handIn':
                router.push({ name: 'ApplyMaster' });
                break;
            }
            notifyMsgAck({
              id_list: [content.id],
            }).then(() => {
              notification.close(content.id);
            });
          },
        });
        console.log(content, content_type, '收到消息');
      } else {
        console.log(event, '未知类型消息');
      }
    };
  }
}

export function closeWS() {
  if (WS) WS.close();
  WS = null;
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
