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

export const getCommentsByArticle = (article_id) => {
    return ncNewsApi.get(`/api/articles/${article_id}/comments`).then( (res) => {
        return res.data.comments;
    })
}

export const getUsers = () => {
    return ncNewsApi.get('/api/users').then( (res) => {
        return res.data.users;
    })
}