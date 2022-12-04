const express = require("express");
const cors = require("cors");
const url = require("url");
const { YMApi, WrappedYMApi } = require("ym-api");
const { default: axios } = require("axios");

const api = new YMApi();

const wrappedApi = new WrappedYMApi();

const app = express();

const PORT = 3002;

const username = "fantaser69@yandex.ru"; //fantaser420
const password = "89112351404l"; //"89112351404lL";
app.use(cors());
app.use(express.json());
const initApi = async (username, password) => {
  await api.init({
    /*  username: username,
    password: password, */
    username: username,
    password: password,
  });
};

const initWrappedApi = async (username, password) => {
  await wrappedApi.init({
    username: username,
    password: password,
  });
};

app.get(
  /\/validate-password\/username=(.+)\/password=(.+)/,
  async (req, res) => {
    try {
      await initApi(req.params["0"], req.params["1"]);
      res.status(200).end();
    } catch (error) {
      console.log(error);
      res.status(400).end();
    }
  }
);
app.get(
  /\/rotor\/station=(.+)\/username=(.+)\/password=(.+)/,
  async (req, res) => {
    try {
      const stationType = req.params[0];
      await initApi(req.params["1"], req.params["2"]);
      const userToken = api.user.token;
      console.log(api.user.token);
      const getRotor = await axios.get(
        `https://api.music.yandex.net/rotor/station/${stationType}/tracks?settings2=true` /*  "https://api.music.yandex.net/rotor/account/status" */,
        {
          headers: {
            Authorization: `OAuth ${userToken}`,
          },
        }
      );
      res.json(getRotor.data);
    } catch (error) {
      console.log(error);
    }
  }
);

app.post(
  /\/rotor\/station=(.+)\/settings\/username=(.+)\/password=(.+)/,
  async (req, res) => {
    try {
      const body = req.body;
      if (!api.user.token) {
        const username = req.params[1];
        const password = req.params[2];
        await initApi(username, password);
      }
      const token = await api.user.token;
      const stationType = req.params[0];
      await axios.post(
        `https://api.music.yandex.net/rotor/station/${stationType}/settings2`,
        body,
        {
          headers: {
            Authorization: `OAuth ${token}`,
          },
        }
      );
      res.status(200).end();
    } catch (error) {
      console.log(error);
      res.status(400).end();
    }
  }
);

app.get(/\/similar\/(.+)/, async (req, res) => {
  try {
    const getSimilarTracks = await axios.get(
      `https://api.music.yandex.net/tracks/${req.params[0]}/similar`
    );
    res.json(getSimilarTracks.data);
  } catch (error) {
    console.log(error);
  }
});

app.get(/\/user-playlists\/username=(.+)\/password=(.+)/, async (req, res) => {
  try {
    await initApi(req.params["0"], req.params["1"]);
    const user = await api.getAccountStatus();
    const result = await api.getUserPlaylists(user.account.uid);
    const getFavourites = await api.getPlaylist(3, user.account.uid);
    res.send([
      {
        ...getFavourites,
        cover: {
          type: "pic",
          uri: "music.yandex.ru/blocks/playlist-cover/playlist-cover_like.png",
        },
        title: "Мне нравится",
      },
      ...result,
    ]);
  } catch (error) {
    console.log(error);
  }
});

