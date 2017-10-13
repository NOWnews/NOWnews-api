
import firebaseAdmin from 'firebase-admin';
import serviceAccountProd from '../pems/NOWnews-project-firebase-prod.json';
import serviceAccountDev from '../pems/NOWnews-project-firebase-dev.json';
import chalk from 'chalk';

module.exports = () => {

    console.log(chalk.yellow('Firebase initializeApp Start.'))
    if (firebaseAdmin.apps.length > 0) {
        return;
    }
    const isProd = process.env.NODE_ENV === 'production';
    const serviceAccount = isProd ? serviceAccountProd : serviceAccountDev;
    const databaseURL = isProd ? 'https://spry-smithy-96510.firebaseio.com' : 'https://nownews-website-167108.firebaseio.com';

    // init firebase
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL,
    });
    console.log(chalk.yellow('Firebase initializeApp done.'))

    return;
};
