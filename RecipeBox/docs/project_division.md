# Recipe Box - Group Project Division

## Project Overview

A React Native Recipe Box application using TheMealDB API that allows users to search for recipes, view details, and save favorites.

## App Requirements

1. The user can search for recipes by keyword using TheMealDB API
2. The application must have exactly three distinct screens (Search, Recipe Detail, Favorites)
3. The user can view a list of search results on the Search screen
4. The search results list must use a FlatList component
5. The user can tap on a recipe to navigate to Recipe Detail screen
6. The Recipe Detail screen must display a large Image component of the dish
7. The Recipe Detail screen must receive recipe data via route parameters
8. The user can press a button to add/remove recipes from Favorites
9. The Favorites screen displays a list of all saved recipes using FlatList
10. The application must use React Context for app-wide state management
11. The app must fetch recipe data using HTTP GET requests to TheMealDB API
12. All styling must utilize React Native StyleSheets and Flexbox
13. The application must use Expo's route-based Navigation
14. The app must implement light/dark theme support
15. Custom reusable components must be created for UI consistency

---

# TEAM DIVISION (4 Members)

## PART 1: Core Infrastructure & API Integration

**Responsible Team Member: [Juha Duong]** ✅ COMPLETED

### Scope

Foundation layer including API services, types, themes, and core utilities.

### Files to Create/Modify

```
services/
  └── mealdbAPI.ts
types/
  └── index.ts
styles/
  ├── theme.ts
  └── commonStyles.ts
constants/
  └── API.ts
```

### Specific Tasks

1. **API Service Implementation**

   - Create `services/mealdbAPI.ts` with HTTP GET functions
   - Implement `searchRecipes(query: string)`
   - Implement `getRecipeDetails(id: string)`
   - Handle error cases and loading states

2. **TypeScript Types**

   - Define `Recipe` interface
   - Define `SearchResult` interface
   - Define `FavoriteRecipe` type
   - Define API response types

3. **Theme System**

   - Create light/dark theme objects
   - Define color constants
   - Create theme context provider

4. **Centralized Styles**
   - Common component styles
   - Typography definitions
   - Layout utilities using Flexbox
   - Responsive design patterns

### Assessment Criteria Addressed

- HTTP GET requests (2 points)
- Themes (2 points)
- Centralized styles (2 points)
- StyleSheets & Flexbox (1 point)
- Good architectural principles (2 points)

---

## PART 2: Custom Components

**Responsible Team Member: Niko Lehtonen** ✅ COMPLETED

### Scope

Reusable UI components for displaying recipes and handling user input.

### Files to Create/Modify

```
components/
  ├── RecipeCard.tsx
  ├── SearchInput.tsx
  └── LoadingSpinner.tsx
```

### Specific Tasks

1. **RecipeCard Component**

   - Displays recipe info with image, title, and category
   - Accept recipe data as props (Recipe type from Part 1)
   - Include Image component with proper sizing and loading states
   - Handle onPress navigation callback prop
   - Apply theme-aware styling using theme from Part 1
   - Add accessibility labels

2. **SearchInput Component**

   - Text input with search icon and handlers
   - Controlled input with value and onChange props
   - Search icon and clear button
   - Debounced search functionality (300ms)
   - Keyboard handling (return key = search)
   - Theme-aware styling

3. **LoadingSpinner Component**

   - Platform-specific activity indicator
   - Optional text message prop
   - Theme-aware colors
   - Center alignment utility

4. **Component Features**
   - Event handlers for all user interactions
   - Proper TypeScript props interfaces for each component
   - Accessibility labels and roles
   - Platform-specific styling where needed (iOS vs Android)
   - Integration with theme system from Part 1

### Assessment Criteria Addressed

- Custom components 2+ (2 points)
- Image components (2 points)
- Event handlers (1 point)
- Platform incompatibilities management (1 point)
- Adaptive and responsive UIs (1 point)

---

## PART 3: State Management & Navigation

**Responsible Team Member: [Team Member 3 Name]**

### Scope

Global state management, favorites functionality, and navigation configuration.

### Files to Create/Modify

```
context/
  └── FavoritesContext.tsx
components/
  └── FavoriteButton.tsx
app/
  └── _layout.tsx (modify)
```

### Specific Tasks

1. **React Context State Management**

   - Create `FavoritesContext` with Provider
   - Implement add/remove favorite functionality
   - Persist favorites using AsyncStorage
   - Export custom hooks (`useFavorites`)
   - Load saved favorites on app start
   - Type definitions for context state and actions

