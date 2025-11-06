# Device Tagger

## Overview
Device Tagger is a web application designed to display and analyze device performance metrics. It provides users with the ability to filter data based on various criteria, such as country, manufacturer, and device type.

## Project Structure
The project is organized into the following directories and files:

```
device-tagger
├── main
│   ├── public
│   │   └── index.html          # HTML structure for the application
│   ├── src
│   │   ├── index.jsx           # Entry point for the React application
│   │   ├── App.jsx             # Main application component
│   │   ├── components           # Contains reusable components
│   │   │   ├── Dashboard.jsx    # Dashboard component for metrics display
│   │   │   ├── MetricCard.jsx   # Component for displaying individual metrics
│   │   │   └── Filters.jsx      # Component for filtering options
│   │   ├── pages
│   │   │   └── Home.jsx        # Main page component
│   │   ├── hooks
│   │   │   └── useMockData.js   # Custom hook for generating mock data
│   │   ├── utils
│   │   │   └── dataUtils.js     # Utility functions for data processing
│   │   └── styles
│   │       └── index.css        # CSS styles for the application
│   └── package.json             # npm configuration file
├── .devcontainer
│   └── devcontainer.json        # Development container configuration
├── README.md                    # Project documentation
└── vite.config.js               # Vite configuration file
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd device-tagger
   ```

2. Navigate to the `main` directory:
   ```
   cd main
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage
To start the development server, run:
```
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.