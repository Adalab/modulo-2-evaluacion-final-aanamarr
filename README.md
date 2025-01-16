Anime Favorites Web Application

Description

This web application allows users to search for their favorite anime series using the Jikan API and manage a personalized list of favorite animes. Users can add an anime to their favorites by clicking on an image, highlight it, and remove it from the favorites using a delete button. The favorites list is saved in the browser’s localStorage to preserve it between sessions.

Features

🔍 Search Anime: Users can search for anime titles using the search bar, which queries the Jikan API.

❤️ Add to Favorites: Click on an anime image in the search results to add it to the favorites list.

❌ Remove from Favorites: A button is provided to remove specific anime from the favorites.

🗑️ Clear Favorites: A button to clear all items from the favorites list.

💾 LocalStorage Integration: Favorites are stored in the browser to maintain state after page refresh.

Technologies Used

🌐 HTML5

🎨 CSS3

⚙️ JavaScript ES6

📡 Jikan API (https://api.jikan.moe)

🗄️ LocalStorage

Code Structure

Variables and DOM Elements

input: Search input field.

btnSearch: Button to trigger the search.

btnReset: Button to reset search results and favorites.

btnEliminateFav: Button to clear all favorite anime.

listResult: Container for displaying search results.

listFav: Container for displaying favorite anime.

Functions

Search and Display

🔎 handleClick: Fetches anime data from the Jikan API based on the search input and displays the results.

🖼️ renderFavList: Renders the current list of favorite animes in the listFav container.

Favorites Management

✨ handleClickFav: Adds an anime to the favorites or removes it if already present.

❎ handleClickEliminateFav: Removes a specific anime from the favorites using its unique ID.

🧹 handleClickEliminateAllFav: Clears all favorites and updates LocalStorage.

Utility Functions

📋 favList: Attaches click event listeners to images of anime in search results.

🔗 addEliminateFavListeners: Adds click event listeners to the delete buttons in the favorites list.

LocalStorage Management

Data is saved to LocalStorage using the key favAnimeServer.

On page load, the application checks for existing data and loads it if available.

How to Run

🖥️ Clone or download the repository.

🌐 Open the index.html file in a web browser.

🔎 Use the search bar to find anime titles and add them to your favorites.

Future Improvements

🔒 Add user authentication to sync favorites across devices.

📄 Implement pagination for better search result navigation.

🎨 Improve UI/UX with more styling and animations.
