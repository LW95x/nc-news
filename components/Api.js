import axios from "axios";

const ncNewsApi = axios.create({
    baseURL: "https://be-nc-news-sfsv.onrender.com",
});

export const getAllArticles = () => {
    return ncNewsApi.get("/api/articles").then( (res) => {
        return res.data.articles;
    });
};
