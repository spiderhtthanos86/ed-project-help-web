export const extractYoutubeVideoId = (url) => {
  if (!url) return null;
  // Matches standard watch URLs, embed URLs, short-links (youtu.be), and shorts (youtube.com/shorts/ID)
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const getYoutubeEmbedUrl = (url) => {
  const videoId = extractYoutubeVideoId(url);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
};

export const getYoutubeThumbnailUrl = (url) => {
  const videoId = extractYoutubeVideoId(url);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};

// If a user pastes a standard imgbb page link (like https://ibb.co/xxxxxx),
// we can show a warning or help them convert it.
export const cleanImageUrl = (url) => {
  if (!url) return '';
  let clean = url.trim();
  // If it's a shortened ibb.co link but not on i.ibb.co (direct image domain)
  if (clean.includes('ibb.co') && !clean.includes('i.ibb.co')) {
    // We notify the user, or return it. The direct image link is preferred.
  }
  return clean;
};

export const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const generateOrder = () => {
  return Date.now();
};
