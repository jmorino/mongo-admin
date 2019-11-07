<template>
<v-container fluid>
	<v-row>
		<v-col>
	<v-card tile class="ma-0 pa-0">
		<v-toolbar dense flat color="grey lighten-2">
			<v-toolbar-title class="subtitle-2">Document</v-toolbar-title>
			<v-spacer />
			<!-- <v-btn color="primary" text @click="close">Close</v-btn> -->
		</v-toolbar>
		<v-progress-linear indeterminate :active="loading" height="2" />
		<card-message v-if="loading" text="Loading document..." />
		<v-card-text class="pa-0" v-else>
			<!-- <div> -->
				<!-- {{ document }} -->
				<!-- <vue-ace-editor
					ref="editor" 
					:content="document"  
					:options="options" 
					:fontSize="14"
					lang="javascript" 
					theme="eclipse" /> -->
				<!-- <codemirror :options="options" :value="document" /> -->
				<vue-codemirror :options="options" :value="document" />
			<!-- </div> -->
			<!-- {{ document }} -->
		</v-card-text>
		<!-- <v-divider></v-divider> -->
		<!-- <v-card-actions>
			<v-spacer />
			<v-btn color="primary" text @click="close">Close</v-btn>
		</v-card-actions> -->
	</v-card>
		</v-col>
	</v-row>
</v-container>
</template>


<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import VueCodemirror from '@/components/VueCodemirror.vue';
import CardMessage from '@/components/CardMessage.vue';

export default {
	components: { CardMessage, VueCodemirror },
	props: {
		db: String,
		col: String,
		id: String,
		// document: { type: String, default: '' },
	},
	data() { return {
		height: window.innerHeight * 0.9,
		options: {
			// vue2x-ace-editor
			// enableBasicAutocompletion: true,
			// enableSnippets: true,
			// enableLiveAutocompletion: true,
			// tabSize: 2,

			// codemirror
			lineNumbers: true,
			fixedGutter: true,
			// showCursorWhenSelecting: true,
			tabSize: 4,
			indentUnit: 2,
			mode: { name: 'javascript', json: true },
			theme: 'eclipse',
			// viewportMargin: Infinity,
		},
	}},
	computed: mapState({
		loading(state)  { return state.document.loading },
		document(state) { return state.document.current },
	}),
	methods: {
		loadDocument() {
			this.$store.dispatch('loadDocument', { dbName: this.db, collectionName: this.col, id: this.id });
		}
	},
	watch: {
		id() { this.loadDocument() },
	},
	mounted() { this.loadDocument() },
}
</script>