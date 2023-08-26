import autoAnimate from "@formkit/auto-animate"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('auto-anim', {
    mounted: (el, binding) => {
      autoAnimate(el, binding.value || {});
    },
   // we can just return this as an empty object
    getSSRProps(binding, vnode) {
      return {}
    }
  })
})