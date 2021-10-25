const {Client} = require ('pg');
const {host, port, user, password, database} = require('./secrets/db_configuration')
const client = new Client ({host, port, user, password, database})


client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })




module.exports=client;