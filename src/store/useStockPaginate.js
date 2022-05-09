import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import StockContext from "./stock-context"
import { API } from '../config/nodeAPIAuth'

const useStockPaginate = (pageNumber, orderBy) => {

  const [hasMore, setHasMore] = useState(false)

  const { makeAPICall, successAPICall } = useContext(StockContext)

  useEffect(() => {
    makeAPICall('list')
    const makeAPICallUse = async () => {
      try {
        const response = await axios.get(`${API.getStocks}/${pageNumber}/${orderBy}`)
        successAPICall(response.data.stocks)
        setHasMore(response.data.stocks.length > 0)
      } catch (error) {
        console.error(error);
      }
    }
    makeAPICallUse()
  }, [successAPICall, makeAPICall, pageNumber, orderBy])

  return { hasMore }
}


export default useStockPaginate
