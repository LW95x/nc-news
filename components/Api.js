import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://be-nc-news-sfsv.onrender.com",
});

export const getArticles = (topic_name) => {
  if (!topic_name) {
    return ncNewsApi.get("/api/articles").then((res) => {
      return res.data.articles;
    })
    .catch( (err) => {
      console.log(err);
      throw err;
    })
  } else {
    return ncNewsApi.get(`/api/articles?topic=${topic_name}`).then((res) => {
      return res.data.articles;
    })
    .catch( (err) => {
      console.log(err);
      throw err;
    })
  }
};

export const getSingleArticle = (article_id) => {
  return ncNewsApi.get(`/api/articles/${article_id}`).then((res) => {
    return res.data.article[0];
  })
  .catch( (err) => {
    console.log(err)
    throw err;
  })
};

export const getCommentsByArticle = (article_id) => {
  return ncNewsApi.get(`/api/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  })
  .catch( (err) => {
    console.log(err);
    throw err;
  })
};

export const getUsers = () => {
  return ncNewsApi.get("/api/users").then((res) => {
    return res.data.users;
  })
  .catch( (err) => {
    console.log(err);
    throw err;
  })
};

export const patchArticle = (article_id, newVote) => {
  const patchBody = {
    inc_votes: newVote,
  };

  return ncNewsApi
    .patch(`/api/articles/${article_id}`, patchBody)
    .then((res) => {
      return res.data;
    })
    .catch( (err) => {
      console.log(err);
      throw err;
    })
};

export const postComment = (article_id, username, body) => {
  const postBody = {
    username: username,
    body: body,
  };

  return ncNewsApi
    .post(`/api/articles/${article_id}/comments`, postBody)
    .then((res) => {
      return res.data;
    })
    .catch( (err) => {
      console.log(err);
      throw err;
    })
};

export const deleteComment = (comment_id) => {
  return ncNewsApi.delete(`/api/comments/${comment_id}`).then((res) => {
    return res.data;
  })
  .catch( (err) => {
    console.log(err);
    throw err;
  })
};

export const getTopics = () => {
  return ncNewsApi.get("/api/topics").then((res) => {
    return res.data.topics;
  })
  .catch( (err) => {
    console.log(err);
    throw err;
  })
}
