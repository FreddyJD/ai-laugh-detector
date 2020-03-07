const mp3 = require("youtube-mp3-downloader");
const Mp32Wav = require('mp3-to-wav');
const five = require("johnny-five");
const wait = require('waait');
const express = require('express');

const app = express();
const port = process.env.PORT || 3001

// const board = new five.Board();

const mp3d = new mp3({
    "outputPath": "./input",
    "youtubeVideoQuality": "lowest",
    "queueParallelism": 2,
    "progressTimeout": 2000
})

function execShellCommand(cmd) {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout ? stdout : stderr);
        });
    });
}

// sends a 404 if not found and 200 if its alright

app.post('/video/:videoId', async (req, res) => {
    const { videoId } = req.params;
    const inputVideo = `./input/${videoId}.mp3`;
    
    // mp3 download from youtube 
    mp3d.download(videoId, videoId + '.mp3');
    
    // mp3 to wav converter
    new Mp32Wav(inputVideo).exec()

    // execute the AI script
    await execShellCommand(`python ./segment_laughter.py ./input/${videoId}.wav ./models/model.h5 ./outpout 0.8 0.1`)


})

app.get('/video/:videoId/:second', async (req, res) => {
    console.log(req.params);
    // servo.ccw();
    // await wait(1000);
    // servo.cw();
    // return res.send(200)

})

app.listen(port, () => console.log(`Server runing in ${port}!`));
// });


