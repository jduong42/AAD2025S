import type { RecipeSummary } from "@/services/mealdb";
import { searchRecipes } from "@/services/mealdb";
import searchStyles from "@/styles/search";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert("Error", "Please enter a search term.");
      return;
    }

    setLoading(true);
    setRecipes([]);

    const result = await searchRecipes(searchQuery);

    setLoading(false);

    if (!result.success) {
      Alert.alert("Search failed", result.error || "Something went wrong.");
      return;
    }

    setRecipes(result.data || []);
  };

  const renderRecipeCard = ({ item }: { item: RecipeSummary }) => (
    <TouchableOpacity style={searchStyles.recipeCard}>
      <Image
        source={{ uri: item.thumbnail }}
        style={searchStyles.recipeImage}
        resizeMode="cover"
      />
      <View style={searchStyles.recipeInfo}>
        <Text style={searchStyles.recipeName} numberOfLines={2}>
          {item.name}
        </Text>
        {item.category && (
          <Text style={searchStyles.recipeCategory}>{item.category}</Text>
        )}
        {item.area && <Text style={searchStyles.recipeArea}>{item.area}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={searchStyles.container}>
      <Text style={searchStyles.title}>Search Recipes</Text>

      <TextInput
        style={searchStyles.searchInput}
        placeholder="Search for recipes (e.g., chicken, pasta)..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity
        style={[
          searchStyles.searchButton,
          loading && searchStyles.searchButtonDisabled,
        ]}
        onPress={handleSearch}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={searchStyles.searchButtonText}>Search</Text>
        )}
      </TouchableOpacity>

      <FlatList
        data={recipes}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={searchStyles.listContainer}
        ListEmptyComponent={
          !loading && recipes.length === 0 ? (
            <View style={searchStyles.emptyContainer}>
              <Text style={searchStyles.emptyText}>
                {searchQuery
                  ? `No recipes found for "${searchQuery}"`
                  : "Search for your favorite recipes!"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
