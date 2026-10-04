export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname !== "/thumbnail") {
      return new Response("Thumbnail API is running.");
    }

    const videoId = url.searchParams.get("v");

    if (!/^[A-Za-z0-9_-]{11}$/.test(videoId || "")) {
      return new Response("Invalid YouTube video ID.", { status: 400 });
    }

    const imageUrl =
      `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    const response = await fetch(imageUrl);

    if (!response.ok) {
      return new Response("Thumbnail not found.", { status: 404 });
    }

    const headers = new Headers(response.headers);

    headers.set("Content-Type", "image/jpeg");

    headers.set(
      "Content-Disposition",
      `attachment; filename="youtube-thumbnail-${videoId}.jpg"`
    );

    headers.set("Access-Control-Allow-Origin", "*");

    return new Response(response.body, {
      status: 200,
      headers
    });
  }
};
