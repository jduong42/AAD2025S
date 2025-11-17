/**
 * Theme System for Recipe Box Application
 * Provides light and dark theme configurations with consistent design tokens
 * Follows Material Design and modern mobile design principles
 */

import { Theme, ThemeColors } from '../types';

// Base spacing scale (8pt grid system)
const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// Border radius scale
const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 20,
} as const;

// Typography scale
const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
} as const;

const FONT_WEIGHT = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// Light Theme Colors
const LIGHT_COLORS: ThemeColors = {
  // Primary colors (Orange/Amber for food theme)
  primary: '#FF6B35',
  primaryDark: '#E55A2E',
  
  // Secondary colors
  secondary: '#6B7280',
  
  // Background colors
  background: '#FFFFFF',
  surface: '#F9FAFB',
  card: '#FFFFFF',
  
  // Text colors
  text: '#1F2937',
  textSecondary: '#6B7280',
  
  // Utility colors
  border: '#E5E7EB',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  
  // Absolute colors
  white: '#FFFFFF',
  black: '#000000',
};

// Dark Theme Colors
const DARK_COLORS: ThemeColors = {
  // Primary colors
  primary: '#FF8A5B',
  primaryDark: '#FF6B35',
  
  // Secondary colors
  secondary: '#9CA3AF',
  
  // Background colors
  background: '#0F172A',
  surface: '#1E293B',
  card: '#334155',
  
  // Text colors
  text: '#F1F5F9',
  textSecondary: '#CBD5E1',
  
  // Utility colors
  border: '#475569',
  error: '#F87171',
  success: '#34D399',
  warning: '#FBBF24',
  
  // Absolute colors
  white: '#FFFFFF',
  black: '#000000',
};

// Light Theme
export const lightTheme: Theme = {
  colors: LIGHT_COLORS,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  fontSize: FONT_SIZE,
  fontWeight: FONT_WEIGHT,
};

// Dark Theme
export const darkTheme: Theme = {
  colors: DARK_COLORS,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  fontSize: FONT_SIZE,
  fontWeight: FONT_WEIGHT,
};

// Default theme (light)
export const defaultTheme = lightTheme;

// Theme utilities
export const getTheme = (isDark: boolean): Theme => {
  return isDark ? darkTheme : lightTheme;
};

// Color utilities for gradients and variations
export const createColorVariations = (baseColor: string) => {
  // This would typically use a color manipulation library
  // For now, returning static variations
  return {
    50: baseColor + '0D',  // 5% opacity
    100: baseColor + '1A', // 10% opacity
    200: baseColor + '33', // 20% opacity
    300: baseColor + '4D', // 30% opacity
    400: baseColor + '66', // 40% opacity
    500: baseColor,        // Base color
    600: baseColor + 'CC', // 80% opacity
    700: baseColor + 'B3', // 70% opacity
    800: baseColor + '99', // 60% opacity
    900: baseColor + '80', // 50% opacity
  };
};

// Shadow configurations for different platforms
export const shadows = {
  light: {
    // iOS style shadows
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    // Android style elevation
    android: {
      elevation: 4,
    },
  },
  medium: {
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
  },
  heavy: {
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
    android: {
      elevation: 16,
    },
  },
};

// Animation timings
export const animations = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

// Common component dimensions
export const dimensions = {
  headerHeight: 60,
  tabBarHeight: 60,
  buttonHeight: {
    small: 32,
    medium: 44,
    large: 56,
  },
  iconSize: {
    small: 16,
    medium: 24,
    large: 32,
    xlarge: 48,
  },
  imageSize: {
    thumbnail: 80,
    small: 120,
    medium: 200,
    large: 300,
  },
} as const;

// Breakpoints for responsive design
export const breakpoints = {
  small: 320,  // Small phones
  medium: 375, // Standard phones
  large: 414,  // Large phones
  xlarge: 768, // Tablets
} as const;