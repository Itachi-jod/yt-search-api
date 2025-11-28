const yts = require("yt-search");

module.exports = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).end(JSON.stringify({
        error: "Missing ?q=search query"
      }, null, 2)); // ← PRETTY PRINT
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

    res.setHeader("Content-Type", "application/json");
    return res.status(200).end(JSON.stringify({
      success: true,
      results: videos
    }, null, 2)); // ← PRETTY PRINT

  } catch (err) {
    console.error("YT API Error:", err);

    res.setHeader("Content-Type", "application/json");
    return res.status(500).end(JSON.stringify({
      error: "Internal server error"
    }, null, 2)); // ← PRETTY PRINT
  }
};
