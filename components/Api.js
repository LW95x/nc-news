import axios from "axios";

const ncNewsApi = axios.create({
    baseURL: "https://be-nc-news-sfsv.onrender.com",
});

export const getAllArticles = () => {
    return ncNewsApi.get("/api/articles").then( (res) => {
        return res.data.articles;
    });
};

export const getSingleArticle = (article_id) => {
    return ncNewsApi.get(`/api/articles/${article_id}`).then( (res) => {
        return res.data.article[0];
    })
}