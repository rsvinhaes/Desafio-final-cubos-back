const aws = require('aws-sdk')

const s3 = new aws.S3({
  endpoint: new aws.Endpoint(process.env.BACK_BLAZER_ENDPOINT),
  credentials: {
    accessKeyId: process.env.BACK_BLAZER_KEYID,
    secretAccessKey: process.env.BACK_BLAZER_APKKEY
  }
})

module.exports = {
  s3
}
