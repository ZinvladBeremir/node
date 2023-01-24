const fs = require('fs')

const sendStream = async (req, res) => {
    // const path = 'views/sample.mkv'
    const path = 'views/fantastic_beasts.mkv'
    // const path = 'views/123.mkv'
    // const path = 'views/video_sea.mp4'
    // const path = 'views/some_video.mov'

    const range = req.headers.range
    const videoSize = fs.statSync(path).size
    const chunkSize = 1e6;
    const start = Number(range.replace(/\D/g, ''))
    const end = Math.min(start + chunkSize, videoSize - 1)
    const contentLength = end - start + 1

    const headers = {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'video/x-matroska', // quicktime | x-matroska | mp4
    }

    res.writeHead(206, headers)
    fs.createReadStream(path, {start, end}).pipe(res)
}

const sendBuffer = async (req, res) => {
    const path = 'views/video_sea.mp4'

    fs.readFile(path, (error, data) => {
        if(error) {
            console.log('error', error)
        }
        res.writeHead(200, {'Content-Type': 'video/mp4'})
        res.end(data)
    })
}

module.exports = { sendStream, sendBuffer }
