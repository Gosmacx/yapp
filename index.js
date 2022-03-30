const express = require('express')
const cors = require('cors')
const ytsr = require('ytsr');
const ytdl = require('ytdl-core')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

app.post("/youtubeSearch", async (req, res) => {
    const { searchText }  = req.query
    if (!searchText) return res.status(400).send('Hatalı kullanım')
    let result = await ytsr(`${searchText}`, { pages: 0 })
    if (!result || result.length == 0 ) return res.status(400).send('Bulunamadı')

    res.send(result)

})

app.post("/getSong", async (req, res) => {
    const { url }  = req.query

    if (!url) return res.status(400).send('Hatalı kullanım 2.')
    const regexYT = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/
    const succes = url.match(regexYT)
    if (!succes) return res.status(400).send('Hatalı kullanım 3.')

    let stream = ytdl(`${url}`, { filter: "audioonly", quality: "lowestaudio" }).pipe(res)
})

app.listen(PORT, () => {
    console.log(`${PORT} Portu üzerinde dans ediliyor. `)  
})