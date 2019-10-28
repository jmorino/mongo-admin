<template>
<v-container fluid>
	<query-form />
	<query-results />
</v-container>
</template>


<script>
import QueryForm from '@/components/DocumentQueryForm.vue';
import QueryResults from '@/components/DocumentQueryResults.vue';
import { mapState } from 'vuex';

export default {
	components: { QueryForm, QueryResults },
	data() { return {
	}},
}
</script>