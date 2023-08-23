export default defineEventHandler(async(event) => {
    const result =await $fetch('http:127.0.0.1:3300/tag/list')
    return result
  })