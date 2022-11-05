import ENV from './../config.js'
const API_HOST = ENV.api_host

export const getChannelInfo = (infoType, channelId) => {
  const url = `${API_HOST}/api/${infoType}/${channelId}`;

  return fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .catch(error => {
      console.log(error);
    });
};