2. **FavoriteButton Component**

   - Toggle favorite state with visual feedback
   - Accept recipe object as prop
   - Visual feedback (heart icon filled/unfilled)
   - Integration with FavoritesContext
   - Haptic feedback on press
   - Theme-aware styling

3. **Navigation Setup**
   - Modify `_layout.tsx` for proper routing
   - Implement Stack navigation with headers
   - Configure tab navigation (Search, Favorites)
   - Add navigation icons and styling
   - Set up route structure for all screens

### Assessment Criteria Addressed

- React Context state management (2 points)
- Expo Navigation (2 points)
- Custom components (FavoriteButton) (1 point)
- Good architectural principles (1 point)

---

## PART 4: Screens Implementation

**Responsible Team Member: [Team Member 4 Name]**

### Scope

All screen components implementing the user interface and user flows.

### Files to Create/Modify

```
app/
  ├── index.tsx (create)
  ├── favorites.tsx (create)
  └── detail/
      └── [id].tsx (create)
```

### Specific Tasks

1. **Search Screen (`index.tsx`)**

   - Use SearchInput component from Part 2
   - FlatList for search results using RecipeCard from Part 2
   - Integration with mealdbAPI.searchRecipes() from Part 1
   - Loading states using LoadingSpinner from Part 2
   - Error handling and empty state messages
   - Pull-to-refresh capability
   - Navigation to detail screen on card press

2. **Recipe Detail Screen (`detail/[id].tsx`)**

   - Route parameter handling for recipe ID
   - Fetch recipe details using mealdbAPI.getRecipeDetails() from Part 1
   - Large Image component for recipe photo
   - Recipe information layout (ingredients, instructions, category)
   - ScrollView for long content
   - FavoriteButton integration from Part 3
   - Loading and error states
   - Back navigation

3. **Favorites Screen (`favorites.tsx`)**

   - Access favorites from FavoritesContext (Part 3)
   - FlatList displaying saved recipes using RecipeCard (Part 2)
   - Empty state handling ("No favorites yet")
   - Navigation to recipe details on card press
   - Pull-to-refresh to update list
   - Theme-aware styling

4. **Screen Polish**
   - Consistent header styling across all screens
   - Proper spacing and layout using commonStyles from Part 1
   - Loading states for all async operations
   - Error boundaries and fallback UI
   - Keyboard dismissal on scroll

### Assessment Criteria Addressed

- FlatLists/ScrollView (2 points)
- Route parameters (1 point)
- App looks good and is easy to use (3 points)
- Adaptive and responsive UIs (1 point)

---

## 🔗 Integration Guidelines

### Communication Between Parts

1. **Part 1 → All Parts**: Provides API functions, types, theme, and common styles (Foundation)
2. **Part 2 → Part 4**: Provides UI components (RecipeCard, SearchInput, LoadingSpinner)
3. **Part 3 → Part 4**: Provides FavoritesContext, FavoriteButton, and navigation structure
4. **Part 4**: Integrates everything into working screens with complete user flows

### Dependency Chain

```
Part 1 (COMPLETED) ✅
    ↓
Part 2 & Part 3 (Can work in parallel)
    ↓
Part 4 (Requires Parts 2 & 3)
```

### Testing Integration

- **After Part 2**: Test components render with mock data from Part 1 types
- **After Part 3**: Test FavoritesContext and navigation setup independently
- **After Part 4**: Full integration testing of all screens and user flows
- Verify state management works across all screens
- Ensure theme consistency throughout the app
- Check navigation flows and route parameters

### Code Review Checkpoints

1. **Part 1 Complete** ✅: API and types working, theme system operational
2. **After Part 2**: Components render correctly with proper styling and events
3. **After Part 3**: Context, FavoriteButton work, navigation configured
4. **After Part 4**: All screens functional with proper integration
5. **Final Review**: Polish, optimization, and bug fixes

---

## Getting Started

### Prerequisites

- Expo CLI installed
- Node.js and npm
- Git repository set up
- TheMealDB API documentation reviewed

### Development Workflow

1. Create feature branches for each part
2. Regular commits with clear messages
3. Merge to main branch after testing
4. Coordinate integration milestones

### Final Deliverables

- Working React Native app
- Clean, documented code
- Team evaluation document
- Presentation preparation (10-15 minutes)

---
