import { getFetch } from '@/utils/index'
import { alovaInstance } from '@/utils/alova'

import { IQiniuData, ITag, IArticle, IFrontend ,ILink,IVisitorLog} from '@/utils/interface'
interface IResponse<DataT> {
    code: number;
    data: DataT | null;
    message: string;
}
type AsyncData<DataT, ErrorT> = {
    data: Ref<DataT | IResponse<DataT> | null>
    pending: Ref<boolean>
    refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
    execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
    error: Ref<ErrorT | null>
}
interface AsyncDataExecuteOptions {
    dedupe?: boolean
}

//首页轮播图 客户端
export const getImg = async (prefix: string): Promise<AsyncData<IQiniuData, null>> => {
    const params = {
        prefix: prefix,
    };
    const result = await getFetch('/qiniu_data/listByprefix', params, { transform: (input: any) => { return input.data } });
    return result as AsyncData<IQiniuData, null>
}
//tags管理
export const getTagList = async (): Promise<AsyncData<ITag, null>> => {
    const result = await getFetch('/tag/list', undefined, {
        transform: (input: any) => {
            input.data.rows.unshift({ id: 0, name: '所有产品', checked: true });
            return input.data.rows.map((item: { id: number, checked: boolean }) => {
                if (item.id !== 0) {
                    item.checked = false;
                }
                return item;
            })
        }, lazy: true
    });
    return result as AsyncData<ITag, null>
}
//普通文章接口
export const getAllArticle = async (params: IArticle): Promise<AsyncData<IArticle, null>> => {
    const result = await getFetch('/article/list', params, {
        lazy: true
    });
    return result as AsyncData<IArticle, null>
}

//文章alova管理
export const todoListGetter = (nowPage: any, pageSize: any, types?: any, tags?: any) => {
    let params = { nowPage, pageSize, types, tags }
    if (String(tags.value).length < 1) {
        params = Object.assign({}, params);
        delete params.tags;
    }
    return alovaInstance.Get('/article/list', {
        params: params,
        transformData: (input: any) => {
            input.rows = input.rows.map((item: any) => {
                item.openWindow = false;
                return item;
            })
            return input
        },
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

//通过id
export const getArticleById = async (id: number): Promise<AsyncData<IArticle, null>> => {
    const result = await getFetch(`/article/find/${id}`, undefined, {
        transform: (input: any) => {
            input.data.updated_at = input.data.updated_at.split(' ')[0]
            return input.data
        }
    });
    return result as AsyncData<IArticle, null>
}
//通过types
export const ArticleType = async (typename: string): Promise<AsyncData<IArticle, null>> => {
    const result = await getFetch(`/article/type`, { typename }, {
        transform: (input: any) => {
            let tmp = { ...input.data.rows[0] }
            if (!tmp.content) {
                tmp.content = ''
            }
            return tmp
        }

    });
    return result as AsyncData<IArticle, null>
}

import * as _ from "lodash";
//前端设置
export const getSetting = async (): Promise<AsyncData<IFrontend, null>> => {
    const result = await getFetch(`/frontend/detail`, undefined, {
        transform: (input: any) => {
            const transformedData = _.mapValues(input.data, item => {
                // 将 "value" 属性为 "1" 的项转换为 true，"0" 转换为 false
                if (item.value !== undefined && (item.value === "0" || item.value === "1")) {
                    item.value= !!Number(item.value)  // 将 value 转换为布尔类型
                }
                return item;

            });
            return transformedData;
        }
    });
    return result as AsyncData<IFrontend, null>;
};
//格式化友链
export const getFriend = async (): Promise<AsyncData<ILink, null>> => {
    const result = await getFetch(`/link/list`, undefined, {
        transform: (input: any) => {
            
            return input.data.rows;
        }
    });
    return result as AsyncData<ILink, null>;
};

//发送游客登记
export const vistitLog = async (): Promise<AsyncData<IVisitorLog, null>> => {
    const result = await getFetch(`/visitor_log/create`, undefined, {
        method:'post',
        lazy:true,
        server:false
    });
    return result as AsyncData<IVisitorLog, null>;
};
//关键词搜索
export const articleByKeyWord = async (keyWord:string): Promise<AsyncData<IArticle, null>> => {
    const result = await getFetch(`/article/keyword_list`, {keyWord}, {
        lazy:true,
        transform: (input: any) => {
            return input.data.rows;
        }
    });
    return result as AsyncData<IArticle, null>;
};

