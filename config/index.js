require("dotenv").config();
const config = {
  sms: {
    smsSecret: process.env.SMS_SECRET,
    smsSendURL: process.env.SMS_URL_SEND,
    smsCheckUrl: process.env.SMS_URL_CHECK,
    smsSender: process.env.SMS_SENDER,
    smsChannel: process.env.SMS_CHANNEL,
  },
};

module.exports = config;
