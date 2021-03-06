import { useState, useContext, useEffect, useMemo } from 'react'
import axios from 'axios'
import StockContext from './stock-context'
import { API } from '../config/nodeAPIAuth'

const useMoneyAmount = () => {

  const [totalAmount, setTotalAmount] = useState(0)
  const { stocks } = useContext(StockContext)

  let internationalNumberFormat = useMemo(() => new Intl.NumberFormat('en-US'), [])

  useEffect(() => {
    const makeAPICallUse = async () => {
      try {
        const response = await axios.get(`${API.getTotalMoney}`)
        // const response = await axios.get(`http://127.0.0.1:8000/stocks/money/total/`)    
        let formatNumber = `$${internationalNumberFormat.format(response.data.total_amount)}`
        setTotalAmount(formatNumber)
      } catch (error) {
        console.error(error);
      }
    }
    makeAPICallUse()
  }, [stocks, internationalNumberFormat])

  return { totalAmount }

}

export default useMoneyAmount