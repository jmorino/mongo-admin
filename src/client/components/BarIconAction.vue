<template>
<v-tooltip bottom>
	<slot>
		<span>{{ tooltip }}</span>
	</slot>

	<template v-slot:activator="{ on }">
		<v-btn :class="noMargin ? 'mx-0' : 'mx-1'" small icon :disabled="disabled" :to="to" v-on="on" @click="$emit('click')">
			<v-icon :color="color">{{ icon }}</v-icon>
		</v-btn>
	</template>
</v-tooltip>
</template>


<script>
export default {
	props: {
		icon:     { type: String },
		tooltip:  { type: String },
		color:    { type: String,  optional: true },
		noMargin: { type: Boolean, optional: true },
		disabled: { type: Boolean, optional: true },
		to:       { type: [String, Object], optional: true },
	},
}
</script>