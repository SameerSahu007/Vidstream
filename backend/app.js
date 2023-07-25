const express = require('express');
const app = express();
const cors = require('cors')
const fs = require('fs');
// const metadata = require('./metadata.json');
app.use(cors())


app.get('/metadata', (req, res) => {
    fs.readFile("./metadata.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(jsonString)
      });
})

app.get('/videoplayer/:id', (req, res) => {
    const range = req.headers.range
    const videoPath = `./static/${req.params.id}.webm`
    // console.log(videoPath)
    const videoSize = fs.statSync(videoPath).size
    const chunkSize = 1e6;
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start + chunkSize, videoSize - 1)
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers)
    const stream = fs.createReadStream(videoPath, {
        start,
        end
    })
    stream.pipe(res)
})


app.listen(8000, () => {
console.log("Running on port", 8000)
})            