<template>
	<section id="experimental-banner" v-if="showExperimentalBanner">
		This website is in an experimental state and is a work in progress. Many things are unfinished, need polishing or may not work correctly!
		<XIcon @click="showExperimentalBanner = false" id="close-button" />
	</section>
	<header class="desktop">
		<div class="container">
			<section class="navigation">
				<div>
					<NuxtLink to="/">
						<img
							v-if="currentTheme === 'dark' || currentTheme === 'light'"
							src="~/assets/images/logo_banner.png"
							alt="The full-sized Modrunner logo banner"
							class="logo"
						/>
						<img
							v-else-if="currentTheme === 'halloween'"
							src="~/assets/images/logo_banner_halloween.png"
							alt="The full-sized Modrunner logo banner"
							class="logo"
						/>
						<img
							v-else-if="currentTheme === 'christmas'"
							src="~/assets/images/logo_banner_christmas.png"
							alt="The full-sized Modrunner logo banner"
							class="logo"
						/>
					</NuxtLink>
				</div>
				<nav>
					<NuxtLink class="link" to="/dashboard">Dashboard</NuxtLink>
					<NuxtLink class="link" to="/docs">Docs</NuxtLink>
					<NuxtLink class="link" to="/blog">Blog</NuxtLink>
				</nav>
			</section>
			<section class="user-controls">
				<NuxtLink to="/invite" target="_blank">Add to Server</NuxtLink>
				<button class="control-button button-transparent" title="Switch theme" @click="changeTheme">
					<SunIcon v-if="currentTheme === 'light'" />
					<MoonIcon v-else-if="currentTheme === 'dark'" />
					<SpiderIcon v-else-if="currentTheme === 'halloween'" />
					<ChristmasTreeIcon v-else-if="currentTheme === 'christmas'" />
				</button>
				<div
					v-if="auth.user.id"
					class="dropdown"
					:class="{ closed: !isDropdownOpen }"
					tabindex="0"
					@mouseover="isDropdownOpen = true"
					@focus="isDropdownOpen = true"
					@mouseleave="isDropdownOpen = false"
				>
					<button class="control" value="Profile Dropdown">
						<img class="user-icon" :src="`https://cdn.discordapp.com/avatars/${auth.user.id}/${auth.user.avatar}.png`" :alt="auth.user.username" />
					</button>
					<div class="content card">
						<div class="username">{{ auth.user.username }}</div>
						<hr class="divider" />
						<button class="item button-transparent" @click="logoutUser()">
							<LogOutIcon class="icon" />
							<span class="dropdown-item__text">Log out</span>
						</button>
					</div>
				</div>
				<NuxtLink v-else to="/login" class="sign-in-button">Sign In</NuxtLink>
			</section>
		</div>
	</header>
	<header id="site-header-mobile">
		<div id="menu-buttons" v-show="showMobileMenu === true">
			<div id="wrapper">
				<NuxtLink to="/dashboard" @click="showMobileMenu = !showMobileMenu">Dashboard</NuxtLink>
				<NuxtLink to="/docs" @click="showMobileMenu = !showMobileMenu">Docs</NuxtLink>
				<NuxtLink to="/blog" @click="showMobileMenu = !showMobileMenu">Blog</NuxtLink>
				<NuxtLink to="https://invite.modrunner.net">Add to Server</NuxtLink>
				<button @click="changeTheme">Change Theme</button>
				<NuxtLink to="/login" class="sign-in-button">Sign In</NuxtLink>
			</div>
		</div>
		<div id="display-wrapper">
			<NuxtLink to="/">
				<img src="~/assets/images/logo.png" alt="the modrunner logo" />
			</NuxtLink>
			<button @click="showMobileMenu = !showMobileMenu">
				<MenuIcon />
			</button>
		</div>
	</header>

	<main id="page-wrapper">
		<slot />
	</main>

	<footer id="site-footer">
		<section id="footer-wrapper">
			<div>
				<NuxtLink to="/">
					<img
						v-if="currentTheme === 'dark' || currentTheme === 'light'"
						src="~/assets/images/logo_banner.png"
						alt="The full-sized Modrunner logo banner"
						class="logo"
					/>
					<img
						v-else-if="currentTheme === 'halloween'"
						src="~/assets/images/logo_banner_halloween.png"
						alt="The full-sized Modrunner logo banner"
						class="logo"
					/>
					<img
						v-else-if="currentTheme === 'christmas'"
						src="~/assets/images/logo_banner_christmas.png"
						alt="The full-sized Modrunner logo banner"
						class="logo"
					/>
				</NuxtLink>
				<p>
					Modrunner is
					<NuxtLink :to="appConfig.links.github" class="anchor-link">open source</NuxtLink>.
				</p>
				<p>
					{{ runtimeConfig.public.owner }}/{{ runtimeConfig.public.slug }}
					<br />
					{{ runtimeConfig.public.branch }}@<NuxtLink
						:to="`https://github.com/${runtimeConfig.public.owner}/${runtimeConfig.public.slug}/tree/${runtimeConfig.public.hash}`"
						class="anchor-link"
					>
						{{ runtimeConfig.public.hash.substring(0, 7) }}
					</NuxtLink>
				</p>
				<p>&copy; {{ new Date().getFullYear() }} Modrunner</p>
			</div>
			<nav class="link-list">
				<h1>About Us</h1>
				<NuxtLink to="/about">About Modrunner</NuxtLink>
				<NuxtLink to="/legal/privacy-policy">Privacy Policy</NuxtLink>
				<NuxtLink to="/legal/terms-of-service">Terms of Service</NuxtLink>
			</nav>
			<nav class="link-list">
				<h1>Resources</h1>
				<NuxtLink to="/blog">Blog</NuxtLink>
				<NuxtLink to="/docs">Docs</NuxtLink>
				<NuxtLink :to="appConfig.links.roadmap">Roadmap</NuxtLink>
				<NuxtLink :to="appConfig.links.github">GitHub</NuxtLink>
				<NuxtLink :to="appConfig.links.statusPage">Status</NuxtLink>
			</nav>
			<nav class="link-list">
				<h1>Interact</h1>
				<NuxtLink :to="appConfig.links.discord">Discord</NuxtLink>
				<NuxtLink :to="appConfig.links.email">Email</NuxtLink>
				<NuxtLink :to="appConfig.links.mastodon">Mastodon</NuxtLink>
				<!--<NuxtLink :to="appConfig.links.twitter">Twitter</NuxtLink>-->
			</nav>
		</section>
	</footer>
