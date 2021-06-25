/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express = require('express')
const cors = require('cors')
const app = express()
const axios = require('axios').default
const apiKey = 'AIzaSyC_28L2bV2wGcZZqk_0NbReNJBNV4V5BNI'
const port = 3001
app.use(cors())

app.get('/', (req, res) => {
  res.send('Video Player API')
})

app.get('/check-mime', async (req, res) => {
  await axios.head(req.query.u)
    .then((response) => {
      res.send(response.headers['content-type'])
    }).catch(() => { res.send(false) })
})

app.get('/check-gdrive-permissions', async (req, res) => {
  await axios.get(`https://www.googleapis.com/drive/v3/files/${req.query.contentId}?key=${apiKey}`)
    .then((response) => {
      res.send(response.data)
    }).catch(() => { res.send(false) })
})

app.get('/check-youtube-permissions', async (req, res) => {
  await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${req.query.contentId}&part=snippet,contentDetails&key=${apiKey}`)
    .then((response) => {
      res.send(response.data)
    }).catch(() => { res.send(false) })
})

app.listen(process.env.PORT || port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
