# NetMovie - Movie & TV Show Streaming Platform

A Netflix-inspired React application that showcases movies and TV shows using the TMDB API. This project demonstrates modern React development techniques including component architecture, API integration, and responsive design.

![NetMovie Screenshot](https://via.placeholder.com/800x450)

## Features

- Browse movies and TV shows across different categories
- View trending, popular, and upcoming titles
- Search for content across the entire database
- Responsive design for various screen sizes
- Dynamic content loading from TMDB API
- Clean and modern UI inspired by popular streaming platforms

## Technology Stack

- **React**: Frontend library for building user interfaces
- **React Router**: For navigation between different pages
- **TMDB API**: For movie and TV show data
- **Tailwind CSS**: For styling
- **Lucide React**: For icons
- **Modern JavaScript (ES6+)**: Leveraging modern JavaScript features

## Project Structure

```
netmovie/
├── src/
│   ├── api/
│   │   └── tmdbApi.js      # API functions for fetching data from TMDB
│   ├── components/
│   │   ├── ContentCard.jsx # Card component for individual movies/shows
│   │   ├── ContentRow.jsx  # Horizontal scrollable row of ContentCards
│   │   ├── Footer.jsx      # Footer component
│   │   ├── Header.jsx      # Navigation header with search functionality
│   │   ├── Hero.jsx        # Featured content showcase
│   │   └── SearchResults.jsx # Display for search results
│   ├── constants/
│   │   └── config.js       # API keys and configuration
│   ├── pages/
│   │   ├── HomePage.jsx    # Main landing page
│   │   ├── MoviesPage.jsx  # Movies catalog page
│   │   ├── TVShowsPage.jsx # TV shows catalog page
│   │   ├── NewPopularPage.jsx # New and popular content
│   │   └── MyListPage.jsx  # User's saved content
│   ├── utils/
│   │   └── routes.js       # Route definitions
│   ├── App.js              # Main application component with routing
│   ├── index.js            # Application entry point
│   └── ...
├── public/
├── package.json
└── ...
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/netmovie.git
cd netmovie
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your TMDB API key:
```
REACT_APP_TMDB_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

## API Integration

This project uses The Movie Database (TMDB) API to fetch movie and TV show data. The API endpoints used include:

- Trending content
- Popular movies and TV shows
- Top-rated content
- Upcoming releases
- Genre listings
- Search functionality

API calls are organized in the `tmdbApi.js` file for clean separation of concerns.

## Pages

1. **Home**: Landing page featuring a hero banner and content rows
2. **Movies**: Page dedicated to movie content organized by categories
3. **TV Shows**: Page dedicated to TV show content organized by categories
4. **New & Popular**: Shows the latest releases and trending content
5. **My List**: Displays user's saved content (placeholder for future functionality)

## Components

### Header
Navigation bar with links to different sections and search functionality.

### Hero
Large banner showcasing featured content with title, description, and action buttons.

### ContentRow
Horizontal scrollable row displaying ContentCards for a specific category.

### ContentCard
Individual card showing a movie or TV show with hover effects and action buttons.

### SearchResults
Grid layout displaying search results with basic information.

### Footer
Basic footer with links and copyright information.

## Future Enhancements

- User authentication
- Persistent "My List" functionality
- Movie and TV show detail pages
- Video playback integration
- Personalized recommendations
- Mobile app version

## Credits

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the API
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons
- [React Router](https://reactrouter.com/) for navigation

## License

MIT License