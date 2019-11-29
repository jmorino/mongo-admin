<template>
<v-dialog v-model="visible" persistent max-width="400">
	<v-card>
		<v-card-title class="headline">
			<v-avatar color="error" size="36" class="me-4 text-center">
				<v-icon color="white">mdi-alert-outline</v-icon>
			</v-avatar>
			Delete this document ?
		</v-card-title>
		<v-card-text>
			{{ message }}
		</v-card-text>
		<v-divider />
		<v-card-actions>
			<v-spacer />
			<v-btn text @click="onCancel">Cancel</v-btn>
			<v-btn text color="error" @click="onConfirm">Delete</v-btn>
		</v-card-actions>
	</v-card>
</v-dialog>
</template>


<script>
export default {
	props: {
		closeOnCancel: { type: Boolean, default: true },
	},
	data() { return {
		visible: false,
		message: 'Cras justo odio, dapibus ac facilisis in',
	}},
	methods: {
		open()  { this.visible = true  },
		close() { this.visible = false },
		onConfirm() {
			this.$emit('confirm');
		},
		onCancel()  {
			if (this.closeOnCancel) { this.close() }
			this.$emit('cancel');
		},
	}
}
</script>