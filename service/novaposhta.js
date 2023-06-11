"use strict";

const request = require("request");

module.exports = function NovaPoshta() {
  this.host = process.env.NOVA_POSTA_API_PATH;
  this.key = process.env.NOVA_POSTA_API_KEY;

  this.api_search_by_address = async function api(
    CityName,
    Limit,
    Page,
    callback,
    callbackerr
  ) {
    if (!CityName || !Limit || !Page) {
      throw new Error("Params is not defined");
    }

    const requestData = JSON.stringify({
      apiKey: this.key,
      modelName: "Address",
      calledMethod: "searchSettlements",
      methodProperties: {
        CityName: CityName,
        Limit: Limit,
        Page: Page,
      },
    });

    await request.post(
      this.host,
      {
        body: requestData,
        headers: {
          "Content-Type": "application/json",
        },
      },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          callback(body);
        } else {
          callbackerr(error, response);
        }
      }
    );
  };
  this.api_search_by_werehouse = async function api(
    CityName,
    Limit,
    Page,
    CityRef,
    callback,
    callbackerr
  ) {
    if (!CityName || !Limit || !Page) {
      throw new Error("Params is not defined");
    }

    const requestData = JSON.stringify({
      apiKey: this.key,
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityName: CityName,
        CityRef: CityRef,
        Page: Page,
        Limit: Limit,
        Language: "UA",
      },
    });

    await request.post(
      this.host,
      {
        body: requestData,
        headers: {
          "Content-Type": "application/json",
        },
      },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          callback(body);
        } else {
          callbackerr(error, response);
        }
      }
    );
  };

  return this;
};
