import React, { useState } from "react";
import "./youtube.css"; // Assuming you have your CSS in a separate file

const Youtube = () => {
  const [videoId, setVideoId] = useState("Tuw8hxrFBH8");
  const [videos] = useState([
    {
      id: "Tuw8hxrFBH8",
      title: "Entrepreneur 1 - How Elon Musk Started",
    },
    {
      id: "eHJnEHyyN1Y",
      title: "Entrepreneur 2 - Jeff Bezos: Building Amazon",
    },
    {
      id: "HAnw168huqA",
      title: "Entrepreneur 3 - Oprah Winfrey: The Story of a Media Mogul",
    },
    {
      id: "8Aux7nqu6w8",
      title: "Entrepreneur 4 - Elon Musk: SpaceX Journey",
    },
    {
      id: "7m4zQpf3Ouo",
      title: "Entrepreneur 5 - Steve Jobs: Apple and Innovation",
    },
    {
      id: "BX1WpL2VlhM",
      title: "Entrepreneur 6 - Mark Zuckerberg: Facebook’s Founder",
    },
    {
      id: "7TWKKww-F30",
      title: "Entrepreneur 7 - Bill Gates: Microsoft’s Legacy",
    },
    {
      id: "VSceuiPBpxY",
      title: "Entrepreneur 8 - Richard Branson: The Virgin Empire",
    },
    {
      id: "-U5dEdWouDY",
      title: "Entrepreneur 9 - Warren Buffett: The Oracle of Omaha",
    },
    {
      id: "f6qngqhl-as",
      title: "Entrepreneur 10 - Steve Jobs: Apple’s Visionary",
    },
    {
      id: "PGUdWfB8nLg",
      title: "Entrepreneur 11 - Jack Ma: Alibaba's Success",
    },
    {
      id: "OeHVlN73aKA",
      title: "Entrepreneur 12 - Larry Page: Google’s Founding",
    },
    {
      id: "rNiie01OqJQ",
      title: "Entrepreneur 13 - Sergey Brin: Co-Founding Google",
    },
    {
      id: "Y_jJ1hsIyd0",
      title: "Entrepreneur 14 - Howard Schultz: Starbucks Growth",
    },
    {
      id: "8BLzA4y9vYo",
      title: "Entrepreneur 15 - Sheryl Sandberg: Leadership at Facebook",
    },
    {
      id: "KiX_gsg8V50",
      title: "Entrepreneur 16 - Indra Nooyi: Leading PepsiCo",
    },
    {
      id: "dgrwlL82T2I",
      title: "Entrepreneur 17 - Sundar Pichai: CEO of Google",
    },
    {
      id: "H1mb3ARvSJo", // Updated video ID
      title: "Entrepreneur 18 - New Video", // Update the title if needed
    },
    {
      id: "ptD0T-ZcF2M",
      title: "Entrepreneur 19 - Satya Nadella: Leading Microsoft",
    },
    {
      id: "Svw-oXtXO-c",
      title: "Entrepreneur 20 - Susan Wojcicki: YouTube’s Journey",
    },
  ]);

  const playVideo = (videoId) => {
    setVideoId(videoId);
  };

  return (
    <div className="container">
      <h1>Best Entrepreneurs of the World</h1>
      <div className="video-player">
        <iframe
          id="videoFrame"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Entrepreneur Video"
        ></iframe>
      </div>
      <div className="video-gallery">
        {videos.map((video) => (
          <div
            key={video.id}
            className="video-item"
            onClick={() => playVideo(video.id)}
          >
            <img
              src={`https://img.youtube.com/vi/${video.id}/0.jpg`}
              alt={video.title}
            />
            <p>{video.title}</p>
          </div>
        ))}
      </div>
      <a
        href="https://www.youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="see-more-btn"
      >
        See More on YouTube
      </a>
    </div>
  );
};

export default Youtube;
