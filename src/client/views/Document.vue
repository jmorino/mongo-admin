<template>
<v-container fluid :style="{ height: `${height}px` }">
	<v-row class="fill-height" dense>
		<v-col class="fill-height">
			<dlg-confirm-delete ref="confirm-delete" @confirm="removeConfirmed" />
			<v-card tile class="ma-0 pa-0 d-flex flex-column fill-height" v-resize="resize">
				<v-toolbar dense flat color="grey lighten-2" class="flex-grow-0 flex-shrink-1">
					<bar-icon-action icon="mdi-arrow-left" tooltip="Back" no-margin @click="navback" />
					<v-spacer />
					<bar-icon-action icon="mdi-delete" tooltip="Delete" @click="remove" />
					<v-divider vertical class="mx-2" />
					<bar-icon-action :disabled="!hasDocumentChanged" icon="mdi-undo" tooltip="Revert" @click="revert" />
					<bar-icon-action :disabled="!hasDocumentChanged" icon="mdi-check" tooltip="Save" @click="save" />
				</v-toolbar>
				<v-progress-linear indeterminate :active="loading" height="2" />
				<card-message v-if="loading" text="Loading document..." />
				<v-card-text class="pa-0 flex-grow-1" v-else>
					<vue-codemirror ref="editor" :value="content" @input="editDocument" />
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</template>


<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import VueCodemirror from '@/components/VueCodemirror.vue';
import CardMessage from '@/components/CardMessage.vue';
import BarIconAction from '@/components/BarIconAction.vue';
import DlgConfirmDelete from '@/components/DlgConfirmDelete.vue';

export default {
	components: { CardMessage, VueCodemirror, BarIconAction, DlgConfirmDelete },
	props: {
		db: String,
		col: String,
		id: String,
	},
	data() { return {
		height: null,
		dlgConfirmVisible: false,
	}},
	computed: {
		// ...mapState({
		// 	loading(state)  { return state.document.loading },
		// 	document(state) { return state.document.original },
		// }),
		...mapGetters('document', ['loading','error','content','hasDocumentChanged']),
	},
	methods: {
		...mapMutations('document', ['setID']),
		...mapActions('document', ['loadDocument','editDocument','revertDocument','saveDocument','deleteDocument']),
		resize() {
			this.height = window.innerHeight - 48;
		},
		navback() {
			this.$router.push({
				name: 'collection-overview',
				params: { db: this.db, col: this.col },
			});
		},
		init() {
			this.loadDocument({ dbName: this.db, collectionName: this.col, id: this.id });
		},
		remove() {
			this.$refs['confirm-delete'].open();
		},
		async removeConfirmed() {
			await this.deleteDocument({ dbName: this.db, collectionName: this.col, id: this.id });
			this.navback();
		},
		revert() {
			this.revertDocument();
			this.$refs['editor'].refresh();
		},
		async save() {
			const id = await this.saveDocument();
			
			// replace URL with new document ID
			if (id !== this.id) {
				const { db, col } = this;
				this.$router.replace({ name: 'document', params: { db, col, id }});
			}
		},
	},
	watch: {
		$route() { this.init() },
	},
	created() {
		this.resize();
		this.init();
	},
}
</script>