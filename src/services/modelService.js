import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { generateOrder } from '../utils/helpers';

export const getAllModels = async () => {
  if (!db) return [];
  const modelsRef = collection(db, 'models');
  const q = query(modelsRef, orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const addModel = async (modelData) => {
  if (!db) throw new Error('Firebase is not configured.');
  const modelsRef = collection(db, 'models');
  const docRef = await addDoc(modelsRef, {
    figureLabel: modelData.figureLabel,
    title: modelData.title,
    youtubeUrl: modelData.youtubeUrl,
    imageUrl: modelData.imageUrl,
    createdAt: serverTimestamp(),
    order: generateOrder()
  });
  return docRef;
};

export const deleteModel = async (modelId) => {
  if (!db) throw new Error('Firebase is not configured.');
  const modelDocRef = doc(db, 'models', modelId);
  await deleteDoc(modelDocRef);
};
