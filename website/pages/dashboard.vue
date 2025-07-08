<template>
	<div id="dashboard">
		<section id="sidebar" class="rounded-container">
			<h1>Your Servers</h1>
			<input v-model.trim="searchInput" id="server-search-input" type="text" name="server-search" placeholder="Search for a server" />
			<div id="checkbox-container">
				<input type="checkbox" id="show-managed-guilds-checkbox" name="show-managed-guilds-checkbox" v-model="showOnlyManagedGuilds" />
				Only show servers you manage
			</div>
			<div id="checkbox-container">
				<input type="checkbox" id="show-present-guilds-checkbox" name="show-present-guilds-checkbox" v-model="showOnlyPresentGuilds" />
				Only show servers Modrunner is present in
			</div>
			<nav id="server-navlist-buttons" v-if="!awaitingGuildData">
				<!-- server items go here -->
				<button
					v-for="guild in userGuilds"
					v-show="new RegExp(`${searchInput}`, 'i').test(guild.name)"
					:key="guild.id"
					@click="selectGuild(guild)"
					class="server-nav-button"
					:class="{ selected: selectedGuild.id === guild.id }"
				>
					<img :src="computedGuildIcon(guild)" v-if="guild.icon !== ''" />
					<div v-else class="image-placeholder"></div>
					<span>{{ guild.name }}</span>
				</button>
			</nav>
			<p v-else>The servers that you manage will appear here.</p>
		</section>
		<section id="information-panels" v-if="selectedGuild !== ''">
			<div id="server-name-title">
				<div>
					<img :src="computedGuildIcon(selectedGuild)" />
					<h1>{{ selectedGuild.name }}</h1>
				</div>
				<div>
					<button @click="openTrackProjectModal()" v-show="(selectedGuild.permissions & 0x20) == 0x20">
						<PlusIcon class="plus-icon" />
						Track Project
					</button>
				</div>
			</div>
			<div v-if="selectedGuild.isBotPresent">
				<div id="navigation-bar">
					<button @click="selectedTab = 0" :class="{ selected: selectedTab === 0 }">Tracked Projects</button>
					<button @click="selectedTab = 1" :class="{ selected: selectedTab === 1 }">Bot Settings</button>
				</div>
				<div id="tracked-projects-panel" class="rounded-container info-panel" v-if="selectedTab === 0">
					<Suspense>
						<div id="channels">
							<div v-for="channel of selectedGuild.projectChannels" v-if="selectedGuild.projectChannels.length > 0" :key="channel" class="channel-container">
								<div class="title">
									<h1>#{{ channel.name }}</h1>
									<h2>{{ channel.projects.length }} PROJECTS</h2>
								</div>
								<div class="body">
									<div class="headings">
										<span>Name</span>
										<span>Platform</span>
										<span>Id</span>
										<span>Last Updated</span>
										<span>Notification Roles</span>
									</div>
									<div class="projects-container">
										<button
											v-for="project of channel.projects"
											:key="project"
											class="project button-transparent"
											@click="openProjectEditModal(project, channel)"
											:disabled="(selectedGuild.permissions & 0x20) !== 0x20"
										>
											<p>{{ project.name }}</p>
											<p>{{ project.platform }}</p>
											<p>{{ project.id }}</p>
											<p>
												{{ new Date(project.dateUpdated).toDateString() }}
											</p>
											<p>
												<span
													class="role-id"
													v-for="roleId of project.roleIds"
													:style="`color: ${selectedGuild.roles.find((role) => role.id === roleId).color};`"
												>
													{{ selectedGuild.roles.find((role) => role.id === roleId).name }}
												</span>
											</p>
										</button>
									</div>
								</div>
							</div>
							<div v-else>You aren't currently tracking any projects in this server.</div>
						</div>
						<template id="channels" #fallback>Loading projects...</template>
					</Suspense>
				</div>
				<div id="bot-settings-panel" class="rounded-container info-panel" v-else-if="selectedTab === 1">
					<div id="cols">
						<div id="left-col">
							<!--<h2>General Settings</h2>
							<div>
								<p>Log Channel</p>
								<InfoIcon v-tooltip="'Used for system messages and news about Modrunner.'" />
							</div>
							<select disabled>
								<option v-for="channel of selectedGuild.channels" :key="channel" :value="channel.id">#{{ channel.name }}</option>
							</select>-->

							<h2>Tracked Projects Settings</h2>
							<p>Maximum Characters for Changelogs</p>
							<input type="text" :value="selectedGuild.settings.changelogLength" @focusout="saveMaxChars($event)" :disabled="(selectedGuild.permissions & 0x20) !== 0x20"/>
							<p>Notification Style</p>
							<select @change="saveNotificationStyle($event)" :disabled="(selectedGuild.permissions & 0x20) !== 0x20">
								<option value="normal" :selected="selectedGuild.settings.notificationStyle === 'normal' ? true : false">Normal</option>
								<option value="alt" :selected="selectedGuild.settings.notificationStyle === 'alt' ? true : false">Normal - Alternate</option>
								<option value="compact" :selected="selectedGuild.settings.notificationStyle === 'compact' ? true : false">Compact</option>
								<!--<option value="custom" :selected="selectedGuild.settings.notificationStyle === 'custom' ? true : false">Custom</option>-->
								<option value="ai" :selected="selectedGuild.settings.notificationStyle === 'ai' ? true : false">AI Generated (Beta)</option>
							</select>
						</div>
						<div id="right-col">
							<!--<h2>Custom Style Editor</h2>
							<textarea disabled></textarea>
							<p>
								Only applies when the notification style is set to "Custom".
								<NuxtLink to="https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-"
									>Supports Discord-style markdown.</NuxtLink
								>
							</p>
							<h3>Available Variables</h3>
							<p><code>$project_name</code> - The name of the project</p>
							<p><code>$project_id</code> - The ID of the project</p>
							<p><code>$project_platform</code> - The name of the platform where the project is hosted</p>
							<p><code>$version_name</code> - The name of the new version</p>
							<p><code>$version_number</code> - The number of the new version</p>
							<p><code>$version_id</code> - The ID of the new version</p>
							<p><code>$version_changelog</code> - The changelog of the new version</p>
							<p><code>$version_date</code> - The timestamp at when the new version was published</p>-->
						</div>
					</div>
				</div>
			</div>
			<div v-else class="rounded-container info-panel">
				Modrunner is not currently present in this server.
				<NuxtLink to="/invite" target="_blank"> Get started by inviting it. </NuxtLink>
			</div>
		</section>
		<p v-else>Select a server from the sidebar on the left to get started.</p>

		<Modal
			class="dashboard-modal"
			id="edit-project-modal"
			v-show="showProjectEditModal"
			title="Edit tracked project"
			@closeModal="showProjectEditModal = false"
			:buttons="[
				{
					text: 'UNTRACK',
					class: 'button-danger',
					eventHandler: untrackProject,
				},
				{
					text: 'SAVE CHANGES',
					class: 'button-primary',
					eventHandler: editProject,
				},
			]"
		>
			<div class="track-project-modal-item">
				<label for="project-name">Project name</label>
				<input type="text" name="project-name" :value="editingProjectData.name" disabled />
			</div>

			<div class="track-project-modal-item">
				<label for="project-id">Project ID</label>
				<input type="text" name="project-id" :value="editingProjectData.id" disabled />
			</div>

			<div class="track-project-modal-item">
				<label for="project-platform">Project platform</label>
				<input type="text" name="project-platform" :value="editingProjectData.platform" disabled />
			</div>

			<div class="track-project-modal-item">
				<label for="project-channel">Channel</label>
				<select name="project-channel" v-model.lazy="newProjectData.channelId">
					<option
						v-for="channel of selectedGuild.channels"
						:key="channel"
						:value="channel.id"
						:selected="channel.id === editingProjectData.channel.id ? true : false"
					>
						#{{ channel.name }}
					</option>
				</select>
			</div>

			<div class="track-project-modal-item">
				<label for="project-roles">Notification Roles</label>
				<select name="project-roles" multiple v-model.lazy="newProjectData.roleIds">
					<option
						v-for="role of selectedGuild.roles"
						:style="`color: ${role.color};`"
						:key="role"
						:value="role.id"
						:selected="editingProjectData.roleIds.includes(role.id) ? true : false"
					>
						<div>{{ role.name }}</div>
					</option>
				</select>
				<span>Hold CTRL to select multiple roles.</span>
			</div>
		</Modal>

		<Modal
			class="dashboard-modal"
			id="track-project-modal"
			v-show="showTrackProjectModal"
			title="Track new project"
			@closeModal="showTrackProjectModal = false"
			:buttons="[
				{
					text: 'TRACK PROJECT',
					class: 'button-primary',
					eventHandler: trackProject,
				},
			]"
		>
			<div class="track-project-modal-item">
				<label for="project-id">Project ID</label>
				<input type="text" name="project-id" v-model.trim="trackProjectData.projectId" />
			</div>

			<div class="track-project-modal-item">
				<label for="project-channel">Channel</label>
				<select name="project-channel" v-model="trackProjectData.channelId">
					<option v-for="channel of selectedGuild.channels" :key="channel" :value="channel.id">#{{ channel.name }}</option>
				</select>
			</div>

			<div class="track-project-modal-item">
				<label for="project-roles">Notification Roles</label>
				<select name="project-roles" multiple v-model.lazy="newProjectData.roleIds">
					<option v-for="role of selectedGuild.roles" :style="`color: ${role.color};`" :key="role" :value="role.id">
						<div>{{ role.name }}</div>
					</option>
				</select>
				<span>Hold CTRL to select multiple roles.</span>
			</div>
		</Modal>
	</div>
