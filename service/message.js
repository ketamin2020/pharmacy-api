const axios = require("axios");

module.exports = function MessagingCenter() {
  // this.host = "https://cpa3.kyivstar.ua/api/contents";
  this.host = "https://api-gateway.kyivstar.ua/mock/rest/v1beta/sms";
  this.auth_host = "https://api-gateway.kyivstar.ua/idp/oauth2/token";
  this.source = "ARTMED";
  this.serviceType = "104";
  this.bearerType = "sms";
  this.contentType = "text/plain";

  this.auth_crendential =
    "Basic " +
    Buffer.from(
      `${process.env.KYIVSTAR_CLIENT_SECRET}:${process.env.KYIVSTAR_CLIENT_ID}`
    ).toString("base64");

  this.template = function (params) {
    const message = {
      source: this.source,
      destination: params.destination,
      serviceType: this.serviceType,
      bearerType: this.bearerType,
      contentType: this.contentType,
      content: params.content,
    };

    return message;
  };

  this.api_get_auth = function api_get_auth() {
    const config = {
      method: "post",
      url: this.auth_host,

      headers: {
        Authorization: this.auth_crendential,
      },
      data: "grant_type=client_credentials",
    };

    console.log(
      config,
      process.env.KYIVSTAR_CLIENT_SECRET,
      process.env.KYIVSTAR_CLIENT_ID
    );

    axios(config)
      // .then((data) => console.log(data, "data"))
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

  this.send_auth_message = function send_auth_message(params) {
    let language = "ru";

    if (params.language) {
      language = params.language;
    }

    params = this.cnb_params(params);
    const data = Buffer.from(JSON.stringify(params)).toString("base64");
    const signature = this.str_to_sign(private_key + data + private_key);

    return (
      '<form method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8">' +
      '<input type="hidden" name="data" value="' +
      data +
      '" />' +
      '<input type="hidden" name="signature" value="' +
      signature +
      '" />' +
      '<input type="image" src="//static.liqpay.ua/buttons/p1' +
      language +
      '.radius.png" name="btn_text" />' +
      "</form>"
    );
  };

  return this;
};
