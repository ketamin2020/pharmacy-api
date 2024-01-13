const axios = require("axios");

module.exports = function MessagingCenter() {
  this.host = "https://cpa3.kyivstar.ua/api/contents/sms";
  this.auth_host = "https://cpa3.kyivstar.ua/api/contents";
  this.source = "ARTMED";
  this.serviceType = "104";
  this.bearerType = "sms";
  this.contentType = "text/plain";

  this.auth_crendential =
    "Basic " +
    Buffer.from(`${"ARTMED"}:${"VZ4TqupxSbRvxLwt"}`).toString("base64");

  this.template = function (params) {
    const message = {
      source: this.source,
      destination: "380985369386",
      serviceType: this.serviceType,
      bearerType: this.bearerType,
      contentType: this.contentType,
      content: "Hello from ARTMED",
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
    };

    axios(config)
      .then((data) => {
        console.log(data, "data");
        this.api_send_message(data.data);
      })
      .catch((error) => console.log(error));
  };

  this.api_send_message = async function api_send(params) {
    const data = this.template(params);

    const headers = {
      Authorization: `Bearer ${params.access_token}`,
      "Content-Type": "application/json",
    };

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
