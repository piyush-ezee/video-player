/* eslint-disable @typescript-eslint/no-unused-vars */
const express = require('express')
const cors = require('cors')
const app = express()
const axios = require('axios').default
const port = 3001
app.use(cors())

app.get('/', (req, res) => {
  res.send('Video Player API')
})

app.get('/check-mime', async (req, res) => {
  res.send(await axios.head(req.query.u).then((response) => {
    return response.headers['content-type']
  }))
})

app.get('/check-gdrive-permissions', (req, res) => {
  res.send('Video Player API')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
