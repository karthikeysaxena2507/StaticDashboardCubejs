cube(`Products`, {
  sql: `SELECT * FROM \`productsDB\`.products`,
  
  joins: {
    ProductsPrices: {
    sql: `${Products}._id = ${ProductsPrices}._id`,
    relationship: `hasMany`
}
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [name]
    }
  },
  
  dimensions: {
    name: {
      sql: `name`,
      type: `string`,
      title: `name`,
      primaryKey: true,
      shown: true
    }
  }
});
