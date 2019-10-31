<template>
<v-card-text>
	<p class="text-center ma-4">{{ text }}</p>
</v-card-text>
</template>


<script>
export default {
	props: { text: String }
}
</script>