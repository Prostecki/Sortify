export function useLocalStorage() {
  const setItemL = (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage item:", error);
    }
  };

  const getItemL = (key, defaultValue) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error getting localStorage item:", error);
      return defaultValue;
    }
  };

  return { setItemL, getItemL };
}

export function useSessionStorage() {
  const setItemS = (key, value) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting sessionStorage item:", error);
    }
  };

  const getItemS = (key, defaultValue) => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error getting sessionStorage item:", error);
      return defaultValue;
    }
  };

  const removeItemS = (key) => {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing sessionStorage item:", error);
    }
  };

  return { setItemS, getItemS, removeItemS };
}
