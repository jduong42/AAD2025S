import React, { useState } from "react";
import { View, FlatList, Text } from "react-native";
import { router } from "expo-router";
import { SearchInput } from "@/components/SearchInput";
import { RecipeCard } from "@/components/RecipeCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { searchRecipes } from "@/services/mealdbAPI";
import { RecipeCard as RecipeCardType } from "@/types";
import { layoutStyles, stateStyles } from "@/styles/commonStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<RecipeCardType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setError("Please enter a valid search term.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await searchRecipes(query);
      setRecipes(result);
    } catch (err) {
      setError("Failed to fetch recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={layoutStyles.container}>
      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
        placeholder="Search for recipes..."
      />

      {loading && <LoadingSpinner />}

      {error && (
        <View style={stateStyles.errorContainer}>
          <Text style={stateStyles.errorText}>{error}</Text>
        </View>
      )}

      {!loading && !error && recipes.length === 0 && searchQuery.trim() && (
        <View style={stateStyles.emptyContainer}>
          <Text style={stateStyles.emptyText}>No recipes found.</Text>
        </View>
      )}

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => router.push(`/detail/${item.idMeal}`)}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
