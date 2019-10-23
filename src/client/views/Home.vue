<template>
<v-container>
	<v-row>
		<v-col>
			<v-card>
				<v-card-text>
					Server said: <span class="custom">{{response}}</span>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</template>


<script>
export default {
	data() { return {
		response: null,
	}},
	mounted() {
		fetch('http://localhost:3000/api')
			.then(async response => {
				console.log(response);
				this.response = (await response.json()).ok;
			})
			.catch(err => {
				console.error(err);
				this.response = err.message;
			});
	}
}
</script>


<style lang="less" scoped>
.custom { color: red }
</style>