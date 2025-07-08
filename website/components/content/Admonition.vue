<template>
	<div class="admonition note" v-if="type === 'note'">
		<span><InfoIcon />NOTE</span>
		<slot />
	</div>

	<div class="admonition tip" v-if="type === 'tip'">
		<span><BulbIcon />TIP</span>
		<slot />
	</div>

	<div class="admonition info" v-if="type === 'info'">
		<span><ExclaimationIcon />INFO</span>
		<slot />
	</div>

	<div class="admonition caution" v-if="type === 'caution'">
		<span><AlertIcon />CAUTION</span>
		<slot />
	</div>

	<div class="admonition danger" v-if="type === 'danger'">
		<span><FlameIcon />DANGER</span>
		<slot />
	</div>
</template>

<script setup>
import AlertIcon from '~/assets/images/utils/alert.svg'
import BulbIcon from '~/assets/images/utils/bulb.svg'
import ExclaimationIcon from '~/assets/images/utils/exclaimation.svg'
import FlameIcon from '~/assets/images/utils/flame.svg'
import InfoIcon from '~/assets/images/utils/info.svg'

defineProps(['type'])
</script>

<style lang="scss">
.admonition {
	border-radius: 10px;
	padding: 1rem 1rem 0.25rem 1rem;
	margin: 1rem 0;

	span {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.25rem;
		font-weight: var(--font-weight-bold);
		height: 2rem;
		margin-bottom: 0.75rem;

		svg {
			height: 2rem;
			width: 2rem;
		}
	}
}

div.note {
	background-color: #505050;
	border-left: 5px solid var(--color-text);
}

div.tip {
	background-color: #0d6414;
	border-left: 5px solid #1ccc2a;
}

div.info {
	background-color: #004c79;
	border-left: 5px solid #00a2ff;
}

div.caution {
	background-color: #634300;
	border-left: 5px solid #ffae00;
}

div.danger {
	background-color: #5c1200;
	border-left: 5px solid #ce0000;
}
</style>