</template>

<script setup>
import ChristmasTreeIcon from '~/assets/images/utils/christmas-tree.svg'
import MenuIcon from '~/assets/images/utils/menu.svg'
import MoonIcon from '~/assets/images/utils/moon.svg'
import LogOutIcon from '~/assets/images/utils/log-out.svg'
import SpiderIcon from '~/assets/images/utils/spider.svg'
import SunIcon from '~/assets/images/utils/sun.svg'
import XIcon from '~/assets/images/utils/x.svg'

let auth = await useAuth()
const appConfig = useAppConfig()
const runtimeConfig = useRuntimeConfig()

const themes = ref(['dark', 'light', 'halloween'])
const currentTheme = useCookie('color-theme', { maxAge: 315569520 })
if (!currentTheme.value) currentTheme.value = 'dark'

const showMobileMenu = ref(false)
const showExperimentalBanner = ref(false)
const isDropdownOpen = ref(false)

onMounted(() => {
	document.documentElement.classList.add(`${currentTheme.value}-mode`)
})

function changeTheme() {
	if (currentTheme.value === 'dark') {
		currentTheme.value = 'light'
		document.documentElement.classList.replace('dark-mode', 'light-mode')
	} else if (currentTheme.value === 'light') {
		currentTheme.value = 'halloween'
		document.documentElement.classList.replace('light-mode', 'halloween-mode')
	} else if (currentTheme.value === 'halloween') {
		currentTheme.value = 'christmas'
		document.documentElement.classList.replace('halloween-mode', 'christmas-mode')
	} else if (currentTheme.value === 'christmas') {
		currentTheme.value = 'dark'
		document.documentElement.classList.replace('christmas-mode', 'dark-mode')
	}
}

function logoutUser() {
	auth = {
		accessToken: '',
		headers: {},
		user: {
			id: '',
			username: '',
			avatar: '',
		},
	}
	const authCookie = useCookie('auth')
	authCookie.value = null
	return navigateTo('/', { external: true })
}
</script>

<style lang="scss">
#experimental-banner {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	background-color: red;
	padding: 0.5rem;

	#close-button {
		cursor: pointer;
	}
}

