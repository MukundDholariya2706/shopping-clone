const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

AWS.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: process.env.REGION,
});

// config AWS s3
const s3 = new AWS.S3();

const uploadFile = async (file) => {
  try {
    console.log(file, "file");
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME || '',
      Key: `${new Date().getTime()}-${file.originalname}`,
      Body: file.buffer,
      ACL: "public-read",
    };

    const uploadData = await s3.upload(uploadParams).promise();
    return uploadData;
  } catch (error) {
    throw error;
  }
};

const deleteFile = async (fileName) => {
  try {
    // https://shopping-clone-image.s3.amazonaws.com/1702641667764-image_2023_12_13T09_00_07_646Z.png

    const uploadParams = { Bucket: process.env.AWS_BUCKET_NAME, Key: fileName };
    await s3.deleteObject(uploadParams).promise();
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = { uploadFile, deleteFile };
