# Problems

I spent close to 9 hours trying to get the stocks to successfully paginate with inifite scroll. However, when the scroller would go to the bottom of the page and the ref was visible, the whole page would rerender and bring the user back to the top. The problem was that I was using condition rendering that included a return function when creating the ref.

```js
// Ref function
const lastStockElement = useCallback(node => {
    if (stockListLoading) return // <=====================
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        nextPage()
      }
    })
    if (node) {
      observer.current.observe(node)
    }
  }, [stockListLoading, hasMore, nextPage])
```
I did this: 
```js
  {stockListLoading ? <Loader /> : // <====================
        <div className={classes.table}>
          <Table responsive="xl">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Trade</th>
                <th>Price</th>
                <th>Owned</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {cardMapList}
            </tbody>
          </Table>
        </div>
      }
```

Instead of this 
```js
 <div className={classes.table}>
        <Table responsive="xl">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Trade</th>
              <th>Price</th>
              <th>Owned</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {cardMapList}
          </tbody>
        </Table>
      </div>
      {stockListLoading && <Loader />} // <===================
```