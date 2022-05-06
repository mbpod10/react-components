import { useEffect, useState, useContext, useCallback } from 'react'
import axios from 'axios'
import StockContext from "./stock-context"

const useStockPaginate = (pageNumber) => {

  const [stocks, setStocks] = useState([])
  const [stockListLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [hasMore, setHasMore] = useState(false)


  // const { makeAPICall, successAPICall } = useContext(StockContext)

  useEffect(() => {
    // makeAPICall('list')
    // setLoading(true)
    const makeAPICallUse = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/stocks/list/page/${pageNumber}`)
        // successAPICall([...stocks, ...response.data.stocks])
        setStocks(prevStocks => {
          if (prevStocks.length && response.data.stocks.length && prevStocks[0].id === response.data.stocks[0].id) {
            return prevStocks
          }
          else {
            return [...new Set([...prevStocks, ...response.data.stocks])]
          }
        })
        setHasMore(response.data.stocks.length > 0)
      } catch (error) {
        console.error(error);
      }
    }
    makeAPICallUse()
  }, [pageNumber])

  return { stocks, error, stockListLoading, hasMore }
}

export default useStockPaginate
