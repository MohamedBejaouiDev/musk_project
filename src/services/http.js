// Simulate API calls with local JSON data
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchData = async (endpoint) => {
  await delay(300); // Simulate network delay
  
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};