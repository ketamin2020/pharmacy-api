const axios = require("axios");

module.exports = function MessagingCenter() {
  // this.host = "https://cpa3.kyivstar.ua/api/contents/sms";
  this.host = "https://api-gateway.kyivstar.ua/mock/rest/v1beta/sms";
  this.auth_host = "https://api-gateway.kyivstar.ua/idp/oauth2/token";
  this.source = "ARTMED";
  this.serviceType = "104";
  this.bearerType = "sms";
  this.contentType = "text/plain";
  this.token =
    "ASYyFcu54Qh5yS3SaZNgw9UPKPYDS2fJnznLd4RphWs.T2V7HLCMvbCpjCYSopmq-HokFRCxHKfiag4daUfpO8s";

  this.auth_crendential =
    "Basic " +
    Buffer.from(
      `${process.env.KYIVSTAR_CLIENT_ID}:${process.env.KYIVSTAR_CLIENT_SECRET}`
    ).toString("base64");

  this.template = function (params) {
    const message = {
      from: "ARTMED",
      to: "380985369386",
      text: "Hello World!",
      // source: this.source,
      // destination: params.destination,
      // serviceType: this.serviceType,
      // bearerType: this.bearerType,
      // contentType: this.contentType,
      // content: params.content,
    };

    return message;
  };

  this.api_get_auth = async function api_get_auth() {
    const config = {
      method: "post",
      url: this.auth_host,

      headers: {
        Authorization: this.auth_crendential,
      },
      data: "grant_type=client_credentials",
    };

    axios(config)
      .then((data) => data)
      .then(() => this.api_send_message({}))
      .catch((error) => console.log(error));
  };

  this.api_send_message = async function api_send(params) {
    const data = this.template(params);

    const headers = {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };

    console.log(data, "data");
    try {
      const response = await axios.post(this.host, data, { headers });

      if (response.status === 200) {
        console.log("Сообщение успешно отправлено.", response);
      } else {
        console.error("Ошибка при отправке сообщения:", response.data);
      }
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  return this;
};