app.post(/\/play-audio\/username=(.+)\/password(.+)/, async (req, res) => {
  try {
    //TODO ПОЧИСТИТЬ КОД ЕПТА
    if (!api.user.token) {
      await initApi(req.params["0"], req.params["1"]);
    }
    const user = await api.getAccountStatus();
    const userToken = await api.user.token;
    const clientNow = new Date(user.account.now);
    const userId = user.account.uid;
    const nowToISO = clientNow.toISOString();

    const yandexRequestJson = {
      ...req.body,
      "client-now": nowToISO,
      timestamp: nowToISO,
      uid: userId,
      "from-cache": "False",
    };

    const urlParams = Object.entries(yandexRequestJson)
      .map((e) => e.join("="))
      .join("&");

    console.log(`${urlParams}\n`);

    await axios.post(
      `https://api.music.yandex.net/play-audio?${urlParams}`,
      yandexRequestJson,
      {
        headers: {
          Authorization: `OAuth ${userToken}`,
          "X-Yandex-Music-Client-Now": nowToISO,
          "X-Yandex-Music-Client": "WindowsPhone/4.52",
          "X-Yandex-Music-Device":
            "os=Windows.Desktop; os_version=10.0.22000.978; manufacturer=Gigabyte Technology Co., Ltd.; model=Z370P D3; clid=WindowsPhone; device_id=03003236030060AC0500D30905000874050044A8060001000400AA1F010058040200CA3A0900E8A6; uuid=generated-by-music-f043d1b2-2e20-47ae-b5e8-9973ffeb4fde",
        },
      }
    );
    res.status(200).end();
  } catch (error) {
    res.send(error);
  }
});
app.get(
  /\/playlists\/info\/user=(.+)\/kind=(.+)\/username=(.+)\/password=(.+)/,
  async (req, res) => {
    try {
      if (!wrappedApi) {
        await initWrappedApi(req.params["2"], req.params["3"]);
      }
      const result = await wrappedApi.getPlaylist(
        `https://music.yandex.ru/users/${req.params["0"]}/playlists/${req.params["1"]}`
      );
      const tracksInfo = {
        //gets file information(bitrate, url)
        ...result,
        metadata: "web-own_albums-album-track-fridge",
      };
      res.send(tracksInfo);
    } catch (error) {
      console.log(error);
    }
  }
);

app.get(/\/album\/with-tracks\/id=(.+)/, async (req, res) => {
  try {
    const albumId = req.params[0];
    const { data } = await axios.get(
      `https://api.music.yandex.net/albums/${albumId}/with-tracks`
    ); //web-own_albums-album-track-fridge
    const tracksInfo = {
      //gets file information(bitrate, url)
      ...data.result,
      metadata: "web-own_albums-album-track-fridge", //TODO придумать, как сюда добавить подкасты (web-own_podcasts-album-track-fridge)
    };
    res.send(tracksInfo);
  } catch (error) {
    console.log(error);
  }
});

app.get("/rotor/info", async (req, res) => {
  try {
    const token = await api.user.token;
    const { data } = await axios.get(
      "https://api.music.yandex.net/rotor/station/user:onyourwave/info",
      {
        headers: {
          Authorization: `OAuth ${token}`,
        },
      }
    );
    res.send(data.result[0].settings2);
  } catch (error) {
    res.status(400).end();
    console.log(error);
  }
});

