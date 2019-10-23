<template>
<v-app>
	<v-app-bar app dense>
		<v-toolbar-title class="headline">
			<span>MongoDB</span>
			<span class="primary--text">ADMIN</span>
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
	}},
}
</script>


<style lang="less" scoped>
.custom { color: red }
</style>