# RecipeBox - Recipe Search & Favorites App 

> **Branch:** `juha_test`  
> **Project Type:** School Group Project  
> **Development Approach:** Block-by-block learning & implementation

A React Native mobile application that allows users to search for recipes, view detailed cooking instructions, and save their favorite recipes locally. Built with TypeScript, Expo, and Firebase Authentication.

---

## Features

### Implemented Features

#### **Authentication System**

- User registration with email/password
- Secure login with Firebase Authentication
- Session persistence
- Logout functionality

#### **Recipe Search**

- Search recipes by name using MealDB API
- Display results with recipe images
- Show category and cuisine area
- Real-time search with loading states
- Empty state handling

#### **Recipe Details**

- Full-screen recipe view with hero image
- Ingredient list with measurements
- Step-by-step cooking instructions (formatted with paragraph breaks)
- Category and area badges (color-coded)
- YouTube video links (when available)
- Dynamic header showing recipe name

#### **Favorites Management**

- Add recipes to favorites with heart icon (❤️/🤍)
- Remove from favorites
- Persistent storage using AsyncStorage
- Favorites survive app restarts
- User-specific favorites
- Dedicated favorites screen with list view
- Empty state when no favorites

#### **Navigation**

- Tab-based navigation (Search & Favorites)
- Stack navigation for recipe details
- Clean back navigation
- Custom headers with recipe names

---

## Technologies Used

| Technology                  | Purpose                                   |
| --------------------------- | ----------------------------------------- |
| **React Native**            | Cross-platform mobile framework           |
| **Expo**                    | Development platform & tooling            |
| **TypeScript**              | Type safety & better developer experience |
| **Expo Router**             | File-based navigation                     |
| **Firebase Authentication** | User authentication & management          |
| **MealDB API**              | Recipe data source                        |
| **AsyncStorage**            | Local data persistence                    |
| **Context API**             | Global state management                   |

---

## Project Structure

```
RecipeBox/
├── app/
│   ├── (auth)/              # Authentication screens
│   │   ├── login.tsx        # Login screen
│   │   └── signup.tsx       # Signup screen
│   ├── (tabs)/              # Main app tabs
│   │   ├── index.tsx        # Search screen
│   │   └── favorites.tsx    # Favorites screen
│   ├── recipe/
│   │   └── [id].tsx         # Recipe detail screen (dynamic route)
│   └── _layout.tsx          # Root layout with providers
├── context/
│   ├── AuthContext.tsx      # Authentication state management
│   └── FavoritesContext.tsx # Favorites state & AsyncStorage logic
├── services/
│   └── mealdb.ts            # MealDB API service
├── styles/
│   ├── auth.ts              # Authentication screen styles
│   ├── search.tsx           # Search & favorites styles
│   └── idStyles.ts          # Recipe detail styles
└── firebase.ts              # Firebase configuration
```

---

## Development Approach: Block-by-Block Learning

This project was built with an **educational-first mindset**, focusing on **understanding over copy-pasting**.

### Learning Philosophy

Each feature was implemented in **small, digestible blocks**:

1. **Block 1:** Basic structure & imports
2. **Block 2:** State management setup
3. **Block 3:** Core functionality
4. **Block 4:** UI implementation
5. **Block 5:** Integration & testing

### Why This Approach Works

- **Gradual complexity** - Start simple, add features incrementally
- **Understanding context** - Each line explained with purpose
- **Visual feedback** - Test after each block
- **Error handling** - Learn from mistakes in small chunks
- **Knowledge retention** - Build mental models, not muscle memory

---

## Key Implementation Details

### Firebase Authentication

- Email/password authentication using Firebase Auth
- User session managed with Context API
- Automatic redirect to login when unauthenticated
- Secure credential handling

### MealDB API Integration

- RESTful API calls to fetch recipe data
- Search recipes by name endpoint
- Get recipe details by ID endpoint
- Error handling for network failures
- Type-safe response parsing with TypeScript

### AsyncStorage Persistence

- Favorites stored locally on device
- Automatic save on every favorites change
- Load saved favorites on app startup
- JSON serialization for complex data
- Error handling for storage operations

### Dynamic Routing with Expo Router

- File-based routing structure
- Dynamic route parameters for recipe details
- Type-safe route parameters
- Tab navigation for main screens
- Stack navigation for detail views

### Context API for State Management

- **AuthContext** - User authentication state across app
- **FavoritesContext** - Shared favorites state and operations
- Custom hooks (`useAuth`, `useFavorites`) for easy access
- Provider pattern wrapping the entire app

### Component Architecture

- Reusable styles across screens
- Shared component patterns (recipe cards)
- Separation of concerns (UI, logic, data)
- Type-safe props with TypeScript interfaces

---

## Contributors

**Developer:** Juha Duong  
**Role:** Full-stack mobile developer
**Contributions:**

- Complete app architecture
- All feature implementations
- UI/UX design
- State management patterns
- API integration
- Data persistence

---

## Getting Started

### Prerequisites

```bash
Node.js (v18+)
npm or yarn
Expo CLI
iOS Simulator / Android Emulator
```

### Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd RecipeBox
git checkout juha_test
```

2. **Install dependencies:**

```bash
npm install
```

3. **Setup Firebase:**

   - Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Add your Firebase config to `firebase.ts`

4. **Run the app:**

```bash
npx expo start
```

5. **Open in emulator:**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator

---

## Known Issues & Limitations

- Favorites are device-specific (no cloud sync)
- Limited to MealDB API recipes only
- No offline recipe viewing
- YouTube links open externally (not embedded)

---

## Potential Future Enhancements

### Search & Discovery

- Filter by category and cuisine area
- Search history with quick access
- Advanced search with multiple criteria
- Sort results by various metrics

### Recipe Features

- User ratings and reviews
- Cooking time and difficulty level
- Nutrition information
- Serving size calculator
- Share recipes with friends

### Favorites Management

- Organize favorites into collections/folders
- Add tags to recipes
- Search within favorites
- Export favorites list

### User Experience

- Dark mode theme
- Onboarding tutorial
- Offline mode with cached recipes
- Recipe video player (inline YouTube)
- Pull-to-refresh functionality

### Personalization

- User profile with settings
- Dietary preference filters
- Allergy filters
- Recipe completion tracking

### Technical Improvements

- Migrate to Firebase Firestore for cloud sync
- Image caching for offline viewing
- Push notifications
- Unit and integration tests
- Performance optimization

---

## Lessons Learned

### Key Takeaways

1. **Context API** - Global state without prop drilling
2. **TypeScript** - Catches errors early, improves code quality
3. **AsyncStorage** - Local persistence
4. **Component composition** - Reusable styles & components save time
5. **Error handling** - Always expect API calls to fail
6. **User feedback** - Loading states & alerts improve UX
7. **Block-by-block development** - Better learning than copying entire solutions

### Skills Developed

- React Native component architecture
- State management patterns (Context API)
- Async/await & Promise handling
- REST API integration
- Local storage patterns
- Firebase integration
- TypeScript type systems
- Mobile navigation patterns
- Git version control

---

## License

This project is for educational purposes as part of a school group project.

---

## Acknowledgments

- **MealDB** - Free recipe API ([https://www.themealdb.com](https://www.themealdb.com))
- **Firebase** - Authentication services
- **Expo** - Development platform
- **GitHub Copilot** - Block-by-block guidance & explanations

---
