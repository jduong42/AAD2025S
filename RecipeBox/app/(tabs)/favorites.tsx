import { useFavorites } from "@/context/FavoritesContext";
import type { RecipeSummary } from "@/services/mealdb";
import searchStyles from "@/styles/search";
import { useRouter } from "expo-router";
import { FlatList, Image, Pressable, Text, View } from "react-native";

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites } = useFavorites();

  const handleRecipePress = (id: string) => {
    router.push(`/recipe/${id}`);
  };

  const renderRecipeCard = ({ item }: { item: RecipeSummary }) => (
    <Pressable
      style={searchStyles.recipeCard}
      onPress={() => handleRecipePress(item.id)}
    >
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
    </Pressable>
  );

  return (
    <View style={searchStyles.container}>
      <Text style={searchStyles.title}>Favorites</Text>
      <FlatList
        data={favorites}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={searchStyles.listContainer}
        ListEmptyComponent={
          <View style={searchStyles.emptyContainer}>
            <Text style={searchStyles.emptyText}>🤍</Text>
            <Text style={searchStyles.emptyText}>No favorites yet!</Text>
            <Text style={searchStyles.emptyText}>
              Add some recipes to your favorites to see them here.
            </Text>
          </View>
        }
      />
    </View>
  );
}
