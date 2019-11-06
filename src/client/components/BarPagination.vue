<template>
	<div v-if="total > 0">
		<v-menu offset-y :close-on-content-click="false" v-model="index.menu">
			<template v-slot:activator="{ on }">
				<v-btn text class="caption text-lowercase" v-on="on">
					<div>{{ total ? start + 1 : start }}&ndash;{{ end }} sur {{ total }}</div>
				</v-btn>
			</template>

			<v-card tile width="200px">
				<v-card-text>
					<v-form v-model="index.valid" @submit.prevent="goto">
						<p class="mt-3">Jump to item:</p>
						<v-text-field
							type="number"
							outlined
							dense
							autofocus
							append-outer-icon="mdi-send"
							v-model="index.value"
							:rules="index.rules">

							<template v-slot:append-outer>
								<v-btn icon style="top:-5px" color="primary" :disabled="!index.valid" @click="goto">
									<v-icon>mdi-send</v-icon>
								</v-btn>
							</template>
						</v-text-field>
					</v-form>
				</v-card-text>
			</v-card>
		</v-menu>

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
		start: Number,
		end: Number,
		total: Number,
		color: { type: String, default: null },
		size:  { type: String, default: null },
	},
	data() { return {
		index: {
			menu: false,
			value: 0,
			valid: true,
			rules: [
				v => (v >= 0 && v < this.total) || 'index out of range',
			]
		}
	}},
	computed: {
		isFirst() { return this.start <= 0 },
		isLast()  { return this.end >= this.total },
	},
	methods: {
		prev() {
			if (this.isFirst) { return }

			this.$emit('previous', {
				// page,
				// index,
				// range: {
				// 	min: index,
				// 	max: index + this.count,
				// },
			});
		},
		next() {
			if (this.isLast) { return }

			this.$emit('next', {
				// page,
		// 		index,
		// 		range: {
		// 			min: index,
		// 			max: index + this.count,
		// 		},
			});
		},
		goto() {
			if (this.index.valid) {
				this.$emit('goto', this.index.value);
				this.index.menu = false;
			}
		},
	},
	watch: {
		start() { this.index.value = this.start },
	}
}
</script>
