import axios from "axios";
import { API } from "./API";
// import { AniList } from "@consumet/extensions";
import { META } from "@consumet/extensions";

const gogoAnime = "/anime/gogoanime";
const aniList = "/meta/anilist";
const anilist = new META.Anilist();

// console.log(anilist);

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

    // console.log("LATEST ANIME :", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopAiring = async (page, perPage) => {
  try {
    // const res = await API.get(`${gogoAnime}/top-airing`);
    // const res = await API.get(`${gogoAnime}/top-airing?page=${page}`);
    const res = await API.get(`${aniList}/trending?page=${page}&perPage=${perPage}`);
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

// export const fetchAnimeDetail = async (id, provider) => {
//   try {
//     const res = await API.get(`${aniList}/data/${id}?provider=${provider}`);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const fetchAnimeDetail = async (id) => {
  try {
    const animeDetail = await anilist.fetchAnimeInfo(id);
    return animeDetail;
  } catch (error) {
    console.error("Error fetching anime detail:", error);
    throw error;
  }
};

export const fetchPlayAnime = async (epsId, provider) => {
  try {
    const res = await API.get(`${aniList}/watch/${epsId}?provider=${provider}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDetailOnWatch = async (id) => {
  try {
    const res = await API.get(`${gogoAnime}/info/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGenre = async (page, perPage, genres) => {
  try {
    const res = await API.get(`${aniList}/advanced-search?page=${page}&perPage=${perPage}&genres=${[genres]}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUpcoming = async (page, perPage, status) => {
  try {
    const res = await API.get(`${aniList}/advanced-search?page=${page}&perPage=${perPage}&status=${status}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovie = async (page, perPage, format) => {
  try {
    const res = await API.get(`${aniList}/advanced-search?page=${page}&perPage=${perPage}&format=${format}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
