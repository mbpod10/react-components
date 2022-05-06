import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import StockContext from "./stock-context"

const useStockPaginate = (pageNumber) => {

  const [hasMore, setHasMore] = useState(false)

  const { makeAPICall, successAPICall } = useContext(StockContext)

  useEffect(() => {
    makeAPICall('list')
    const makeAPICallUse = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/stocks/list/page/${pageNumber}`)
        // successAPICall([...stocks, ...response.data.stocks])
        successAPICall(response.data.stocks)
        setHasMore(response.data.stocks.length > 0)
      } catch (error) {
        console.error(error);
      }
    }
    makeAPICallUse()
  }, [successAPICall, makeAPICall, pageNumber])

  return { hasMore }
}

export default useStockPaginate