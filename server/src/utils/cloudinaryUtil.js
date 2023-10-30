const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

exports.uploadImage = (buffer, folderName) => {
    const promise = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder: folderName },
            (err, result) => {
                if (err) {
                    return reject(err);
                }

                resolve(result);
            });

        streamifier.createReadStream(buffer).pipe(uploadStream);
    });

    return promise;
};

exports.deleteImage = async (imagePublicId) => await cloudinary.uploader.destroy(imagePublicId);