</template>

<script setup>
import { toast } from 'vue-sonner'
import PlusIcon from '~/assets/images/utils/circle-plus.svg'
import InfoIcon from '~/assets/images/utils/info.svg'

definePageMeta({ middleware: ['auth'] })
useHead({ title: 'Dashboard' })

const auth = await useAuth()

const {
	data,
	pending: awaitingGuildData,
	error,
} = await useFetch('https://discord.com/api/users/@me/guilds', {
	headers: auth.value.headers,
})

const fetchAllGuildsResponse = await useFetch('/api/getAllGuilds')

const selectedGuild = ref('')
const selectedTab = ref(0)
const searchInput = ref('')
const showOnlyManagedGuilds = ref(true)
const showOnlyPresentGuilds = ref(true)
const showProjectEditModal = ref(false)
const showTrackProjectModal = ref(false)
const disableProjectEditModalButtons = ref(false)
const editingProjectData = ref({
	name: '',
	id: '',
	platform: '',
	channel: '',
	roleIds: [],
})
const trackProjectData = ref({
	projectId: '',
	channelId: '',
	roleIds: [],
})
const newProjectData = ref({
	channelId: '',
	roleIds: [],
})

watch(editingProjectData, (newData, oldData) => {
	newProjectData.value.channelId = newData.channel.id
	newProjectData.value.roleIds = newData.roleIds
})

