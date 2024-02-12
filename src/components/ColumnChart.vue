<script>
import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
import salesService from '@/services/sales.service'
import moment from 'moment'
exportingInit(Highcharts)

let allData = []

export default {
  data() {
    return {
      value1: '30',
      selectedColumns: [],
      chartOptions: {
        chart: {
          type: 'column'
        },
        data: {
          table: 'datatable'
        },
        title: {
          text: 'Daily Sales',
          align: 'left'
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Amount ($)'
          },
          stackLabels: {
            enabled: true
          }
        },
        legend: {
          align: 'left',
          x: 45,
          verticalAlign: 'top',
          y: 45,
          floating: true,
          backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
        },
        tooltip: {
          formatter: function () {
            return `Total Sales: ${allData[this.point.index].fbaAmount + allData[this.point.index].fbmAmount} <br/> Shipping: ${allData[this.point.index].fbaShippingAmount} <br/> Profit: ${allData[this.point.index].profit}
             <br/> FBA Sales:  ${allData[this.point.index].fbaAmount}  <br/> FBM Sales:  ${allData[this.point.index].fbmAmount}`
          }
        },
        color: {
          pattern: {
            backgroundColor: 'red'
          }
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              enabled: true
            }
          },
          series: {
            point: {
              events: {
                click: (e) => {
                  this.pointClick(e)
                }
              }
            }
          }
        },
        series: []
      },
      selectedLastDayNumber: 30,
      dayOptions: [
        {
          value: '60',
          label: 'Last 60 days'
        },
        {
          value: '30',
          label: 'Last 30 days'
        },
        {
          value: '14',
          label: 'Last 14 days'
        },
        {
          value: '7',
          label: 'Last 7 days'
        }
      ]
    }
  },
  components: {
    highcharts: Chart
  },
  computed: {},
  mounted() {
    this.getDailySales()
  },
  methods: {
    handleChange(event) {
      this.selectedLastDayNumber = event.target.value
      this.$store.commit('setLastDayNumber', this.selectedLastDayNumber)
      this.getDailySales()
    },
    pointClick(event) {
      let selectedDate = moment(event.point.category).format('YYYY-MM-DD')
      this.setSelectedColumns(selectedDate)
    },
    getDailySales() {
      salesService.getDailySalesOverview(this.selectedLastDayNumber).then(
        (res) => {
          allData = res
          this.generateSeriesData(res)
        },
        (err) => {
          console.log('Daily sales overview data cannot get.', err)
        }
      )
    },
    generateSeriesData(data) {
      let profitData = []
      let fbaSalesData = []
      let fbmSalesData = []
      let dates = []
      data.forEach((item) => {
        profitData.push(item.profit || 0)
        fbaSalesData.push(item.fbaAmount || 0)
        fbmSalesData.push(item.fbmAmount || 0)
        dates.push(moment(item.date).format('dddd,MM DD YYYY'))
      })
      this.chartOptions.series = [
        {
          name: 'Profit',
          data: profitData
        },
        {
          name: 'FBA Sales',
          data: fbaSalesData
        },
        {
          name: 'FBM Sales',
          data: fbmSalesData
        }
      ]
      this.chartOptions.xAxis = {
        categories: dates
      }
    },
    setSelectedColumns(day) {
      this.$store.commit('setSelectedDays', day)
    }
  }
}
</script>

<template>
  <select
    class="form-control dailySelect"
    v-binding-change="set_category"
    v-model="selectedLastDayNumber"
    @change="handleChange($event)"
  >
    <option value="" disabled>Please select category</option>
    <option v-for="(day, index) in dayOptions" :key="index" :value="day.value">
      {{ day.label }}
    </option>
  </select>
  <highcharts :options="chartOptions"></highcharts>
</template>

<style scoped lang="scss">
.dailySelect {
  color: black;
  position: absolute;
  left: 83%;
  top: 4.8rem;
  z-index: 1;
}
</style>
