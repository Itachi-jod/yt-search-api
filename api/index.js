const yts = require("yt-search");

module.exports = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        error: "Missing ?q=search query"
      });
    }

    const result = await yts(query);

    const videos = result.videos.map(v => ({
      title: v.title,
      videoId: v.videoId,
      url: v.url,
      duration: v.timestamp,
      views: v.views,
      author: v.author.name,
      thumbnail: v.thumbnail
    }));

    return res.status(200).json({
      success: true,
      results: videos
    });

  } catch (err) {
    console.error("YT API Error:", err);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
};
