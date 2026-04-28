import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, deleteDoc, onSnapshot, writeBatch } from 'firebase/firestore';
import { auth, db } from '../../Firebase/Authentification'; 

const WatchLaterContext = createContext();

const WatchLaterProvider = ({ children }) => {
  const [watchLaterList, setWatchLaterList] = useState({});

  useEffect(() => {
    let unsubscribeSnapshot = null;
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const watchlistRef = collection(db, "users", user.uid, "watchlist");
        unsubscribeSnapshot = onSnapshot(watchlistRef, (snapshot) => {
          const newList = {};
          snapshot.forEach((doc) => {
            newList[doc.id] = doc.data();
          });
          setWatchLaterList(newList);
        });
      } else {
        setWatchLaterList({});
        if (unsubscribeSnapshot) unsubscribeSnapshot();
      }
    });

    return () => {
      if (unsubscribeSnapshot) unsubscribeSnapshot();
      unsubscribeAuth();
    };
  }, []);

  const toggleWatchLater = async (video) => {
    const user = auth.currentUser;
    if (!user) {
      console.warn("Vous devez être connecté pour ajouter une vidéo.");
      return; 
    }
    const videoRef = doc(db, "users", user.uid, "watchlist", video.id);
    try {
      if (watchLaterList[video.id]) {
        await deleteDoc(videoRef);
      } else {
        await setDoc(videoRef, video);
      }
    } catch (error) {
      console.error("Erreur lors de la synchronisation avec Firestore :", error);
    }
  };

  const forceSync = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Veuillez vous connecter pour synchroniser.");

    try {
      const localDataRaw = localStorage.getItem('watchLaterList');
      const localData = localDataRaw ? JSON.parse(localDataRaw) : {};

      const allVideosToSync = { ...localData, ...watchLaterList };
      const videosArray = Object.values(allVideosToSync);

      if (videosArray.length === 0) {
        return alert("Aucune vidéo à synchroniser.");
      }

      const batch = writeBatch(db);

      videosArray.forEach((video) => {
        const videoRef = doc(db, "users", user.uid, "watchlist", video.id);
        batch.set(videoRef, video);
      });

      await batch.commit();
      localStorage.removeItem('watchLaterList');
      
      alert("Synchronisation terminée avec succès !");

    } catch (error) {
      console.error("Erreur lors de la synchro forcée :", error);
      alert("Une erreur est survenue lors de la synchronisation.");
    }
  };

  return (
    <WatchLaterContext.Provider value={{ watchLaterList, toggleWatchLater, forceSync }}>
      {children}
    </WatchLaterContext.Provider>
  );
};

export default WatchLaterProvider;

export const useWatchLater = () => {
  const context = useContext(WatchLaterContext);
  if (context === undefined) {
    throw new Error('useWatchLater must be used within a WatchLaterProvider');
  }
  return context;
};