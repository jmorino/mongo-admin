<template>
<v-speed-dial v-model="visible" fixed bottom right direction="left" open-on-hover transition="slide-y-reverse-transition">

	<template v-slot:activator>
		<v-btn v-model="visible" color="primary" dark fab>
			<v-icon>{{ visible ? 'mdi-close' : 'mdi-dots-vertical' }}</v-icon>
		</v-btn>
	</template>

	<v-tooltip top v-for="{ key, color, icon, tooltip } in actions" :key="key">
		<span>{{ tooltip }}</span>

		<template v-slot:activator="{ on }">
			<v-btn fab dark small :color="color" v-on="on" @click="$emit(key)">
				<v-icon>{{ icon }}</v-icon>
			</v-btn>
		</template>
	</v-tooltip>

</v-speed-dial>
</template>


<script>
export default {
	data() { return {
		visible: false,
		actions: [
			{ key: 'document', color: 'indigo', icon: 'mdi-plus',            tooltip: 'New document' },
			{ key: 'export',   color: 'pink',   icon: 'mdi-folder-upload',   tooltip: 'Import collection' },
			{ key: 'export',   color: 'green',  icon: 'mdi-folder-download', tooltip: 'Export collection' },
			{ key: 'delete',   color: 'red',    icon: 'mdi-folder-remove',   tooltip: 'Delete collection' },
		],
	}},
}
</script>