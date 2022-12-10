const axios = require("axios");

const requestBuilder = async ({ uri, body }) => {
  console.log(body);
  try {
    let url = process.env.API_GATEWAY_URL + "/AOC" + uri;
    console.log(url);
    let request = await axios({
      url: url,
      method: "POST",
      data: body,
      headers: {
        workspace: "CLK-WEB-88447876-4696-4417-b985-f14a725c0ee1",
        passmein: true,
      },
    });
    return request;
  } catch (error) {
    console.log(error.request);
    console.log(error.response);
    throw error;
  }
};
module.exports = requestBuilder;

