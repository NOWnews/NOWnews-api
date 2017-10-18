import config from 'config';
import firebaseAdmin from 'firebase-admin';
import chalk from 'chalk';
const pemKey = config.get('admin.firebase.key');
const databaseURL = config.get('admin.firebase.databaseURL');
const serviceAccount = require(`../${pemKey}`);
module.exports = () => {

    console.log(chalk.yellow('Firebase initializeApp Start.'))
    if (firebaseAdmin.apps.length > 0) {
        return;
    }

    // init firebase
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL,
    });
    console.log(chalk.yellow('Firebase initializeApp done.'))

    return;
};
