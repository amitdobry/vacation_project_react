const crypto = require("crypto");

// SHA: Secure Hashing Algorithm
// HMAC: Hash based Message Authentication Code

function hash(plainText) {

    if(!plainText) return null;

    // Hashing without salt:
    // return crypto.createHash("sha512").update(plainText).digest("hex");

    // Hashing with salt:
    const salt = "MakeThingsGoRight"
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

module.exports = {
    hash
};