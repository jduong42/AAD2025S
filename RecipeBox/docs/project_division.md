# Recipe Box - Group Project Division

## Project Overview
A React Native Recipe Box application using TheMealDB API that allows users to search for recipes, view details, and save favorites.

## Assessment Requirements Coverage (40 points total)
- ✅ 10+ documented requirements (2 points)
- ✅ 3+ screens (Search, Detail, Favorites)
- ✅ FlatList/ScrollView components (2 points)
- ✅ Image components (2 points)
- ✅ Custom components 2+ (2 points)
- ✅ StyleSheets & Flexbox (1 point)
- ✅ Centralized styles (2 points)
- ✅ Themes (2 points)
- ✅ Expo Navigation (2 points)
- ✅ Route parameters (1 point)
- ✅ React Context state management (2 points)
- ✅ HTTP GET requests (2 points)
- ✅ Event handlers (1 point)

---

## 📋 App Requirements (10+)

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

# 👥 TEAM DIVISION

## 🏗️ PART 1: Core Infrastructure & API Integration
**Responsible Team Member: [Juha Duong]**

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

## 🧩 PART 2: Custom Components & State Management
**Responsible Team Member: [Name]**

### Scope
Reusable UI components and global state management system.

### Files to Create/Modify
```
context/
  └── FavoritesContext.tsx
components/
  ├── RecipeCard.tsx
  ├── SearchInput.tsx
  ├── FavoriteButton.tsx
  └── LoadingSpinner.tsx
```

### Specific Tasks
1. **React Context State Management**
   - Create `FavoritesContext` with Provider
   - Implement add/remove favorite functionality
   - Persist favorites using AsyncStorage
   - Export custom hooks (`useFavorites`)

2. **Custom Components (4+ components)**
   - `RecipeCard`: Displays recipe info with image and navigation
   - `SearchInput`: Text input with search icon and handlers
   - `FavoriteButton`: Toggle favorite state with visual feedback
   - `LoadingSpinner`: Consistent loading indicator

3. **Component Features**
   - Event handlers for user interactions
   - Proper TypeScript props interfaces
   - Accessibility support
   - Platform-specific styling where needed

### Assessment Criteria Addressed
- React Context state management (2 points)
- Custom components 2+ (2 points)
- Image components (2 points)
- Event handlers (1 point)
- Platform incompatibilities management (1 point)

---

## 📱 PART 3: Screens & Navigation
**Responsible Team Member: [Name]**

### Scope
All screen components and navigation setup.

### Files to Create/Modify
```
app/
  ├── _layout.tsx (modify)
  ├── index.tsx (create)
  ├── favorites.tsx (create)
  └── detail/
      └── [id].tsx (create)
```

### Specific Tasks
1. **Navigation Setup**
   - Modify `_layout.tsx` for proper routing
   - Implement Stack navigation with headers
   - Add navigation buttons and icons
   - Handle route parameters

2. **Search Screen (`index.tsx`)**
   - FlatList for search results
   - Search functionality integration
   - Loading states and error handling
   - Pull-to-refresh capability

3. **Recipe Detail Screen (`detail/[id].tsx`)**
   - Large image display
   - Recipe information layout
   - Favorite toggle functionality
   - Route parameter handling
   - ScrollView for long content

4. **Favorites Screen (`favorites.tsx`)**
   - FlatList for saved recipes
   - Empty state handling
   - Remove from favorites functionality
   - Navigation to recipe details

### Assessment Criteria Addressed
- FlatLists/ScrollView (2 points)
- Expo Navigation (2 points)
- Route parameters (1 point)
- App looks good and is easy to use (3 points)
- Adaptive and responsive UIs (1 point)

---

## 🔗 Integration Guidelines

### Communication Between Parts
1. **Part 1 → Part 2**: Provides API functions and types
2. **Part 1 → Part 3**: Provides theme and common styles
3. **Part 2 → Part 3**: Provides components and context
4. **Part 3**: Integrates everything into working screens

### Testing Integration
- Test API calls work with components
- Verify state management across screens
- Ensure theme consistency
- Check navigation flows

### Code Review Checkpoints
1. **After Part 1**: API and types working
2. **After Part 2**: Components render correctly
3. **After Part 3**: Full app functionality
4. **Final Review**: Polish and optimization

---

## 📊 Points Distribution

| Part | Team Member | Estimated Points | Key Criteria |
|------|-------------|------------------|--------------|
| 1 | [Name] | ~12 points | API, Themes, Architecture |
| 2 | [Name] | ~12 points | Components, State, Events |
| 3 | [Name] | ~13 points | Screens, Navigation, UX |
| **Shared** | **All** | **3 points** | **Requirements Documentation** |

**Total: 40 points maximum**

---

## 🚀 Getting Started

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

## 📞 Team Communication
- Regular check-ins every 2-3 days
- Shared documentation of progress
- Issue tracking for blockers
- Code review before integration

**Good luck with your Recipe Box project! 🍳📱**