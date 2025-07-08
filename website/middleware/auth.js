export default defineNuxtRouteMiddleware((to, from) => {
	const authCookie = useCookie('auth');
	if (!authCookie.value) {
		return navigateTo('/login');
	}
});