header.desktop {
	display: flex;
	justify-content: center;
	background-color: rgb(var(--color-bg-dark) / 0.7);
	backdrop-filter: blur(10px);
	position: sticky;
	top: 0;
	padding: 0.5rem 0;

	div.container {
		display: flex;
		width: 1280px;
	}

	@media screen and (max-width: 800px) {
		display: none;
	}

	section.navigation {
		display: flex;
		justify-content: space-around;
		align-items: center;
		gap: 2rem;
		padding: 0.5rem;

		nav {
			display: flex;
			gap: 2rem;
		}
	}

	a {
		color: var(--color-text);

		&:hover {
			color: var(--color-text-dark);
		}
	}

	section.user-controls {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;
		margin: 0 2rem;
		width: 100%;

		.control-button {
			color: var(--color-text);
			border: 2px solid transparent;
			border-radius: 2rem;
			box-sizing: border-box;
			display: flex;
			padding: 0.5rem;
			transition: filter 0.1s ease-in-out;

			svg {
				height: 1.25rem;
				width: 1.25rem;
			}
		}

		.dropdown {
			position: relative;

			.control {
				align-items: center;
				background: none;
				display: flex;
				justify-content: center;
				padding: 0;

				.user-icon {
					border-radius: 2rem;
					height: 2rem;
					width: 2rem;
					outline: 2px solid var(--color-bg-light);
					transition: outline-color 0.1s ease-in-out;
				}
			}

			.content {
				border: 1px solid var(--color-divider-dark);
				margin: 0.5rem 0 0 0;
				max-width: 25rem;
				min-width: 12rem;
				opacity: 0;
				padding: 1rem;
				position: absolute;
				right: -1rem;
				transform: scaleY(0.9);
				transform-origin: top;
				transition: all 0.1s ease-in-out 0.05s, color 0s ease-in-out 0s, background-color 0s ease-in-out 0s, border-color 0s ease-in-out 0s;
				visibility: hidden;
				width: max-content;
				z-index: 1;
				box-shadow: var(--shadow-floating);

				.divider {
					background-color: var(--color-divider-dark);
					border: none;
					color: var(--color-divider-dark);
					height: 1px;
					margin: 0.5rem 0;
				}

				.item {
					align-items: center;
					border-radius: 0.5rem;
					box-sizing: border-box;
					color: inherit;
					display: flex;
					padding: 0.5rem 0.75rem;
					width: 100%;

					.icon {
						margin-right: 0.5rem;
						height: 20px;
						width: 20px;
					}
				}
			}
		}

		.dropdown:hover .user-icon {
			outline-color: var(--color-brand);
		}

		.dropdown:hover:not(.closed) .content,
		.dropdown:focus:not(.closed) .content,
		.dropdown:focus-within:not(.closed) .content {
			opacity: 1;
			transform: scaleY(1);
			visibility: visible;
		}

		.sign-in-button {
			color: var(--color-brand);
			border: 1px solid var(--color-brand);
			border-radius: 5px;
			padding: 0.5rem 1rem;

			&:hover {
				background-color: rgba(10, 90, 114, 0.5);
			}
		}
	}
}

#site-header-mobile {
	position: absolute;
	bottom: 0;

	@media screen and (min-width: 800px) {
		display: none;
	}

	#menu-buttons {
		background-color: var(--color-bg);
		display: flex;
		justify-content: center;

		#wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			width: 75vw;

			> * {
				background-color: var(--color-bg-dark);
				padding: 0.5rem;
				margin: 0.25rem;
				border-radius: 20px;
				width: 100%;
				box-sizing: border-box;
			}

			.sign-in-button {
				border: 1px solid var(--color-brand);
			}
		}
	}

	#display-wrapper {
		background-color: var(--color-bg);
		display: flex;
		justify-content: space-between;
		width: 100vw;

		img {
			border-radius: 999999px;
			padding: 0.75rem;
			width: 2rem;
			height: 2rem;
		}

		button {
			background-color: transparent;

			svg {
				color: var(--color-text);
				padding: 0.75rem;
				width: 2rem;
				height: 2rem;
			}
		}
	}
}

#page-wrapper {
	box-sizing: border-box;
	min-height: calc(100vh - 370px);
}

#site-footer {
	background-color: var(--color-bg-dark);
	display: flex;
	justify-content: center;
	box-sizing: border-box;
	min-height: 300px;
	width: 100%;

	#footer-wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 5rem;
		margin: 2rem;
	}

	.link-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		a {
			color: var(--color-text);

			&:hover {
				color: var(--color-text-dark);
			}
		}
	}
}

.logo {
	height: 3rem;
}
</style>
