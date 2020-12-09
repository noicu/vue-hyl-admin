import { upload as uploadFile, compressImage } from 'qiniu-js';
import { UploadProgress } from 'qiniu-js/esm/upload';
import { buildUUID } from '/@/utils/uuid';

import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/@/utils/http/axios/types';
import { useGlobSetting } from '/@/hooks/setting';

const { uploadUrl = '' } = useGlobSetting();

enum Api {
  UPLOAD_TOKEN = '/yi/util/UploadToken', // 获取token
  VISIT_URL = '/yi/util/VisitURL', // 在客户端文件上传成功后调用 。key为上传成功后返回的文件名称
}

/**
 * @description: 上传
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params
  );
}

/**
 * @description:七牛云上传
 */
export async function upload(file: File, process?: (process: UploadProgress) => void) {
  const options = {
    quality: 0.92,
    noCompressIfLarger: true,
  };
  return new Promise(async (resolve, reject) => {
    const observer = {
      next(res: any) {
        process && process(res);
      },
      error(err: any) {
        reject(err);
      },
      async complete(res: any) {
        const data = await visitUrlForever(res.key);
        resolve(data);
      },
    };
    const { dist } = await compressImage(file, options);
    const token = await uploadToken(20);
    const observable = uploadFile(dist as File, buildUUID(), token);
    observable.subscribe(observer); // 上传开始
  });
}

/**
 * @description: token过期时间 ，以小时为单位
 */
export function uploadToken(expired: number) {
  return defHttp.request<string>({
    url: Api.UPLOAD_TOKEN,
    method: 'POST',
    params: { expired },
  });
}

/**
 * @description: 在客户端文件上传成功后调用,key为上传成功后返回的文件名称
 */
export function visitUrl(key: string, expired: number) {
  return defHttp.request<string>({
    url: Api.VISIT_URL,
    method: 'POST',
    params: { key, expired },
  });
}

/**
 * @description: 永久url,适用于 需要永久保存的如：用户头像，用户收藏夹内容等
 */
export function visitUrlForever(key: string) {
  return visitUrl(key, 2436550);
}
