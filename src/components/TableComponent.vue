<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      searchText: '',
      filterTable: null
    }
  },
  props: {
    title: String,
    likes: Number,
    columns: Array,
    tableData: Array
  },
  components: {},
  computed: {
    ...mapGetters(['getSelectedColumnDates']),
    selectedColumnDates() {
      return this.getSelectedColumnDates
    }
  },
  watch: {
    selectedColumnDates() {
      this.getDailySalesSkuList()
    }
  },
  methods: {
    onSearch(searchValue) {
      let filterTable = this.tableData.filter((o) =>
        Object.keys(o).some((k) => String(o[k]).toLowerCase().includes(searchValue.toLowerCase()))
      )
      this.filterTable = filterTable
    }
  }
}
</script>

<template>
  <a-space direction="vertical">
    <a-input-search
      v-model:value="searchText"
      placeholder="input search text"
      style="width: 200px"
      @search="onSearch"
  /></a-space>
  <a-table :columns="columns" :data-source="filterTable == null ? tableData : filterTable">
  </a-table>
</template>

<style scoped lang="scss"></style>
