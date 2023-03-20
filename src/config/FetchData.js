import { API } from "./API";

const gogoAnime = "/anime/gogoanime";
const aniList = "/meta/anilist";

export const fetchPopular = async (page, perPage) => {
  try {
    const res = await API.get(`${aniList}/popular?page=${page}&perPage=${perPage}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLatest = async (page, perPage, provider) => {
  try {
    const res = await API.get(`${aniList}/recent-episodes?page=${page}&perPage=${perPage}&provider=${provider}`);
    // const res = await API.get(`${gogoAnime}/recent-episodes?page=${page}&perPage=${perPage}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopAiring = async (page, perPage, weekStart) => {
  try {
    // const res = await API.get(`${gogoAnime}/top-airing`);
    const res = await API.get(`${aniList}/airing-schedule?page=${page}&perPage=${perPage}&weekStart${weekStart}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSearch = async (query, page) => {
  try {
    const res = await API.get(`${aniList}/${query}?page=${page}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAnimeDetail = async (id, provider) => {
  try {
    const res = await API.get(`${aniList}/info/${id}?provider=${provider}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPlayAnime = async (epsId) => {
  try {
    const res = await API.get(`${aniList}/watch/${epsId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const testingPlay = async (epsId) => {
  try {
    const res = await API.get(`${aniList}/watch/${epsId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const testingRecent = async (page, type) => {
  try {
    const res = await API.get(`${gogoAnime}/recent-episodes?page=${page}&type=${type}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
