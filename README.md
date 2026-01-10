## API Configuration (Important)

This project uses the TMDB API, and the API key is stored in a file called:

js/config.js

For security reasons, this file is NOT included in the repository and is listed in `.gitignore`.

### To run the project locally:

1. Create a new file:

js/config.js

2. Add the following content:

```js
const API_KEY = "YOUR_TMDB_API_KEY_HERE";
const BASED_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
