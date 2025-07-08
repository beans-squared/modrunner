<template>
	<div id="doc-wrapper">
		<nav id="navigation-sidebar">
			<h1>Documentation</h1>
			<NuxtLink to="/docs">Introduction</NuxtLink>
			<NuxtLink to="/docs/faq">FAQ</NuxtLink>
			<h2>Commands</h2>
			<NuxtLink to="/docs/commands/search">/search</NuxtLink>
			<NuxtLink to="/docs/commands/track">/track</NuxtLink>
			<NuxtLink to="/docs/commands/untrack">/untrack</NuxtLink>
			<NuxtLink to="/docs/commands/list">/list</NuxtLink>
			<NuxtLink to="/docs/commands/settings">/settings</NuxtLink>
			<h2>Guides</h2>
			<NuxtLink to="/docs/guides/configuring-permissions">Configuring Permissions</NuxtLink>
			<NuxtLink to="/docs/guides/self-hosting">Self-Hosting</NuxtLink>
		</nav>

		<div id="doc-content-wrapper">
			<ContentDoc v-slot="{ doc }">
				<ContentRenderer :value="doc" />

				<div id="doc-outline-wrapper">
					<nav id="doc-outline">
						<div class="link" v-for="link in doc.body.toc.links" :key="link.id">
							<NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
							<NuxtLink class="child-link" v-if="link.children" v-for="childLink of link.children" :key="childLink.id" :to="`#${childLink.id}`">{{
								childLink.text
							}}</NuxtLink>
						</div>
					</nav>
				</div>
			</ContentDoc>
		</div>
	</div>
</template>

<style lang="scss">
#doc-wrapper {
	display: flex;
	gap: 3rem;

	#navigation-sidebar {
		position: fixed;
		background-color: var(--color-bg-dark);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		width: 16rem;
		padding: 1rem;
		margin: 1rem;

		h1,
		h2 {
			margin: 0;
		}

		h2 {
			font-size: 1.25rem;
		}

		a {
			margin-left: 1rem;
		}
	}

	#doc-content-wrapper {
		margin: 0 22rem;

		h1 a,
		h2 a,
		h3 a {
			color: var(--color-text);
		}

		img {
			width: 100%;
		}

		p {
			margin-left: 1rem;
		}
	}

	#doc-outline-wrapper {
		position: fixed;
		top: 4rem;
		right: 0;
		width: 16rem;
		padding: 1rem;
		margin: 1rem;

		#doc-outline {
			border-left: 1px solid var(--color-text);
			padding: 1rem;

			a {
				color: var(--color-text);
				font-size: 0.8rem;

				&:hover {
					color: var(--color-brand);
				}
			}

			.link {
				display: flex;
				flex-direction: column;
				padding: 0.125rem;
			}

			.child-link {
				margin-left: 2rem;
			}
		}
	}
}
</style>
