/**
 * Centralized Common Styles for Recipe Box Application
 * Provides reusable StyleSheet objects using Flexbox for consistent UI
 * Follows mobile-first responsive design principles
 */

import { StyleSheet, Platform } from "react-native";
import { lightTheme, shadows, dimensions } from "./theme";

// Note: Device dimensions available via Dimensions.get('window') when needed

// Common layout styles using Flexbox
export const layoutStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: lightTheme.spacing.lg,
  },

  safeContainer: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
    paddingTop: Platform.OS === "android" ? 25 : 0, // Status bar padding
  },

  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightTheme.colors.background,
    paddingHorizontal: lightTheme.spacing.md,
  },

  paddedContainer: {
    flex: 1,
    padding: lightTheme.spacing.md,
    backgroundColor: lightTheme.colors.background,
  },

  // Flexbox utilities
  row: {
    flexDirection: "row",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  rowStart: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  rowEnd: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  column: {
    flexDirection: "column",
  },

  columnCenter: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  columnBetween: {
    flexDirection: "column",
    justifyContent: "space-between",
  },

  // Flex utilities
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },

  // Alignment utilities
  alignCenter: { alignItems: "center" },
  alignStart: { alignItems: "flex-start" },
  alignEnd: { alignItems: "flex-end" },
  alignStretch: { alignItems: "stretch" },

  justifyCenter: { justifyContent: "center" },
  justifyStart: { justifyContent: "flex-start" },
  justifyEnd: { justifyContent: "flex-end" },
  justifyBetween: { justifyContent: "space-between" },
  justifyAround: { justifyContent: "space-around" },
  justifyEvenly: { justifyContent: "space-evenly" },

  // Positioning
  absolute: { position: "absolute" },
  relative: { position: "relative" },

  // Full dimensions
  fullWidth: { width: "100%" },
  fullHeight: { height: "100%" },
});

// Typography styles
export const textStyles = StyleSheet.create({
  // Headers
  h1: {
    fontSize: lightTheme.fontSize.xxl,
    fontWeight: lightTheme.fontWeight.bold,
    color: lightTheme.colors.text,
    marginBottom: lightTheme.spacing.sm,
  },

  h2: {
    fontSize: lightTheme.fontSize.xl,
    fontWeight: lightTheme.fontWeight.bold,
    color: lightTheme.colors.text,
    marginBottom: lightTheme.spacing.sm,
  },

  h3: {
    fontSize: lightTheme.fontSize.lg,
    fontWeight: lightTheme.fontWeight.semibold,
    color: lightTheme.colors.text,
    marginBottom: lightTheme.spacing.xs,
  },

  // Body text
  body: {
    fontSize: lightTheme.fontSize.md,
    fontWeight: lightTheme.fontWeight.regular,
    color: lightTheme.colors.text,
    lineHeight: lightTheme.fontSize.md * 1.5,
  },

  bodySmall: {
    fontSize: lightTheme.fontSize.sm,
    fontWeight: lightTheme.fontWeight.regular,
    color: lightTheme.colors.text,
    lineHeight: lightTheme.fontSize.sm * 1.5,
  },

  // Secondary text
  caption: {
    fontSize: lightTheme.fontSize.sm,
    fontWeight: lightTheme.fontWeight.regular,
    color: lightTheme.colors.textSecondary,
    lineHeight: lightTheme.fontSize.sm * 1.4,
  },

  // Interactive text
  link: {
    fontSize: lightTheme.fontSize.md,
    fontWeight: lightTheme.fontWeight.medium,
    color: lightTheme.colors.primary,
    textDecorationLine: "underline",
  },

  // Text alignment
  textCenter: { textAlign: "center" },
  textLeft: { textAlign: "left" },
  textRight: { textAlign: "right" },

  // Text colors
  textPrimary: { color: lightTheme.colors.primary },
  textSecondary: { color: lightTheme.colors.textSecondary },
  textError: { color: lightTheme.colors.error },
  textSuccess: { color: lightTheme.colors.success },
  textWarning: { color: lightTheme.colors.warning },
});

