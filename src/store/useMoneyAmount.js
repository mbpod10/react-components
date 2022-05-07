import React, { useState, useContext, useEffect, useMemo } from 'react'
import axios from 'axios'
import StockContext from './stock-context'

const useMoneyAmount = () => {

  const [totalAmount, setTotalAmount] = useState(0)
  const { stocks } = useContext(StockContext)

  let internationalNumberFormat = useMemo(() => new Intl.NumberFormat('en-US'), [])

  useEffect(() => {
    const makeAPICallUse = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/stocks/money/total`)
        let formatNumber = `$${internationalNumberFormat.format(response.data.total_amount)}`
        setTotalAmount(formatNumber)
        console.log(formatNumber)
      } catch (error) {
        console.error(error);
      }
    }
    makeAPICallUse()
  }, [stocks, internationalNumberFormat])

  return { totalAmount }

}

export default useMoneyAmount