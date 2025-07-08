import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
	experimental: {
		appManifest: false,
	},
	app: {
		head: {
			htmlAttrs: {
				lang: 'en',
			},
			meta: [
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{
					charset: 'utf-8',
				},
				{
					name: 'description',
					content:
						'Modrunner levels up your Discord communities by providing a free and easy to use Discord bot that allows both creators and users to find, share and follow modding projects on some of the most popular platforms.',
				},
				{
					name: 'publisher',
					content: 'Modrunner',
				},
				{
					name: 'og:title',
					content: 'Modrunner',
				},
				{
					name: 'apple-mobile-web-app-title',
					content: 'Modrunner',
				},
				// {
				// 	name: 'theme-color',
				// 	content: '#ffffff'
				// },
				{
					name: 'color-scheme',
					content: 'dark light',
				},
				{
					name: 'og:description',
					content: 'The ultimate resource for modding communities',
				},
				{
					name: 'og:type',
					content: 'website',
				},
				{
					name: 'og:url',
					content: 'https://modrunner.net',
				},
				// {
				// 	name: 'og:image',
				// 	content:
				// },
				{
					name: 'twitter:card',
					content: 'summary',
				},
				{
					name: 'twitter:site',
					content: '@modrunnerbot',
				},
			],
			link: [{ rel: 'icon', href: './favicon.ico' }],
		},
	},
	build: {
		transpile: ['vue-sonner'],
	},
	content: {
		highlight: {
			theme: 'material-default',
		},
	},
	css: ['~/assets/styles/components.scss', '~/assets/styles/fonts.scss', '~/assets/styles/global.scss', '~/assets/styles/layout.scss'],
	modules: ['dayjs-nuxt', '@nuxt/content', 'floating-vue/nuxt'],
	runtimeConfig: {
		discordClientSecret: process.env.NUXT_DISCORD_CLIENT_SECRET ?? '',
		apiKey: process.env.NUXT_API_KEY ?? '',
		apiUrl: process.env.NUXT_API_URL ?? '',
		public: {
			discordClientId: process.env.NUXT_PUBLIC_DISCORD_CLIENT_ID ?? '',
			owner: 'modrunner',
			slug: 'website',
			branch: process.env.CF_PAGES_BRANCH ?? 'unknown',
			hash: process.env.CF_PAGES_COMMIT_SHA ?? 'unknown',
			baseUrl: getDomain(),
		},
	},
	vite: {
		plugins: [svgLoader()],
	},
})

function getDomain() {
	if (process.env.CF_PAGES_BRANCH === 'production') {
		return 'https://modrunner.net'
	} else if (process.env.CF_PAGES_BRANCH === 'staging') {
		return 'https://staging.modrunner.net'
	} else {
		return 'http://localhost:3000'
	}
}
