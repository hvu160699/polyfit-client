
const keyFilename = "./google-services.json"; //replace this with api key file
const projectId = "polyfitapp" //replace with your project id
const bucketName = `${projectId}.appspot.com`;

const gcs = require('@google-cloud/storage')({
    projectId,
    keyFilename
});

const bucket = gcs.bucket(bucketName);
