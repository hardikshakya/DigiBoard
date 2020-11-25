const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const l10n = require('jm-ez-l10n');

const logger = require('./helper/logger.js');
const apiRoute = require('./routes');
const db = require('./models');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

l10n.setTranslationsFile('en', './language/translation.en.json');

app.use(l10n.enableL10NExpress);
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ limit: '1gb', extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '1gb' }));
app.use(cors());
app.use('/api', apiRoute);

app.listen(PORT, async () => {
    logger.info(`Express server listening on port ${PORT}`);
    await db.sequelize.authenticate();
    logger.info(`Database Connected!`);
});
