<template>
<div class="vue-codemirror">
	<div ref="editor"></div>
</div>
</template>


<script>
import CodeMirror from 'codemirror';

export default {
	props: {
		value: { type: String },
		options: { type: Object, default: () => ({}) },
	},
	data() { return {
		editor: null,
	}},
	methods: {
		init() {
			console.log('[CodeMirror]','init');
			const { value, options } = this;
			this.editor = CodeMirror(this.$refs['editor'], { ...options, value });
			this.editor.on('change', editor => { this.$emit('input', editor.getValue()) });
			this.editor.setSize('auto', 'auto');
		},
		destroy() {
			const wrapper = this.editor.doc.cm.getWrapperElement();
			wrapper && wrapper.remove();
		}
	},
	watch: {
		value() {
			this.editor.setValue(this.value);
		},
	},
	mounted() { this.init() },
	beforeUpdate() { console.log('[CodeMirror]','beforeUpdate') },
	beforeDestroy() { this.destroy() },
}
</script>


<style lang="less">
.vue-codemirror {
	height: auto;
}
</style>