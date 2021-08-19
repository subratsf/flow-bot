import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
const router = express.Router();
import axios from 'axios';
import {Constants} from './../constants';
router.post('/flow-data', async (req, res) => {
    const jsonData = "```\n"+readMockJson()+"\n```";
    const slackResult = await axios.post(Constants.SLACK_WEB_HOOK , 
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
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        result: "Success."
    })
})

function readMockJson() {
    const feedbacks = fs.readFileSync(path.resolve(__dirname, '../../mockData.json'), 'utf8');
    return JSON.parse(feedbacks);
};

router.post('/flow', async (req, res) => {
    const feedback = req.query.q;
    const ts = new Date().toISOString();
    // send to slack
    const slackResult = await axios.post(Constants.SLACK_WEB_HOOK , 
        {
            "blocks": [
                {
                    "type": "image",
                    "title": {
                        "type": "plain_text",
                        "text": "Here is where we get a graph of leader board across clouds",
                        "emoji": true
                    },
                    "image_url": "https://image.shutterstock.com/image-vector/3d-chart-graph-info-graphics-600w-345688763.jpg",
                    "alt_text": "marg"
                }
            ]
        }
        )
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        result: "Success."
    })
})

export default router;