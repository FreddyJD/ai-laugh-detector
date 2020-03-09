const mp3 = require("youtube-mp3-downloader");
const express = require('express');

const { Board, Servo } = require("johnny-five");

const wait = require('waait');
const fs = require('fs')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3001
const board = new Board();

const mp3d = new mp3({
    "outputPath": "./",
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

app.use(cors())


board.on("ready", async () => {
    const servo = Servo.Continuous(10);
    app.post('/video/:videoId', async (req, res) => {
        const { videoId } = req.params;
        const inputVideo = `${videoId}.mp3`;

        console.log(' this is the first thing')
        // mp3 download from youtube 
        mp3d.download(videoId, inputVideo);
        console.log(' loaded youtube video')

        let output = await execShellCommand(`python segment_laughter.py ${inputVideo} models/model.h5 output 0.8 0.1`);
        console.log(' made it')
        output = output.split('laughs.');
        output = output[1].split('\n');
        output.shift();
        output.pop();
        console.log(output)
        output = output.join(',');
        output = '[' + output + ']';
        output = output.replace(/'/g, '"');
        fs.writeFileSync(`./${videoId}.json`, output);
        res.send('cool');
    })

    app.get('/video/:videoId/:second', async (req, res) => {
        const { videoId, second } = req.params
        let laughs = JSON.parse(fs.readFileSync(`./${videoId}.json`, 'utf8'))

        let shoot = false;
        laughs.map((laugh, index) => {
            second = second - 1
            if (laugh.end > second && laugh.start < second) {
                shoot = true;
                console.log(index)
                delete laughs[index];
            }
        });

        if (shoot === true) {
            servo.ccw();
            await wait(1000);
            servo.cw();
        }

        laughs = JSON.stringify(laughs);
        laughs = laughs.replace('null,', '');
        laughs = laughs.replace('null', '');
        fs.writeFileSync(`./${videoId}.json`, laughs)

        return res.json({ shoot });

    })

    app.listen(port, () => console.log(`Server runing in ${port}!`));
});


