export const useAuth = async () => {
	const auth = useState('auth', () => ({
		accessToken: '',
		headers: {},
		user: {
			id: '',
			username: '',
			avatar: '',
		},
	}))

	const authCookie = useCookie('auth')
	if (authCookie.value) {
		auth.value.accessToken = authCookie.value
		auth.value.headers = { authorization: `Bearer ${authCookie.value}` }

		if (!auth.value.user.id) {
			const { id, username, avatar } = await $fetch('https://discord.com/api/users/@me', { headers: auth.value.headers })

			auth.value.user = { id, username, avatar }
		}
	}

	return auth
}

export const getAuthUrl = () => {
	const config = useRuntimeConfig()
	const state = generateRandomString()

	const stateCookie = useCookie('state')
	stateCookie.value = state

	return `https://discord.com/api/oauth2/authorize?client_id=${config.public.discordClientId}&redirect_uri=${`${encodeURIComponent(
		config.public.baseUrl
	)}/login`}&response_type=code&scope=identify%20guilds&prompt=none&state=${encodeURIComponent(state)}`
}

function generateRandomString() {
	let randomString = ''
	const randomNumber = Math.floor(Math.random() * 10)

	for (let i = 0; i < 20 + randomNumber; i++) {
		randomString += String.fromCharCode(33 + Math.floor(Math.random() * 94))
	}

	return randomString
}
