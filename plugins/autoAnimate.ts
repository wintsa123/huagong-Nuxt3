import autoAnimate from "@formkit/auto-animate"

export default defineNuxtPlugin((nuxtApp:any) => {
  nuxtApp.vueApp.directive('auto-anim', {
    mounted: (el:any, binding:any) => {
      autoAnimate(el, binding.value || {});
    },
   // we can just return this as an empty object
    getSSRProps(binding:any, vnode:any) {
      return {}
    }
  })
})