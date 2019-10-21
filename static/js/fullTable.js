const {Client} = require('pg')
const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "postgres"
})


client.connect()
    .then(() => console.log("connected successfully"))
    .then(() => client.query("select * from nutrition_clean" ))
    .then(results => console.table(results.rows))
    .catch(e => console.log(e))
    .finally( () => client.end() )

