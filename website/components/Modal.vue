<script setup>
const props = defineProps({
	title: String,
	buttons: Array,
})
</script>

<template>
	<div class="modal">
		<form @submit.prevent>
			<div class="title-container">
				<h1 class="title">{{ title }}</h1>
				<button class="close-button" @click="$emit('closeModal')">CLOSE</button>
			</div>
			<div class="content-container">
				<div class="content-items">
					<slot> Huh, looks like this modal is empty! </slot>
				</div>
				<div class="content-buttons">
					<button v-for="button in buttons" :class="button.class" :style="button.style" @click="button.eventHandler">{{ button.text }}</button>
				</div>
			</div>
		</form>
	</div>
</template>

<style lang="scss" scoped>
div.modal {
	backdrop-filter: blur(5px);
	position: absolute;
	min-height: calc(100vh - 70px);
	width: 100vw;

	form {
		background-color: var(--color-bg-dark);
		border-radius: 1rem;
		box-shadow: 1px 1px 20px 2px rgb(0, 0, 0);
		max-width: 800px;
		margin: 10vh auto;
		padding: 0.5rem;

		div.title-container {
			align-items: center;
			background-color: var(--color-bg);
			border-radius: 0.5rem;
			display: flex;
			justify-content: space-between;
			margin: 0;
			padding: 0.5rem;

			h1.title {
				font-size: var(--font-size-extralarge);
				margin: 0;
			}
		}

		div.content-container {
			background-color: var(--color-bg);
			border-radius: 0.5rem;
			margin-top: 0.5rem;

			div.content-items {
				display: grid;
				gap: 1rem;
				grid-template-columns: 1fr 1fr;

				> * {
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
				}
			}

			div.content-buttons {
				display: flex;
				gap: 0.5rem;
				justify-content: end;
				margin: 1rem 0 0 0;
				padding: 0.5rem;
			}
		}
	}
}
</style>
