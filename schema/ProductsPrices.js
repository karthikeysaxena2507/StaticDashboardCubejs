cube(`ProductsPrices`, {
  sql: `SELECT * FROM \`productsDB\`.products_prices`,
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [city]
    },
    
    cost: {
      sql: `${CUBE}.\`prices.Cost\``,
      type: `sum`,
      title: `Cost`
    },
    
    numberOfOrders: {
      sql: `${CUBE}.\`prices.orders_count\``,
      type: `sum`,
      title: `numberOfOrders`
    }
  },
  
  dimensions: {
    city: {
      sql: `${CUBE}.\`prices.City\``,
      type: `string`,
      title: `City`,
      primaryKey: true,
      shown: true
    }
  }
});
