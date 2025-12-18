# Recipe Box

A React Native mobile application for discovering, viewing, and saving favorite recipes using the TheMealDB API.

## Project Overview

Recipe Box is a comprehensive mobile application built with React Native and Expo that allows users to search for recipes, view detailed cooking instructions, and manage their favorite recipes. The app demonstrates modern mobile development practices with TypeScript, clean architecture, and responsive design.

### Key Features

- Search recipes by keyword using TheMealDB API
- View detailed recipe information with ingredients and instructions
- Save and manage favorite recipes
- Light and dark theme support
- Cross-platform compatibility (iOS and Android)
- Responsive design with proper accessibility

## Technology Stack

- **React Native** with Expo Router for navigation
- **TypeScript** for type safety
- **TheMealDB API** for recipe data
- **Axios** for HTTP requests
- **AsyncStorage** for local data persistence
- **Material Design** principles for UI

## Project Structure

```
RecipeBox/
├── app/                    # Expo Router screens
├── components/             # Reusable UI components
├── constants/              # Configuration and constants
├── context/                # React Context providers
├── docs/                   # Project documentation
├── services/               # API and external services
├── styles/                 # Centralized styling and themes
└── types/                  # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the development server

   ```bash
   npx expo start
   ```

3. Run on device/simulator

   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## Development Team Structure

This project is organized into four development parts for team collaboration:

### Part 1: Core Infrastructure (Completed)

**Responsible: Juha Duong** ✅

- TypeScript type definitions
- API service layer with TheMealDB integration
- Theme system with light/dark mode support
- Centralized styling with Flexbox utilities
- Configuration and constants

### Part 2: Custom Components

**Responsible: Niko Lehtonen** ✅

- Custom reusable components (RecipeCard, SearchInput, LoadingSpinner)
- Component styling and theming integration
- Event handlers and user interactions
- Image components and accessibility

### Part 3: State Management & Navigation

**Responsible: Jeremias Salo** ✅

- React Context for favorites management
- AsyncStorage integration for data persistence
- FavoriteButton component with state integration
- Expo Router navigation setup and configuration

### Part 4: Screens Implementation 

**Responsible: Juha Duong** ✅

- Search screen with FlatList implementation
- Recipe detail screen with route parameters
- Favorites screen with saved recipes display
- Screen layouts and user flows

### Other Changes 

**Responsible: Juha Duong**

**Accessibility & WCAG Compliance:**

- WCAG AA/AAA compliance overhaul for all UI elements
- Theme color system redesign (changed primary color from orange to blue #2563EB for 7.5:1 contrast ratio)
- Custom `AccessibleAlert` component with high-contrast design (solid backgrounds, pure black titles, 52px buttons)
- FavoriteButton accessibility improvements (white circular background with 95% opacity and drop shadow for visibility on all image backgrounds)
- Tab bar text size increased from 11-12px to 14px with 600 font weight for better readability

**User Experience Enhancements:**

- Welcome/onboarding screen implementation with app branding and "Get Started" button
- Recipe detail screen enhancements:
  - Bulleted ingredients list with measurements
  - Formatted step-by-step instructions with numbered circles
- Enhanced search screen with larger search input and prominent title
- Loading states and error handling throughout

**Code Quality & Architecture:**

- Recipe helper utilities (`extractIngredients`, `formatInstructions`)
- TypeScript type fixes and improvements across all components
- Removed duplicate code and consolidated logic (favorites management)
- Proper error handling and type safety throughout

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- [Project Division](RecipeBox/docs/project_division.md) - Team collaboration structure
- [Part 1 Summary](RecipeBox/docs/part1_summary.md) - Implementation overview
- [Part 1 Development Guide](RecipeBox/docs/part1_guide.md) - Detailed development explanation

## Assessment Criteria

This project fulfills the following assessment requirements:

- 10+ documented requirements with clear functionality
- Multiple screens with React Native navigation
- FlatList/ScrollView components for data display
- Image components for recipe photos
- Custom reusable components
- Centralized styling with themes
- HTTP API integration
- App-wide state management
- Cross-platform compatibility

## API Integration

The app integrates with TheMealDB API:

- Base URL: https://www.themealdb.com/api/json/v1/1
- Search endpoint for recipe discovery
- Detail endpoint for complete recipe information
- Proper error handling and loading states

## Contributing

This is a group project with defined roles:

1. Review the project division documentation
2. Implement assigned components following established patterns
3. Test integration between parts
4. Maintain code quality and TypeScript compliance

## Testing

- TypeScript compilation provides compile-time verification
- API service includes comprehensive error handling
- Component props are fully typed for integration safety

## License

This project is developed for educational purposes as part of AAD2025S coursework.