const userGuilds = computed(() => {
	const guilds = data.value
	let shownGuilds = guilds

	guilds.sort((a, b) => {
		return a.name.localeCompare(b.name)
	})

	if (showOnlyManagedGuilds.value === true) {
		shownGuilds = guilds.filter((guild) => {
			return (guild.permissions & 0x20) == 0x20
		})
	}

	if (showOnlyPresentGuilds.value === true) {
		shownGuilds = shownGuilds.filter((guild) => {
			return fetchAllGuildsResponse.data.value.includes(guild.id)
		})
	}

	return shownGuilds
})

function computedGuildIcon(guild) {
	if (guild.icon) {
		return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`
	} else {
		return 'img/guild-icon-placeholder.png'
	}
}

async function selectGuild(guild) {
	const guildData = await $fetch('/api/guild', { query: { guildId: guild.id } })

	if (guildData.isBotPresent) {
		const guildChannels = await $fetch('/api/guildChannels', { query: { guildId: guild.id } })

		selectedGuild.value = {
			id: guild.id,
			name: guild.name,
			icon: guild.icon,
			channels: guildChannels,
			roles: guildData.roles,
			projectChannels: guildData.channels,
			isBotPresent: true,
			permissions: userGuilds.value.find((element) => element.id === guild.id).permissions,
			settings: {
				changelogLength: guildData.changelogLength,
				maxProjects: guildData.maxProjects,
				notificationStyle: guildData.notificationStyle,
			},
		}
	} else {
		selectedGuild.value = {
			id: guild.id,
			name: guild.name,
			icon: guild.icon,
			isBotPresent: false,
		}
	}
}

function capitalize(string) {
	if (string) return string.replace(string.charAt(0), String.fromCharCode(string.charCodeAt(0) - 32))
	return 'null'
}

function openProjectEditModal(project, channel) {
	editingProjectData.value = {
		name: project.name,
		id: project.id,
		platform: project.platform,
		channel: channel,
		roleIds: project.roleIds ?? [],
	}

	showProjectEditModal.value = true
}

function openTrackProjectModal() {
	showTrackProjectModal.value = true
}

async function trackProject() {
	const res = await $fetch.raw('/api/trackProject', {
		method: 'POST',
		body: {
			projectId: trackProjectData.value.projectId,
			channelId: trackProjectData.value.channelId,
			guildId: selectedGuild.value.id,
			roleIds: trackProjectData.value.roleIds,
			userId: auth.value.user.id,
		},
		ignoreResponseError: true,
	})

	if (res.ok) {
		toast.success('Successfully tracked new project.')
	} else {
		toast.error(`An error has ocurred:`, {
			description: `${res.status} ${res.statusText}`,
		})
	}

	await selectGuild({
		id: selectedGuild.value.id,
		name: selectedGuild.value.name,
		icon: selectedGuild.value.icon,
	})

	showTrackProjectModal.value = false
}

async function untrackProject() {
	disableProjectEditModalButtons.value = true

	const res = await $fetch.raw('/api/untrackProject', {
		method: 'PATCH',
		body: {
			projectId: editingProjectData.value.id,
			channelId: editingProjectData.value.channel.id,
			guildId: selectedGuild.value.id,
			userId: auth.value.user.id,
		},
		ignoreResponseError: true,
	})

	if (res.ok) {
		toast.success('Successfully removed project from tracking.')
	} else {
		toast.error(`An error has ocurred:`, {
			description: `${res.status} ${res.statusText}`,
		})
	}

	await selectGuild({
		id: selectedGuild.value.id,
		name: selectedGuild.value.name,
		icon: selectedGuild.value.icon,
	})

	showProjectEditModal.value = false
	disableProjectEditModalButtons.value = false
}

async function editProject() {
	disableProjectEditModalButtons.value = true

	const res = await $fetch.raw('/api/editProject', {
		method: 'PATCH',
		body: {
			oldProject: {
				projectId: editingProjectData.value.id,
				channelId: editingProjectData.value.channel.id,
				guildId: selectedGuild.value.id,
			},
			newProject: {
				channelId: newProjectData.value.channelId,
				roleIds: newProjectData.value.roleIds,
			},
			guildId: selectedGuild.value.id,
			userId: auth.value.user.id,
		},
		ignoreResponseError: true,
	})

	if (res.ok) {
		toast.success('Successfully saved new project settings.')
	} else {
		toast.error(`An error has ocurred:`, {
			description: `${res.status} ${res.statusText}`,
		})
	}

	await selectGuild({
		id: selectedGuild.value.id,
		name: selectedGuild.value.name,
		icon: selectedGuild.value.icon,
	})

	showProjectEditModal.value = false
	disableProjectEditModalButtons.value = false
}

async function saveMaxChars(event) {
	const res = await $fetch.raw('/api/editGuild', {
		method: 'PATCH',
		query: { guildId: selectedGuild.value.id },
		body: {
			changelogLength: event.target.value,
			guildId: selectedGuild.value.id,
			userId: auth.value.user.id,
		},
		ignoreResponseError: true,
	})

	if (res.ok) {
		toast.success('Successfully saved new maximum changelog length.')
	} else {
		toast.error(`An error has ocurred:`, {
			description: `${res.status} ${res.statusText}`,
		})
	}

	selectedGuild.value.settings.changelogLength = event.target.value
}

async function saveNotificationStyle(event) {
	const res = await $fetch.raw('/api/editGuild', {
		method: 'PATCH',
		query: { guildId: selectedGuild.value.id },
		body: {
			notificationStyle: event.target.value,
			guildId: selectedGuild.value.id,
			userId: auth.value.user.id,
		},
		ignoreResponseError: true,
	})

	if (res.ok) {
		toast.success('Successfully saved notification style.')
	} else {
		toast.error(`An error has ocurred:`, {
			description: `${res.status} ${res.statusText}`,
		})
	}

	selectedGuild.value.settings.notificationStyle = event.target.value
}
</script>

<style lang="scss" scoped>
.image-placeholder {
	height: 2rem;
	width: 2rem;
	background-color: #ffffff;
	border-radius: 999999px;
}

#dashboard {
	display: flex;
	width: 100%;
	min-height: calc(100vh - 70px);

	.rounded-container {
		background-color: var(--color-bg-dark);
		border-radius: 10px;
		padding: 1rem;
	}

	#sidebar {
		display: flex;
		flex-direction: column;
		background-color: var(--color-bg-dark);
		min-width: 300px;
		padding: 1rem;
		margin: 1rem;

		h1 {
			margin: 0.5rem 0;
		}

		#server-search-input {
			background-color: var(--color-bg);
			border-radius: 10px;
			font-family: var(--font-standard);
		}

		#checkbox-container {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			font-size: 0.75rem;
			margin-top: 1rem;

			#show-managed-guilds-checkbox {
				background-color: rebeccapurple;
				height: 1rem;
				width: 1rem;
				padding: 0;
			}
		}

		#server-navlist-buttons {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			margin: 1rem 0;

			.server-nav-button {
				color: var(--color-text);
				background: none;
				display: flex;
				align-items: center;
				gap: 0.5rem;
				border-radius: 10px;
				padding: 0.5rem;
				max-width: 400px;

				&:hover {
					background-color: rgba($color: #ffffff, $alpha: 0.2);
				}
				&:active {
					background-color: rgba($color: #ffffff, $alpha: 0.1);
					transform: scale(0.95);
				}

				img {
					border-radius: 99999px;
					height: 2.5rem;
					width: 2.5rem;
				}

				span {
					overflow: hidden;
				}

				&.selected {
					background-color: rgba($color: #ffffff, $alpha: 0.2);
				}
			}
		}
	}

	#information-panels {
		// flex-basis: 600px;
		width: 100%;
		margin-top: 1rem;
		margin-right: 1rem;

		#server-name-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 1rem;

			div {
				display: flex;
				align-items: center;
				gap: 1rem;
			}

			img {
				border-radius: 99999px;
				height: 3rem;
				width: 3rem;
			}

			button {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 0.5rem;
				color: var(--color-text);
				background-color: var(--color-brand);
				border-radius: 0.5rem;
				padding: 0.75rem;
				width: 180px;
				font-size: var(--font-size-medium);
				font-weight: var(--font-weight-medium);

				&:hover {
					background-color: var(--color-brand-dark);
				}

				svg.plus-icon {
					height: 1.25rem;
					width: 1.25rem;
				}
			}
		}

		#navigation-bar {
			display: flex;
			gap: 0.5rem;
			background-color: var(--color-bg-dark);
			border-radius: 10px;
			padding: 0.5rem;

			button {
				background: none;
				border-radius: 10px;
				padding: 0.75rem;

				&.selected {
					background-color: #404149;
				}
			}
		}

		.info-panel {
			margin: 1rem 0;

			h1 {
				border-bottom: 1px solid var(--color-text-dark);
				padding-bottom: 1rem;
				margin: 0;
			}
		}

		#tracked-projects-panel {
			#channels {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				.channel-container {
					background-color: var(--color-bg);
					padding: 0.75rem;

					.title {
						display: flex;
						align-items: center;
						gap: 0.5rem;
						margin-bottom: 0.5rem;

						h1,
						h2 {
							border: none;
							margin: 0;
							padding: 0;
						}

						h1 {
							font-size: 1.25rem;
						}

						h2 {
							color: var(--color-text-dark);
							font-size: 0.75rem;
						}
					}

					.body {
						p {
							margin: 0.5rem 0 0 0;
						}
						.headings {
							display: grid;
							grid-template-columns: 0.75fr 0.5fr 0.5fr 0.5fr 2fr;
							border-bottom: 1px solid var(--color-text-dark);
							padding-bottom: 0.5rem;
						}

						.projects-container {
							display: flex;
							flex-direction: column;
							gap: 0.25rem;
							margin-top: 0.75rem;

							.project {
								display: grid;
								grid-template-columns: 0.75fr 0.5fr 0.5fr 0.5fr 2fr;
								padding: 0.5rem;
								border-radius: 0.5rem;

								> * {
									margin: 0;
									text-align: start;
								}

								.role-id {
									margin: 0 0.5rem 0 0;
								}
							}
						}
					}
				}
			}
		}

		#bot-settings-panel {
			#cols {
				display: flex;
				justify-content: space-between;

				#left-col div {
					display: flex;
					align-items: center;
					gap: 0.5rem;
				}
			}

			input,
			select,
			textarea {
				background-color: var(--color-bg);
				border: none;
				border-radius: 10px;
				font-family: var(--font-standard);
				width: 200px;
				height: 40px;
				padding: 0.5rem;
			}

			textarea {
				width: calc(100% - 2rem);
				height: 400px;
				padding: 1rem;
			}
		}
	}
}

.track-project-modal-item {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding: 0.5rem;

	span {
		font-size: var(--font-size-extrasmall);
		margin: 0;
	}
}

.dashboard-modal {
	backdrop-filter: blur(5px);
	position: absolute;
	min-height: calc(100vh - 70px);
	width: 100vw;

	div.modal-container {
		background-color: var(--color-bg-dark);
		border-radius: 1rem;
		box-shadow: 1px 1px 20px 2px rgb(0, 0, 0);
		max-width: 800px;
		margin: 10vh auto;
		padding: 0.5rem;

		> h1 {
			background-color: var(--color-bg);
			border-radius: 0.5rem;
			font-size: var(--font-size-large);
			margin: 0;
			padding: 1rem;
		}

		div.modal-content {
			background-color: var(--color-bg);
			border-radius: 0.5rem;
			margin: 0.5rem 0 0 0;
			padding: 1rem;

			div.modal-content-grid {
				display: grid;
				gap: 1rem;
				grid-template-columns: 1fr 1fr;

				> div {
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
				}

				span {
					font-size: var(--font-size-extrasmall);
					margin: 0;
				}
			}

			div.modal-buttons {
				display: flex;
				justify-content: space-between;
				margin: 1rem 0 0 0;

				div.left-buttons {
					display: flex;
					gap: 0.5rem;
					justify-content: flex-start;
				}

				div.right-buttons {
					display: flex;
					gap: 0.5rem;
					justify-content: flex-end;
				}
			}
		}
	}
}
</style>
