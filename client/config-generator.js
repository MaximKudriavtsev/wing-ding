const fs = require('fs')

let SERVER_CONFIG = process.env.SERVER_CONFIG;

let template = `
export default {
  SERVER_CONFIG: '${SERVER_CONFIG}',
}
`

fs.writeFile('config.js', template, function (err) {
  if (err) {
    return console.log(err)
  }
  console.log('Configuration file has generated')
})
