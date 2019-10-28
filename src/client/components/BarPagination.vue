<template>
	<div>
		<div class="caption d-inline-flex flex-shrink-1 align-self-center">{{ pageRangeMin + 1 }} - {{ pageRangeMax }} sur {{ total }}</div>
		<v-btn small icon :disabled="isFirst" @click="prev">
			<v-icon :color="color" :size="size">mdi-chevron-left</v-icon>
		</v-btn>
		<v-btn small icon :disabled="isLast" @click="next">
			<v-icon :color="color" :size="size">mdi-chevron-right</v-icon>
		</v-btn>
	</div>
</template>

<script>
export default {
	props: {
		page: Number,
		count: { type: Number, default: 1 },
		total: Number,
		color: { type: String, default: null },
		size:  { type: String, default: null },
	},
	computed: {
		pageRangeMin() { return this.page * this.count },
		pageRangeMax() { return Math.min(this.pageRangeMin + this.count, this.total) },
		isFirst() { return this.page <= 0 },
		isLast() { return this.pageRangeMax >= this.total },
	},
	methods: {
		prev() {
			if (this.isFirst) { return }

			const page = this.page - 1;
			const index = page * this.count;

			this.$emit('previous', {
				page,
				index,
				range: {
					min: index,
					max: index + this.count,
				},
			});
		},
		next() {
			if (this.isLast) { return }

			const page = this.page + 1;
			const index = page * this.count;
			
			this.$emit('next', {
				page,
				index,
				range: {
					min: index,
					max: index + this.count,
				},
			});
		},
	},
}
</script>
