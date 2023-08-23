import { getFetch } from '@/utils/index'
import { IQiniuData, ITag,IArticle } from '@/utils/interface'
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
        }, lazy: true,server:false
    });
    return result as AsyncData<ITag, null>
}
export const getAllArticle = async (params:IArticle): Promise<AsyncData<IArticle, null>> => {
    const result = await getFetch('/article/list', params, {
        lazy: true
    });
    return result as AsyncData<IArticle, null>
}

