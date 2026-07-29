export const sanitizeInput = (input) => {
  if (!input) return '';
  return input.toString().replace(/<\/?[^>]+(>|$)/g, "").trim();
};

export const validateYoutubeUrl = (url) => {
  if (!url) return { isValid: false, videoId: null };
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return { isValid: true, videoId: match[2] };
  }
  return { isValid: false, videoId: null };
};

export const validateImageFile = (file) => {
  if (!file) return { isValid: false, error: 'No file provided' };
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return { isValid: false, error: 'Invalid file type. Only JPG, PNG, and WebP are allowed.' };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { isValid: false, error: 'File size must be under 5MB.' };
  }
  return { isValid: true, error: null };
};

export const validateFigureLabel = (label) => {
  if (!label || label.trim() === '') {
    return { isValid: false, error: 'Figure label is required.' };
  }
  return { isValid: true, error: null };
};
