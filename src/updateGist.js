const GIST_ID = 'b11a511a20f7362617f5343d01851d98'; // Replace with your Gist ID
const GIST_FILENAME = 'draftOrder.json'; // Replace with your file name

// Function to fetch the current draft order from the Gist
export async function fetchGistData() {
  const url = `https://api.github.com/gists/${GIST_ID}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (response.ok) {
      const gist = await response.json();
      const fileContent = gist.files[GIST_FILENAME].content;
      return JSON.parse(fileContent);
    } else {
      console.error('Error fetching Gist:', response.status, response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching Gist:', error);
    return null;
  }
}
