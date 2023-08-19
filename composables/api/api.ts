import { getFetch } from '@/utils/index'
import { IQiniuData } from '@/utils/interface'
interface IResponse<DataT> {
    code: number;
    data: DataT | null;
    message: string;
}
type AsyncData<DataT,ErrorT> = {
    data: Ref<DataT|IResponse<DataT>|null>
    pending: Ref<boolean>
    refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
    execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
    error: Ref<ErrorT | null>
}
interface AsyncDataExecuteOptions {
    dedupe?: boolean
}

//首页轮播图 客户端
export const getImg = async (prefix: string): Promise<AsyncData<IQiniuData,null>> => {
    const params = {
        prefix: prefix,
    };
    const result = await getFetch('/qiniu_data/listByprefix', params, { transform: (input: any) => { return input.data } } );
    return result as AsyncData<IQiniuData,null>

}
