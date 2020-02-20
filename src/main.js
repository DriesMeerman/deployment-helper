import express from 'express';
import rateLimit from 'express-rate-limit';
import * as childProcess from 'child_process';

import { Logger } from './helpers/logger';
import { loadConfig } from './helpers/configLoader';

const port = 4141;
const app = express();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15 // limit each IP to 15 requests per windowMs
});

app.use(limiter);


app.get('/hooks/:token', (req, res) => {
    const token = req.params.token;
    const conf = loadConfig('./config/config.json');

    if (!token) res.sendStatus(400);

    if (!conf || !conf.deployments) {
        res.sendStatus(500);
    }

    const deployment = conf.deployments.find(item => item.key === token);

    if (!deployment) {
        Logger.warn('Did not find deployment for token');
        return res.sendStatus(200);
    }
    
    Logger.info('Going to run: ', deployment.script);
    childProcess.exec(deployment.script, function(err, stdout, stderr){
        if (err) {
         Logger.error(err);
         return res.sendStatus(500);
        }
        Logger.info(stdout, stderr);
        res.status(200);
        res.send(stdout);
      });
});

app.listen(port, () => Logger.info(`Example app listening on port ${port}!`))