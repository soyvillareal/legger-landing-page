const URL = 'http://localhost';

const prepareParams = (params) => {
  let parameters = "",
    objectKeys = Object.keys(params);
  if (objectKeys.length > 0) {
    objectKeys.forEach((p) => {
      if (parameters === "") {
        parameters += `?${p}=${params[p]}`;
      } else {
        parameters += `&${p}=${params[p]}`;
      }
    });
  }
  return parameters;
};

export const post = (
  page,
  data = {},
  callbackOk = (e) => {},
  callbackError = (e) => {},
  params = {}
) => {
  const parameters = prepareParams(params);
  fetch(
    `${URL}/legger-landing-page/server/api/create/${page}${parameters}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  ).then((data) => {
    if (data.status === 201) {
      callbackOk();
    } else callbackError();
  });
};

export const get = (
  page,
  params = {},
  callbackOk = (e) => {},
  callbackError = (e) => {}
) => {
  const parameters = prepareParams(params);
  fetch(
    `${URL}/legger-landing-page/server/api/read/${page}${parameters}`
  )
    .then(async (data) => {
      var ress = {};
      await data
        .json()
        .then((result) => {
          ress = result;
        })
        .catch((error) => {
        });
      if (data.status === 200) {
        callbackOk(ress);
      } else callbackError(ress);
    })
    .catch((error) => {
      console.log(error);
    });
};
