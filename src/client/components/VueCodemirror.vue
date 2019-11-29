<template>
<div class="vue-codemirror">
	<div ref="editor" class="editor"></div>
</div>
</template>


<script>
import CodeMirror from 'codemirror';

export default {
	props: {
		value: { type: String },
		options: { type: Object, default: () => ({
			lineNumbers: true,
			fixedGutter: true,
			showCursorWhenSelecting: true,
			tabSize: 2,
			indentUnit: 2,
			mode: { name: 'javascript', json: true },
			theme: 'eclipse',
		})}
	},
	data() { return {
		editor: null,
	}},
	methods: {
		init() {
			const { value, options } = this;
			this.editor = CodeMirror(this.$refs['editor'], { ...options, value });
			this.editor.on('changes', editor => { this.$emit('input', editor.getValue()) });
			this.editor.setSize('auto', '100%');
		},
		refresh() {
			this.editor.setValue(this.value);
		},
		destroy() {
			const wrapper = this.editor.doc.cm.getWrapperElement();
			wrapper && wrapper.remove();
		}
	},
	watch: {
		value() { this.refresh() },
	},
	mounted() { this.init() },
	beforeDestroy() { this.destroy() },
}
</script>


<style lang="less">
.vue-codemirror {
	position: relative;
	height: 100%;

	.editor {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
}
</style>