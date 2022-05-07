import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import StockContext from "./stock-context"

const useStockPaginate = (pageNumber, orderBy) => {

  const [hasMore, setHasMore] = useState(false)

  const { makeAPICall, successAPICall } = useContext(StockContext)

  // const name = 'amount'

  useEffect(() => {
    makeAPICall('list')
    const makeAPICallUse = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/stocks/list/page/${pageNumber}/${orderBy}`)
        // ,
        //   { params: { order_query: "name" } })
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
