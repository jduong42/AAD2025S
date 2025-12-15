import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { lightTheme } from '../styles/theme';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message,
  size = 'large',
  color,
  fullScreen = true,
}) => {
  const theme = lightTheme;
  const spinnerColor = color || theme.colors.primary;

  const content = (
    <View
      style={[styles.content, fullScreen && styles.fullScreenContent]}
      accessibilityRole="progressbar"
      accessibilityLabel={message || 'Loading'}
      accessibilityLiveRegion="polite"
    >
      <ActivityIndicator size={size} color={spinnerColor} animating={true} />

      {message && (
        <Text
          style={[
            styles.message,
            { color: theme.colors.textSecondary },
            size === 'small' && styles.messageSmall,
          ]}
        >
          {message}
        </Text>
      )}
    </View>
  );

  if (fullScreen) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {content}
      </View>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenContent: {
    paddingHorizontal: lightTheme.spacing.lg,
  },
  message: {
    marginTop: lightTheme.spacing.md,
    fontSize: lightTheme.fontSize.md,
    fontWeight: lightTheme.fontWeight.medium,
    textAlign: 'center',
    lineHeight: lightTheme.fontSize.md * 1.5,
  },
  messageSmall: {
    marginTop: lightTheme.spacing.sm,
    fontSize: lightTheme.fontSize.sm,
  },
});

export const LoadingOverlay: React.FC<Omit<LoadingSpinnerProps, 'fullScreen'>> = (props) => {
  const theme = lightTheme;

  return (
    <View style={[overlayStyles.overlay, { backgroundColor: theme.colors.background + 'CC' }]}>
      <LoadingSpinner {...props} fullScreen={false} />
    </View>
  );
};

const overlayStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default LoadingSpinner;