app.post("/rotor/feedback/", async (req, res) => {
  try {
    const userToken = await api.user.token;
    const now = new Date();
    const requestData = { ...req.body, timestamp: now.toISOString() };
    console.log(requestData);
    const feedback = await axios.post(
      `https://api.music.yandex.net/rotor/station/user:onyourwave/feedback`,
      requestData,
      {
        headers: {
          Authorization: `OAuth ${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(feedback.data);
    res.status(200).end();
  } catch (error) {
    console.log(error);
  }
});

app.get(
  /\/get-mp3-link\/id=(.+)\/username=(.+)\/password=(.+)/,
  async (req, res) => {
    try {
      await initWrappedApi(req.params["1"], req.params["2"]);
      const trackId = req.params[0];
      const trackInfo = await api.getTrack(parseInt(trackId));
      console.log(trackInfo);
      const trackUrl = await wrappedApi.getMp3DownloadUrl(parseInt(trackId));
      console.log(trackUrl);
      res.send({ url: trackUrl, info: trackInfo });
      res.status(200).end();
    } catch (e) {
      console.log(e);
    }
  }
);

app.post(
  /tracks\/favorite\/add-multiple\/username=(.+)\/password=(.+)\/track-ids=(.+)/,
  async (req, res) => {
    try {
      const username = req.params[0];
      const password = req.params[1];
      const params = new url.URLSearchParams({ "track-ids": req.params[2] });
      await initApi(username, password);
      const user = await api.getAccountStatus();
      const userId = user.account.uid;
      const token = api.user.token;
      console.log(
        await axios.post(
          `https://api.music.yandex.net/users/${userId}/likes/tracks/add-multiple/`,
          params.toString(),
          {
            headers: {
              Authorization: `OAuth ${token}`,
              "content-type": "application/x-www-form-urlencoded",
            },
          }
        )
      );
      res.status(200).end();
    } catch (error) {
      console.log(error);
    }
  }
);

app.post(
  /tracks\/favorite\/remove\/username=(.+)\/password=(.+)\/track-ids=(.+)/,
  async (req, res) => {
    try {
      const username = req.params[0];
      const password = req.params[1];
      const params = new url.URLSearchParams({ "track-ids": req.params[2] });
      await initApi(username, password);
      const user = await api.getAccountStatus();
      const userId = user.account.uid;
      const token = api.user.token;
      console.log(
        await axios.post(
          `https://api.music.yandex.net/users/${userId}/likes/tracks/remove/`,
          params.toString(),
          {
            headers: {
              Authorization: `OAuth ${token}`,
              "content-type": "application/x-www-form-urlencoded",
            },
          }
        )
      );
      res.status(200).end();
    } catch (error) {
      console.log(error);
    }
  }
);

app.get(/\/user-albums\/username=(.+)\/password=(.+)/, async (req, res) => {
  try {
    if (!api.user.token || api.user.token == "") {
      const username = req.params[0];
      const password = req.params[1];
      await initApi(username, password);
    }
    const user = await api.getAccountStatus();
    const userId = user.account.uid;
    const token = api.user.token;
    const { data } = await axios.get(
      `https://api.music.yandex.net/users/${userId}/likes/albums?rich=true`,
      { headers: { Authorization: `OAuth ${token}` } }
    );
    const mappedAlbums = data.result.map((e) => {
      if (e.album.metaType == "music") {
        return e.album;
      }
      return;
    });
    console.log(mappedAlbums);
    res.send(mappedAlbums);
  } catch (error) {
    console.log(error);
  }
});

app.get(
  /\/user-albums\/podcasts\/username=(.+)\/password=(.+)/,
  async (req, res) => {
    try {
      if (!api.user.token || api.user.token == "") {
        const username = req.params[0];
        const password = req.params[1];
        await initApi(username, password);
      }
      const user = await api.getAccountStatus();
      const userId = user.account.uid;
      const token = api.user.token;
      const { data } = await axios.get(
        `https://api.music.yandex.net/users/${userId}/likes/albums?rich=true`,
        { headers: { Authorization: `OAuth ${token}` } }
      );
      const filteredAlbums = data.result.filter((e) => {
        return e.album.metaType == "podcast";
      });
      const mappedAlbums = filteredAlbums.map((e) => {
        return e.album;
      });
      console.log(mappedAlbums);
      res.send(mappedAlbums);
    } catch (error) {
      console.log(error);
    }
  }
);

app.get(/tracks\/favorite\/username=(.+)\/password=(.+)/, async (req, res) => {
  try {
    const username = req.params[0];
    const password = req.params[1];
    await initApi(username, password);
    const user = await api.getAccountStatus();
    const userId = user.account.uid;
    const token = api.user.token;
    const { data } = await axios.get(
      `https://api.music.yandex.net/users/${userId}/likes/tracks/`,
      {
        headers: {
          Authorization: `OAuth ${token}`,
        },
      }
    );
    const trackIds = data.result.library.tracks.map((track) => {
      return track.id;
    });
    res.send(trackIds);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(PORT);
});
