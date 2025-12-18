import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  TextStyle,
} from "react-native";
import { SearchInputProps } from "../types";
import { lightTheme, dimensions } from "../styles/theme";
import { searchInputStyles } from "@/styles/searchStyles";

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  onSearch,
  placeholder = "Search recipes...",
  loading = false,
  style,
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
        searchInputStyles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: isFocused ? theme.colors.primary : theme.colors.border,
        },
      ]}
    >
      <TextInput
        ref={inputRef}
        style={[searchInputStyles.input, style]}
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
        <View style={searchInputStyles.rightIconContainer}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </View>
      ) : (
        value.length > 0 && (
          <TouchableOpacity
            style={searchInputStyles.clearButton}
            onPress={handleClear}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            accessibilityHint="Clears the search input"
          >
            <View
              style={[
                searchInputStyles.clearIcon,
                { backgroundColor: theme.colors.textSecondary },
              ]}
            >
              <View
                style={[
                  searchInputStyles.clearIconLine,
                  searchInputStyles.clearIconLine1,
                ]}
              />
              <View
                style={[
                  searchInputStyles.clearIconLine,
                  searchInputStyles.clearIconLine2,
                ]}
              />
            </View>
          </TouchableOpacity>
        )
      )}
    </View>
  );
};