// Card and surface styles
export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: lightTheme.colors.card,
    borderRadius: lightTheme.borderRadius.md,
    padding: lightTheme.spacing.md,
    marginBottom: lightTheme.spacing.sm,
    // Platform-specific shadows
    ...(Platform.OS === "ios" ? shadows.light.ios : {}),
    ...(Platform.OS === "android"
      ? { elevation: shadows.light.android.elevation }
      : {}),
  },

  cardElevated: {
    backgroundColor: lightTheme.colors.card,
    borderRadius: lightTheme.borderRadius.md,
    padding: lightTheme.spacing.md,
    marginBottom: lightTheme.spacing.sm,
    // Platform-specific shadows
    ...(Platform.OS === "ios" ? shadows.medium.ios : {}),
    ...(Platform.OS === "android"
      ? { elevation: shadows.medium.android.elevation }
      : {}),
  },

  surface: {
    backgroundColor: lightTheme.colors.surface,
    borderRadius: lightTheme.borderRadius.sm,
    padding: lightTheme.spacing.sm,
  },

  // Card components
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: lightTheme.spacing.sm,
  },

  cardBody: {
    flex: 1,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: lightTheme.spacing.sm,
    paddingTop: lightTheme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: lightTheme.colors.border,
  },
});

// Button styles
export const buttonStyles = StyleSheet.create({
  // Base button
  button: {
    borderRadius: lightTheme.borderRadius.md,
    paddingVertical: lightTheme.spacing.sm,
    paddingHorizontal: lightTheme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: dimensions.buttonHeight.medium,
  },

  // Button variants
  buttonPrimary: {
    backgroundColor: lightTheme.colors.primary,
    // Platform-specific shadows
    ...(Platform.OS === "ios" ? shadows.light.ios : {}),
    ...(Platform.OS === "android"
      ? { elevation: shadows.light.android.elevation }
      : {}),
  },

  buttonSecondary: {
    backgroundColor: lightTheme.colors.surface,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
  },

  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: lightTheme.colors.primary,
  },

  buttonGhost: {
    backgroundColor: "transparent",
  },

  // Button sizes
  buttonSmall: {
    minHeight: dimensions.buttonHeight.small,
    paddingVertical: lightTheme.spacing.xs,
    paddingHorizontal: lightTheme.spacing.sm,
  },

  buttonLarge: {
    minHeight: dimensions.buttonHeight.large,
    paddingVertical: lightTheme.spacing.md,
    paddingHorizontal: lightTheme.spacing.lg,
  },

  // Button text
  buttonText: {
    fontSize: lightTheme.fontSize.md,
    fontWeight: lightTheme.fontWeight.semibold,
    color: lightTheme.colors.white,
  },

  buttonTextSecondary: {
    color: lightTheme.colors.text,
  },

  buttonTextOutline: {
    color: lightTheme.colors.primary,
  },

  // Button states
  buttonDisabled: {
    opacity: 0.6,
  },

  buttonPressed: {
    opacity: 0.8,
  },
});

// Input styles
export const inputStyles = StyleSheet.create({
  inputContainer: {
    marginBottom: lightTheme.spacing.md,
  },

  input: {
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    borderRadius: lightTheme.borderRadius.md,
    paddingVertical: lightTheme.spacing.sm,
    paddingHorizontal: lightTheme.spacing.md,
    fontSize: lightTheme.fontSize.md,
    color: lightTheme.colors.text,
    backgroundColor: lightTheme.colors.surface,
    minHeight: dimensions.buttonHeight.medium,
  },

  inputFocused: {
    borderColor: lightTheme.colors.primary,
    borderWidth: 2,
  },

  inputError: {
    borderColor: lightTheme.colors.error,
  },

  inputLabel: {
    fontSize: lightTheme.fontSize.sm,
    fontWeight: lightTheme.fontWeight.medium,
    color: lightTheme.colors.text,
    marginBottom: lightTheme.spacing.xs,
  },

  inputErrorText: {
    fontSize: lightTheme.fontSize.sm,
    color: lightTheme.colors.error,
    marginTop: lightTheme.spacing.xs,
  },
});

