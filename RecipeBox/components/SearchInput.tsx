import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SearchInputProps } from "../types";
import { lightTheme, dimensions } from "../styles/theme";

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  onSearch,
  placeholder = "Search recipes...",
  loading = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<TextInput>(null);
  const theme = lightTheme;

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (value.trim().length > 0) {
      debounceTimerRef.current = setTimeout(() => {
        onSearch(value);
      }, 300);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [value]);

  const handleClear = () => {
    onChangeText("");
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    if (value.trim().length > 0) {
      onSearch(value);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: isFocused ? theme.colors.primary : theme.colors.border,
        },
      ]}
    >
      <View style={styles.searchIconContainer}>
        <View
          style={[styles.searchIcon, { backgroundColor: theme.colors.primary }]}
        >
          <View style={styles.searchIconCircle} />
          <View style={styles.searchIconHandle} />
        </View>
      </View>

      <TextInput
        ref={inputRef}
        style={[styles.input, { color: theme.colors.text }]}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={handleSubmit}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="never"
        accessibilityLabel="Search for recipes"
        accessibilityHint="Enter a recipe name or keyword"
        accessibilityRole="search"
      />

      {loading ? (
        <View style={styles.rightIconContainer}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </View>
      ) : (
        value.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClear}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            accessibilityHint="Clears the search input"
          >
            <View
              style={[
                styles.clearIcon,
                { backgroundColor: theme.colors.textSecondary },
              ]}
            >
              <View style={[styles.clearIconLine, styles.clearIconLine1]} />
              <View style={[styles.clearIconLine, styles.clearIconLine2]} />
            </View>
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: lightTheme.borderRadius.md,
    borderWidth: 2,
    paddingHorizontal: lightTheme.spacing.md,
    minHeight: dimensions.buttonHeight.medium,
    marginBottom: lightTheme.spacing.md,
  },
  searchIconContainer: {
    marginRight: lightTheme.spacing.sm,
  },
  searchIcon: {
    width: 20,
    height: 20,
    position: "relative",
  },
  searchIconCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: lightTheme.colors.white,
    position: "absolute",
    top: 0,
    left: 0,
  },
  searchIconHandle: {
    width: 2,
    height: 8,
    backgroundColor: lightTheme.colors.white,
    position: "absolute",
    bottom: 0,
    right: 0,
    transform: [{ rotate: "45deg" }],
  },
  input: {
    flex: 1,
    fontSize: lightTheme.fontSize.md,
    paddingVertical:
      Platform.OS === "ios" ? lightTheme.spacing.sm : lightTheme.spacing.xs,
  },
  rightIconContainer: {
    marginLeft: lightTheme.spacing.sm,
  },
  clearButton: {
    marginLeft: lightTheme.spacing.sm,
    padding: lightTheme.spacing.xs,
  },
  clearIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  clearIconLine: {
    width: 10,
    height: 2,
    backgroundColor: lightTheme.colors.white,
    position: "absolute",
  },
  clearIconLine1: {
    transform: [{ rotate: "45deg" }],
  },
  clearIconLine2: {
    transform: [{ rotate: "-45deg" }],
  },
});

export default SearchInput;
