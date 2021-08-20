import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
const router = express.Router();
import axios from 'axios';
router.post('/flow-data', async (req, res) => {
    const jsonData = "```\n"+readMockJson()+"\n```";
    try {
    const slackResult = await axios.post(process.env.SLACK_WEB_HOOK , 
        {
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": jsonData
                    }
                },
            ]
        }
        )
    } catch (e){
        console.log("Exception");
        console.log(e);
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        result: "Success!"
    })
})

function readMockJson() {
    const feedbacks = fs.readFileSync(path.resolve(__dirname, '../../mockData.json'), 'utf8');
    return JSON.stringify(JSON.parse(feedbacks), undefined, 4);
};

router.post('/flow', async (req, res) => {
    const feedback = req.query.q;
    const ts = new Date().toISOString();
    // send to slack
    const slackResult = await axios.post(process.env.SLACK_WEB_HOOK , 
        {
            "blocks": [
                {
                    "type": "image",
                    "title": {
                        "type": "plain_text",
                        "text": "Build Details!",
                        "emoji": true
                    },
                    "image_url": "https://raw.githubusercontent.com/subratsf/flow-bot/master/flow-image.png",
                    "alt_text": "marg"
                }
            ]
        }
        )
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        result: "Success!"
    })
})

export default router;