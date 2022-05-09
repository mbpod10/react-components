import APIConfig from './apiConfig'

export class API {
  static getStocks = `${APIConfig}/stocks/list/page`
  static singleStock = `${APIConfig}/stocks`
  static getTotalMoney = `${APIConfig}/stocks/money/total`
}