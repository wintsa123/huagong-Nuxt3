//server/api/_sitemap-urls.ts
import {baseurl} from '@/config'
export default cachedEventHandler(
    async (e) => {
        const allArticle: any = await $fetch(baseurl+'/article/list')
        const allArticle2 = allArticle.data.rows.filter((e: any) => ![0, 1, 2, 3, 4, 5].includes(e.id))
        const posts = await Promise.all(allArticle2.map((e: any) => { let obj = { _path: `/Product/${e.id}`, modifiedAt: e.created_at }; return obj })
        );
        return posts.map((p) => {
            return {
                loc: p._path,
                lastmod: p.modifiedAt,
            };
        });
    },
    {
        name: 'sitemap-product-url',
        maxAge: 60 * 10, // cache URLs for 10 minutes
    }
);
