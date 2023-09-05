// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
import {baseurl} from './config'

export default defineNuxtConfig({
  vue: {
    compilerOptions: { isCustomElement: (tag:any) => tag.startsWith('wc-') }
  },
  site: {
    url: 'http://wintsa.club',
  },
  imports: {
    dirs: [
      'composables/api'
    ]
  },
 
  image: {
    cloudinary: {
      baseURL: "http://wintsa.club/",
    },
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiServeBase: baseurl,
    // Keys within public are also exposed client-side
    public: {
      QINIU_CDN_URL : 'http://wintsa.club/',
      apiBase: baseurl
    }
  },
  app: {
    // head
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: '懋鑫化工',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '当您寻找高质量化工产品的时候，欢迎访问我们的小型化工销售官网。我们提供广泛的化工产品，包括但不限于XX、XX和XX。以优越的质量和可靠的服务，我们致力于满足您的化工需求。立即浏览我们的官网，了解更多关于我们产品的信息。' },
        { name: 'keywords', content: '化工产品销售' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },

  // css
  css: ['~/assets/scss/index.scss','aos/dist/aos.css'],

  typescript: {
    strict: true,
    shim: false,
  },

  // build modules
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/color-mode',
    '@unocss/nuxt',
    '@nuxt/image',
    'nuxt-lodash',
    'nuxt-simple-sitemap',
    'nuxt-swiper'
    
  ],

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  // colorMode
  colorMode: {
    classSuffix: '',
  },


  vite: {

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/element/index.scss" as element;`,
        },
      },
      
    },
 
  },
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    themes: ['dark'],
  },
  plugins: [
   
  ],
})