// Spacing utilities
export const spacingStyles = StyleSheet.create({
  // Margins
  m0: { margin: 0 },
  mXs: { margin: lightTheme.spacing.xs },
  mSm: { margin: lightTheme.spacing.sm },
  mMd: { margin: lightTheme.spacing.md },
  mLg: { margin: lightTheme.spacing.lg },
  mXl: { margin: lightTheme.spacing.xl },

  // Horizontal margins
  mhXs: { marginHorizontal: lightTheme.spacing.xs },
  mhSm: { marginHorizontal: lightTheme.spacing.sm },
  mhMd: { marginHorizontal: lightTheme.spacing.md },
  mhLg: { marginHorizontal: lightTheme.spacing.lg },

  // Vertical margins
  mvXs: { marginVertical: lightTheme.spacing.xs },
  mvSm: { marginVertical: lightTheme.spacing.sm },
  mvMd: { marginVertical: lightTheme.spacing.md },
  mvLg: { marginVertical: lightTheme.spacing.lg },

  // Specific margins
  mtXs: { marginTop: lightTheme.spacing.xs },
  mtSm: { marginTop: lightTheme.spacing.sm },
  mtMd: { marginTop: lightTheme.spacing.md },
  mtLg: { marginTop: lightTheme.spacing.lg },

  mbXs: { marginBottom: lightTheme.spacing.xs },
  mbSm: { marginBottom: lightTheme.spacing.sm },
  mbMd: { marginBottom: lightTheme.spacing.md },
  mbLg: { marginBottom: lightTheme.spacing.lg },

  // Paddings
  p0: { padding: 0 },
  pXs: { padding: lightTheme.spacing.xs },
  pSm: { padding: lightTheme.spacing.sm },
  pMd: { padding: lightTheme.spacing.md },
  pLg: { padding: lightTheme.spacing.lg },

  // Horizontal paddings
  phXs: { paddingHorizontal: lightTheme.spacing.xs },
  phSm: { paddingHorizontal: lightTheme.spacing.sm },
  phMd: { paddingHorizontal: lightTheme.spacing.md },
  phLg: { paddingHorizontal: lightTheme.spacing.lg },

  // Vertical paddings
  pvXs: { paddingVertical: lightTheme.spacing.xs },
  pvSm: { paddingVertical: lightTheme.spacing.sm },
  pvMd: { paddingVertical: lightTheme.spacing.md },
  pvLg: { paddingVertical: lightTheme.spacing.lg },
});

// List styles
export const listStyles = StyleSheet.create({
  list: {
    flex: 1,
  },

  listContent: {
    padding: lightTheme.spacing.md,
  },

  listItem: {
    backgroundColor: lightTheme.colors.card,
    borderRadius: lightTheme.borderRadius.md,
    marginBottom: lightTheme.spacing.sm,
    // Platform-specific shadows
    ...(Platform.OS === "ios" ? shadows.light.ios : {}),
    ...(Platform.OS === "android"
      ? { elevation: shadows.light.android.elevation }
      : {}),
  },

  listItemPressed: {
    opacity: 0.8,
  },

  listSeparator: {
    height: 1,
    backgroundColor: lightTheme.colors.border,
    marginVertical: lightTheme.spacing.xs,
  },

  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: lightTheme.spacing.lg,
  },
});

