<template>
<div>
	<collections :db="db" />
	<router-view />
</div>
</template>


<script>
import { mapActions } from 'vuex';
import Collections from '@/views/Collections.vue';

export default {
	props: {
		db: String,
	},
	components: { Collections },
	methods: mapActions('database', ['loadDatabase']),
	watch: {
		db() {
			this.loadDatabase({ dbName: this.db });
		},
	},
	created() {
		this.loadDatabase({ dbName: this.db });
	},
}
</script>