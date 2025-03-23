export default defineNuxtRouteMiddleware((to) => {
  // Immediately check auth before page renders
  if (process.client && !localStorage.getItem('token')) {
    if (to.path !== '/login') {
      return navigateTo('/login', { replace: true })
    }
  }
}) 