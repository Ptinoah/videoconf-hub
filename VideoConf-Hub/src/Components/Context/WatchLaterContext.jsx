import { createContext, useState, useEffect, useContext } from 'react';

const WatchLaterContext = createContext();

export const WatchLaterProvider = ({ children }) => {
  const [watchLaterList, setWatchLaterList] = useState(() => {
    try {
      const storedList = localStorage.getItem('watchLaterList');
      return storedList ? JSON.parse(storedList) : {};
    } catch (error) {
      console.error("Failed to parse watchLaterList from localStorage", error);
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('watchLaterList', JSON.stringify(watchLaterList));
  }, [watchLaterList]);

  const toggleWatchLater = (video) => {
    setWatchLaterList(prevList => {
      const newList = { ...prevList };
      if (newList[video.id]) {
        delete newList[video.id];
      } else {
        newList[video.id] = video;
      }
      return newList;
    });
  };

  return (
    <WatchLaterContext.Provider value={{ watchLaterList, toggleWatchLater }}>
      {children}
    </WatchLaterContext.Provider>
  );
};

export const useWatchLater = () => {
  const context = useContext(WatchLaterContext);
  if (context === undefined) {
    throw new Error('useWatchLater must be used within a WatchLaterProvider');
  }
  return context;
};