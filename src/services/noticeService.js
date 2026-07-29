import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const DEFAULT_NOTICE = {
  content: 'Hey! I am Himanshu from UIET CSJMU. I know how tricky the Engineering Drawing soap model assignment can be — I\'ve been through it myself! I created this website to help my juniors understand what the final soap model should look like for each figure. Browse the reference models below, watch the videos, and if you still need guidance, just call me. I\'ll be happy to help you — absolutely free of cost! 🙌',
  updatedAt: null
};

export const getNotice = async () => {
  if (!db) return DEFAULT_NOTICE;
  const noticeRef = doc(db, 'notices', 'main');
  const noticeSnap = await getDoc(noticeRef);
  
  if (noticeSnap.exists()) {
    return noticeSnap.data();
  } else {
    return DEFAULT_NOTICE;
  }
};

export const updateNotice = async (content) => {
  const noticeRef = doc(db, 'notices', 'main');
  await setDoc(noticeRef, {
    content: content,
    updatedAt: serverTimestamp()
  }, { merge: true });
};
