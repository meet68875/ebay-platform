/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import { TbPlayerPlay, TbPlayerPause, TbEye } from "react-icons/tb";

// Function to extract the YouTube video ID from a URL
const getYouTubeVideoId = (url) => {
  const regExp =
    /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[1] && match[1].length === 11 ? match[1] : null;
};

function LiveEventCard({ event, isPlaying, onTogglePlay }) {
  const views = Math.floor(Math.random() * 5000) + 100;
  const videoId = getYouTubeVideoId(event.videoUrl);

  // Use a reliable YouTube thumbnail URL pattern
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : event.imageUrl || "https://via.placeholder.com/640x360?text=No+Thumbnail";

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer h-[400px]">
      {isPlaying ? (
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`}
          title={event.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <img
          src={thumbnailUrl}
          alt={event.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute top-2 right-2 text-white bg-black bg-opacity-70 rounded-full px-2 py-1 flex items-center gap-1">
        <TbEye className="text-red-500 text-lg" />
        <span className="text-sm">{views}</span>
      </div>

      <button
        onClick={onTogglePlay}
        className="absolute bottom-4 right-4 text-white bg-gray-900 bg-opacity-70 rounded-full p-2 hover:bg-gray-700 transition-colors duration-300 z-10"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? (
          <TbPlayerPause className="text-2xl" />
        ) : (
          <TbPlayerPlay className="text-2xl" />
        )}
      </button>
    </div>
  );
}

function EbayLiveSection() {
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const liveEvents = [
    {
      id: 1,
      title: "Sneaker Drop",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Collectibles Showcase",
      videoUrl: "https://www.youtube.com/watch?v=L_jWHFFi5mk",
    },
    {
      id: 3,
      title: "Luxury Watches",
      videoUrl: "https://www.youtube.com/watch?v=F_r2b_R4VGY",
    },
    {
      id: 4,
      title: "Trading Cards",
      videoUrl: "https://www.youtube.com/watch?v=e_0S0_qU8kU",
    },
  ];

  const handleTogglePlay = (id) => {
    setPlayingVideoId(playingVideoId === id ? null : id);
  };

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-8">
          <h2 className="text-3xl font-bold text-gray-900">eBay Live</h2>
          <p className="mt-2 text-lg text-gray-500">
            Tune in and shop curated experiences
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {liveEvents.map((event) => (
            <LiveEventCard
              key={event.id}
              event={event}
              isPlaying={playingVideoId === event.id}
              onTogglePlay={() => handleTogglePlay(event.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default EbayLiveSection;
