// Function to save a key - value
export const saveKeyValue = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
}

// Function to get a key - value
export const getKey = (key) => {
   return JSON.parse(sessionStorage.getItem(key));
}
