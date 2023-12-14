const sortArticles = (input, articles, setArticles) => {
    let sortedArticles = [...articles];

    if (input === "date-asc") {
      sortedArticles.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA;
      });
    }

    if (input === "date-desc") {
      sortedArticles.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA - dateB;
      });
    }

    if (input === "comment-count-high") {
      sortedArticles.sort((a, b) => b.comment_count - a.comment_count);
    }

    if (input === "comment-count-low") {
      sortedArticles.sort((a, b) => a.comment_count - b.comment_count);
    }

    if (input === "votes-high") {
      sortedArticles.sort((a, b) => b.votes - a.votes);
    }

    if (input === "votes-low") {
      sortedArticles.sort((a, b) => a.votes - b.votes);
    }

    setArticles(sortedArticles);
  };

  export default sortArticles;