// Image styles
export const imageStyles = StyleSheet.create({
  imageThumbnail: {
    width: dimensions.imageSize.thumbnail,
    height: dimensions.imageSize.thumbnail,
    borderRadius: lightTheme.borderRadius.sm,
  },

  imageSmall: {
    width: dimensions.imageSize.small,
    height: dimensions.imageSize.small,
    borderRadius: lightTheme.borderRadius.md,
  },

  imageMedium: {
    width: dimensions.imageSize.medium,
    height: dimensions.imageSize.medium,
    borderRadius: lightTheme.borderRadius.md,
  },

  imageLarge: {
    width: "100%",
    height: dimensions.imageSize.large,
    borderRadius: lightTheme.borderRadius.md,
  },

  imageRounded: {
    borderRadius: 50,
  },

  imageFullWidth: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: lightTheme.borderRadius.md,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: lightTheme.spacing.xl,
  },
});

// Loading and state styles
export const stateStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightTheme.colors.background,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightTheme.colors.background,
    paddingHorizontal: lightTheme.spacing.lg,
  },

  errorText: {
    fontSize: lightTheme.fontSize.md,
    color: lightTheme.colors.error,
    textAlign: "center",
    marginTop: lightTheme.spacing.sm,
  },
  emptyContainer: {
    padding: lightTheme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  emptyText: {
    color: lightTheme.colors.textSecondary,
    fontSize: lightTheme.fontSize.md,
    textAlign: "center",
  },
});

// Utility styles
export const utilityStyles = StyleSheet.create({
  shadow: {
    // Platform-specific shadows
    ...(Platform.OS === "ios" ? shadows.light.ios : {}),
    ...(Platform.OS === "android"
      ? { elevation: shadows.light.android.elevation }
      : {}),
  },

  shadowMedium: {
    // Platform-specific shadows
    ...(Platform.OS === "ios" ? shadows.medium.ios : {}),
    ...(Platform.OS === "android"
      ? { elevation: shadows.medium.android.elevation }
      : {}),
  },

  shadowHeavy: {
    // Platform-specific shadows
    ...(Platform.OS === "ios" ? shadows.heavy.ios : {}),
    ...(Platform.OS === "android"
      ? { elevation: shadows.heavy.android.elevation }
      : {}),
  },

  border: {
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
  },

  borderTop: {
    borderTopWidth: 1,
    borderTopColor: lightTheme.colors.border,
  },

  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.colors.border,
  },

  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
  },
});

export const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: lightTheme.spacing.xl,
  },
  content: {
    alignItems: "center",
    maxWidth: 500,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: lightTheme.spacing.xl,
  },
  title: {
    fontSize: 40,
    fontWeight: "800", // Extra bold (WCAG AA)
    color: "#000000", // Pure black (21:1 contrast ratio)
    marginBottom: lightTheme.spacing.md,
    textAlign: "center",
    lineHeight: 48,
  },
  tagline: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1F2937", // Very dark gray (WCAG AAA: 12.63:1)
    textAlign: "center",
    marginBottom: lightTheme.spacing.xxl,
    paddingHorizontal: lightTheme.spacing.lg,
    lineHeight: 28,
    maxWidth: 400,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 18,
    paddingHorizontal: lightTheme.spacing.xxl,
    borderRadius: lightTheme.borderRadius.lg,
    minWidth: 240,
    minHeight: 56, // WCAG minimum touch target (48px+)
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonPressed: {
    backgroundColor: "#1E40AF", // Darker blue when pressed
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: "#FFFFFF", // Pure white on blue (7.5:1 contrast)
    fontSize: 19,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  decorativeContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  featureList: {
    marginTop: lightTheme.spacing.xl,
    paddingHorizontal: lightTheme.spacing.lg,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: lightTheme.spacing.md,
  },
  featureText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginLeft: lightTheme.spacing.sm,
  },
});

export const headerStyles = StyleSheet.create({
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: lightTheme.colors.background,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerRight: {
    padding: 4,
  },
});

// Export all styles as a single object for easy importing
export const commonStyles = {
  layout: layoutStyles,
  text: textStyles,
  card: cardStyles,
  button: buttonStyles,
  input: inputStyles,
  spacing: spacingStyles,
  list: listStyles,
  image: imageStyles,
  state: stateStyles,
  utility: utilityStyles,
  welcome: welcomeStyles,
  header: headerStyles,
};
