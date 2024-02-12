import axios from 'axios'
const API_URL = 'https://iapitest.eva.guru'

const getDailySalesOverview = async (day) => {
  const userEmail = localStorage.getItem('email') || ''
  const token = localStorage.getItem('token') || ''
  const marketplace = localStorage.getItem('marketplace') || ''
  const sellerId = localStorage.getItem('sellerId') || ''
  if (
    userEmail.length === 0 ||
    token.length === 0 ||
    marketplace.length === 0 ||
    sellerId.length === 0
  )
    return new Promise.reject()
  const authHeaders = {
    Authorization: `Bearer ${token}`
  }
  let data = {
    marketplace: marketplace,
    sellerId: sellerId,
    requestStatus: 0,
    day: day,
    excludeYoYData: true
  }
  return await axios
    .post(API_URL + '/data/daily-sales-overview', data, { headers: authHeaders })
    .then((res) => {
      return res.data.Data.item
    })
    .catch((err) => {
      return err
    })
}

const getDailySalesSkuList = async (salesDates) => {
  const userEmail = localStorage.getItem('email') || ''
  const token = localStorage.getItem('token') || ''
  const marketplace = localStorage.getItem('marketplace') || ''
  const sellerId = localStorage.getItem('sellerId') || ''
  if (
    userEmail.length === 0 ||
    token.length === 0 ||
    marketplace.length === 0 ||
    sellerId.length === 0
  )
    return new Promise.reject()
  const authHeaders = {
    Authorization: `Bearer ${token}`
  }
  let data = {
    marketplace: marketplace,
    sellerId: sellerId,
    salesDate: salesDates[0],
    salesDate2: salesDates[1] ? salesDates[1] : '',
    pageSize: 30,
    pageNumber: 1,
    isDaysCompare: salesDates[1] ? 1 : 0
  }
  return await axios
    .post(API_URL + '/data/daily-sales-sku-list', data, { headers: authHeaders })
    .then((res) => {
      return res.data.Data
    })
    .catch((err) => {
      return err
    })
}

const getSkuRefundRate = async (skuListData) => {
  const userEmail = localStorage.getItem('email') || ''
  const token = localStorage.getItem('token') || ''
  const marketplace = localStorage.getItem('marketplace') || ''
  const sellerId = localStorage.getItem('sellerId') || ''
  if (
    userEmail.length === 0 ||
    token.length === 0 ||
    marketplace.length === 0 ||
    sellerId.length === 0
  )
    return new Promise.reject()
  const authHeaders = {
    Authorization: `Bearer ${token}`
  }
  let data = {
    marketplace: marketplace,
    sellerId: sellerId,
    skuList: skuListData,
    requestedDay: 0
  }
  return await axios
    .post(API_URL + '/data/get-sku-refund-rate', data, { headers: authHeaders })
    .then((res) => {
      return res.data.Data
    })
    .catch((err) => {
      return err
    })
}
export const salesService = {
  getDailySalesOverview,
  getDailySalesSkuList,
  getSkuRefundRate
}

export default salesService
