const AWS = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const { userName, userPoolId } = event;

  try {
    // Assign the user to a specific group
    await addUserToGroup({
      userPoolId,
      username: userName,
      groupName: 'Users', // <-- Specify the group name you want to assign users to
    });

    // Return success
    return callback(null, event);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
      }),
    };
  }
};

async function addUserToGroup({ userPoolId, username, groupName }) {
  const params = {
    GroupName: "TEST",
    UserPoolId: "ap-southeast-1_7oLYsUvn6",
    Username: "xv.sachin.raut@singtel.com",
  };

  const cognitoIdp = new AWS.CognitoIdentityServiceProvider();
  await cognitoIdp.adminAddUserToGroup(params).promise();
}
