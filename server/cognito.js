const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLIENT_ID
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const registerUser = (userDetails, callback) => {
    const { name, email, password, gender, birthdate } = userDetails;

    const attributeList = [
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'name', Value: name }),
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: email }),
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'gender', Value: gender }),
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'birthdate', Value: birthdate }),
    ];  
    userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
            console.error(err);
            callback(err, null);
            return;
        }
        const cognitoUser = result.user;
        console.log('User registration successful:', cognitoUser.getUsername());
        callback(null, cognitoUser.getUsername());
    });
};

function authenticateUser(username, password) {
    const authenticationData = { Username: username, Password: password };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: username,
        Pool: userPool
    });

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
            console.log('Authentication Successful', session);
        },
        onFailure: (err) => {
            console.error('Authentication failed', err);
        }
    });
};

module.exports = {
    registerUser,
    authenticateUser
};