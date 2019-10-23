<template>
<v-app>
	<v-app-bar app dense>
		<v-toolbar-title class="headline text-uppercase">
			<span>{{title}}</span>
			<span class="font-weight-light primary--text">{{subtitle}}</span>
		</v-toolbar-title>
	</v-app-bar>

	<v-content>
		<router-view />
	</v-content>
</v-app>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	data() { return {
		title: 'MEVN',
		subtitle: 'Boilerplate',
	}},
}
</script>


<style lang="less" scoped>
.custom { color: red }
</style>