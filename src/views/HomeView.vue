<script>
import ColumnChart from '@/components/ColumnChart.vue'
import TableComponent from '@/components/TableComponent.vue'
import { mapGetters } from 'vuex'
import salesService from '@/services/sales.service'
export default {
  data() {
    return {
      headerStyle: {
        textAlign: 'center',
        color: '#fff',
        height: 64,
        paddingInline: 50,
        lineHeight: '64px',
        backgroundColor: '#7dbcea'
      },
      contentStyle: {
        minHeight: 120,
        lineHeight: '60px',
        color: '#fff',
        backgroundColor: '#fff'
      },
      skuList: [],
      lastDayNumber: 30,
      columns: [
        {
          title: 'SKU',
          dataIndex: 'sku',
          key: 'sku'
        },
        {
          title: 'Product Name',
          dataIndex: 'productName',
          key: 'productName'
        },
        {
          title: `SKU Refund Rate (Last ${this.$store.state.lastDayNumber} days)`,
          key: 'skuRefundRate',
          dataIndex: 'skuRefundRate'
        }
      ],
      tableData: []
    }
  },
  components: {
    columnChart: ColumnChart,
    tableComp: TableComponent
  },
  computed: {
    ...mapGetters(['getSelectedColumnDates', 'getLastDayNumber']),
    selectedColumnDates() {
      return this.getSelectedColumnDates
    },
    selectedLastDayNumber() {
      return this.getLastDayNumber
    }
  },
  watch: {
    selectedColumnDates() {
      this.getDailySalesSkuList()
      // if (oldVal.length === 1 && newVal.length === 2) {
      //   //add
      //   this.columns.splice(this.columns.length - 2, 0, {
      //     title: `${newVal[1]} / Unit Avg. Selling Price`,
      //     key: 'avgSellingPrice2',
      //     dataIndex: 'avgSellingPrice2'
      //   })
      // } else if (oldVal.length === 2 && newVal.length === 1) {
      //   //delete
      // }
    },
    selectedLastDayNumber(newVal) {
      this.lastDayNumber = newVal
      this.columns[this.columns.length - 1].title = `SKU Refund Rate (Last ${newVal} days)`
    }
  },
  methods: {
    getDailySalesSkuList() {
      salesService.getDailySalesSkuList(this.selectedColumnDates).then(
        (res) => {
          this.skuList = res.item.skuList
          this.getSkuListRefundRate()
        },
        (err) => {
          console.log('Something went wrong!', err)
        }
      )
    },
    getSkuListRefundRate() {
      salesService.getSkuRefundRate(this.skuList).then(
        (res) => {
          this.skuList = res
          this.generateTableData()
        },
        (err) => {
          console.log('Something went wrong!', err)
        }
      )
    },
    generateTableData() {
      let tableData = []
      this.skuList.forEach((skuItem) => {
        tableData.push({
          sku: skuItem.sku.sku,
          productName: skuItem.sku.productName,
          skuRefundRate: skuItem.refundRate
        })
      })
      this.tableData = tableData
    }
  }
}
</script>

<template>
  <columnChart></columnChart>
  <br />
  <tableComp :columns="columns" :tableData="tableData" v-if="tableData.length !== 0"></tableComp>
</template>

<style scoped lang="scss"></style>
