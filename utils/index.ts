import type { NitroFetchRequest } from 'nitropack';
import fs from 'fs';

interface Options<DataT> {
  method?: 'get' | 'post';
  lazy?: boolean;
  headers?: Record<string, string> | [key: string, value: string][] | Headers;
  immediate?: boolean;
  default?: () => DataT;
  transform?: (input: DataT) => DataT;
  server?: boolean;
  // watch?: WatchSource[]

}

type AsyncData<DataT> = {
  data: Ref<IResponse<DataT>|null>
  pending: Ref<boolean>
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
}
interface AsyncDataExecuteOptions {
  dedupe?: boolean
}
interface IResponse<DataT> {
  code: number;
  data: Ref<DataT | null>;
  message: string;
}
//请求二次封装

export const getFetch = <T>( url:NitroFetchRequest, params:Record<string, any>|undefined, options? : Options<unknown>) => {
  // 接口传参要求
  const config = useRuntimeConfig();
  const myObject = {
    ...(options?.method !== undefined ? { method: options.method } : {}),
    ...(options?.method !== undefined && options?.method !== 'get'  ? { body: params } : {query:params}),
    ...(options?.lazy !== undefined ? { lazy: options.lazy } : {}),
    ...(options?.immediate !== undefined ? { immediate: options.immediate } : {}),
    ...(options?.default !== undefined ? { default: options.default } : {}),
    ...(options?.transform !== undefined ? { transform: options.transform } : {}),
    ...(options?.server !== undefined ? { server: options.server } : {}),
  };
  return useFetch(url, {
    // method此处仅仅只处理了get与post请求
    // ofetch库会自动识别请求地址，对于url已包含域名的请求不会再拼接baseURL
    baseURL: config.public.apiBase,
    headers: { 'Accept': 'application/json, text/plain, */*' },
    // onRequest相当于请求拦截
   
    // onResponse相当于响应拦截
    ...myObject,
    onResponse({ response }) {
      // 处理响应数据
      if (response._data.code!=200) {
        // 采用vant组件弹出报错弹窗
        // 处理服务端渲染时接口报错，可接入日志系统或者邮件系统，此处测试demo采取写入文件系统
        fs.writeFileSync('error.txt', `error url:${url}\n response:${response._data.message}\n`, { flag: 'a' });
      } else {
        // response._data = response._data.data;
      }
    },
    // onRequestError({ request, options, error }) {
    //   // 处理请求错误
    // },
    // onResponseError({ request, response, options }) {
    //   // 处理响应错误
    // },
  });
}
