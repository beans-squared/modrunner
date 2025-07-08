<template>
	<section class="landing-section">
		<div id="landing-text">
			<h1>The Ultimate Resource for Modding Communities</h1>
			<h2>
				Modrunner levels up your Discord communities by providing a free and easy to use Discord bot that allows both creators and users to find, share and
				follow modding projects on some of the most popular platforms.
			</h2>
			<div id="landing-buttons-container">
				<NuxtLink to="/invite" class="landing-button" target="_blank">Add to Your Server</NuxtLink>
				<NuxtLink to="/docs" class="landing-button">View the Docs</NuxtLink>
			</div>
			<section id="supported-platforms">
				<h3>Supported Platforms</h3>
				<div>
					<img src="~/assets/images/external/curseforge.png" alt="" v-tooltip="'CurseForge'" />
					<ModrinthIcon v-tooltip="'Modrinth'" />
				</div>
			</section>
		</div>
	</section>

	<section class="landing-section" id="stats-section">
		<div id="statistics">
			<div class="statistic">
				<h1>{{ pending || error ? '-' : stats.servers }}</h1>
				<p>Servers Across Discord</p>
			</div>
			<div class="statistic">
				<h1>{{ pending || error ? '-' : stats.projects }}</h1>
				<p>Modding Projects Tracked</p>
			</div>
			<div class="statistic">
				<h1>{{ pending || error ? '-' : (stats.uptime * 100).toFixed(2) }}%</h1>
				<p>Historical Uptime</p>
			</div>
		</div>
	</section>

	<section class="landing-section">
		<div id="feature-1">
			<div class="feature-container feature-text">
				<h1>Share Projects</h1>
				<p>
					<strong> The easiest way to find and share projects in Discord. </strong>
					Use Modrunner's commands built into Discord to simplify the process of retrieving information on your favorite modding projects.
				</p>
				<p>Skip the arduous process of opening up your browser and copy-pasting links into a text channel.</p>
			</div>
			<div class="feature-container feature-img">
				<img src="/img/search.png" alt="" />
			</div>
		</div>
	</section>

	<section class="landing-section" id="feature-2-section">
		<div id="feature-2">
			<div class="feature-container feature-img">
				<img src="/img/monitor.png" alt="" />
			</div>
			<div class="feature-container feature-text">
				<h1>Monitor Updates</h1>
				<p>
					<strong> Know exactly when your favorite projects recieve updates. </strong>
					Tracked projects are watched day and night for new file uploads, and Modrunner sends you notifications in Discord as soon as they're available for
					download.
				</p>
			</div>
		</div>
	</section>

	<section class="landing-section">
		<div id="feature-3">
			<div class="feature-container feature-text">
				<h1>Customize Everything</h1>
				<p>
					Make Modrunner your own by customizing numerous features like changelog length and notification style.
					<strong>Tailor the bot to suit your personal preferences.</strong>
				</p>
			</div>
			<div class="feature-container feature-img">
				<img src="/img/settings.png" alt="" />
			</div>
		</div>
	</section>

	<section class="landing-section">
		<div id="call-to-action">
			<h1>Are You Ready to Level Up Your Modding Community Today?</h1>
			<NuxtLink to="/dashboard" class="landing-button">Get Started</NuxtLink>
		</div>
	</section>
</template>

<script setup>
import ModrinthIcon from '~/assets/images/external/modrinth.svg'

useHead({ title: 'The Ultimate Resource for Modding Communities' })

const { data: stats, pending, error } = await useFetch('/api/stats')
</script>

<style lang="scss" scoped>
#stats-section {
	background-color: var(--color-bg-light);
	border-top: 1px solid var(--color-text);
	border-bottom: 1px solid var(--color-text);
}

#feature-2-section {
	background-color: var(--color-bg-dark);
}

.landing-section {
	display: flex;
	justify-content: center;

	#landing-text {
		width: 960px;
		text-align: center;

		h1 {
			font-size: 4rem;
			margin: 1rem 0;
		}

		h2 {
			font-size: 1.25rem;
			font-weight: var(--font-weight-regular);
			margin-bottom: 2rem;
		}

		#landing-buttons-container {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 1rem;

			.landing-button {
				color: var(--color-text);
				background-color: var(--color-brand);
				border-radius: 0.5rem;
				padding: 1.125rem;
				width: 180px;
				font-size: var(--font-size-medium);
				font-weight: var(--font-weight-medium);

				&:hover {
					background-color: var(--color-brand-dark);
				}
			}
		}

		#supported-platforms {
			margin: 2rem;

			div {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 1rem;
			}

			img,
			svg {
				color: #1bd96a;
				height: 2rem;
				width: 2rem;
			}
		}
	}

	#landing-img {
		margin-bottom: 4rem;

		img {
			width: 1280px;
			height: 720px;
		}
	}

	#statistics {
		display: flex;
		justify-content: space-around;
		width: 100%;
		padding: 2rem 0;

		.statistic {
			display: flex;
			flex-direction: column;
			align-items: center;

			h1 {
				font-size: var(--font-size-2extralarge);
				margin: 0;
			}

			p {
				font-size: var(--font-size-large);
				margin: 0;
			}
		}
	}

	#feature-1,
	#feature-2,
	#feature-3 {
		width: 1280px;
		display: flex;
		gap: 3rem;
		padding: 5rem;

		.feature-container {
			width: 50%;
		}

		.feature-text {
			display: flex;
			flex-direction: column;
			justify-content: center;

			h1 {
				font-size: var(--font-size-3extralarge);
				margin: 0;
			}

			p {
				font-size: var(--font-size-large);
			}
		}

		.feature-img {
			img {
				width: 100%;
				height: 100%;
			}
		}
	}

	#call-to-action {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		width: 720px;
		margin-bottom: 5rem;

		h1 {
			font-size: var(--font-size-2extralarge);
			margin-top: 0;
		}

		a {
			color: var(--color-text);
			background-color: var(--color-brand);
			border-radius: 0.5rem;
			padding: 1rem;
			font-weight: var(--font-weight-medium);

			&:hover {
				text-decoration: none;
			}
		}
	}
}
</style>
