
import firebaseAdmin from 'firebase-admin';
import serviceAccount from '../../pems/NOWnews-project-firebase.json';
import chalk from 'chalk';

module.exports = () => {

    // init firebase
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL: 'https://spry-smithy-96510.firebaseio.com'
    });
    console.log(chalk.yellow('Firebase initializeApp done.'))

    return (req, res, next) => {
        return next();
    };
};
