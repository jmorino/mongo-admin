<template>
<v-tabs>
	<v-tab>Documents</v-tab>
	<v-tab>Indexes</v-tab>
	<v-tab>Stats</v-tab>

	<v-tab-item :transition="false" :reverse-transition="false">
		<document-list :db="db" :col="col" @clear="resetQuery" @submit="runQuery" @previous="fetchPreviousPage" @next="fetchNextPage" @goto="fetchOnePage" />
	</v-tab-item>
	<v-tab-item :transition="false" :reverse-transition="false">
		<index-list />
	</v-tab-item>
	<v-tab-item :transition="false" :reverse-transition="false">
		<collection-stats />
	</v-tab-item>
</v-tabs>
</template>

