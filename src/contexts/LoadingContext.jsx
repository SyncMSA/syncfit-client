import { createContext, useState, useContext } from 'react';
import GlobalLoading from '../components/GlobalLoading';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <GlobalLoading />}
    </LoadingContext.Provider>
  );
};
