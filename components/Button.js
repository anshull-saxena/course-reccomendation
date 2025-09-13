import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import theme from '../theme';

export default function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  icon,
  accessibilityLabel,
  ...props
}) {
  const isDisabled = disabled || loading;
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], isDisabled && styles.disabled]}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      activeOpacity={0.85}
      {...props}
    >
      <View style={styles.contentRow}>
        {icon && <View style={styles.icon}>{icon}</View>}
        {loading ? (
          <ActivityIndicator color={theme.color.onPrimary} style={{ marginRight: 8 }} />
        ) : null}
        <Text style={[styles.text, styles[`${variant}Text`], isDisabled && styles.disabledText]} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
    minWidth: 44,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.space.lg,
    paddingVertical: theme.space.sm,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: theme.space.md,
    // Removed elevation and shadow for minimal, visible design
  },
  primary: {
    backgroundColor: theme.color.primary,
  },
  secondary: {
    backgroundColor: theme.color.surface,
    borderWidth: 1,
    borderColor: theme.color.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: theme.typography.scale.md,
    fontWeight: 'bold',
    letterSpacing: theme.typography.letterSpacing.wide,
    color: theme.color.onPrimary,
  },
  primaryText: {
    color: theme.color.onPrimary,
  },
  secondaryText: {
    color: theme.color.primary,
  },
  ghostText: {
    color: theme.color.primary,
  },
  disabledText: {
    color: theme.color.onPrimary,
    opacity: 0.7,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: theme.space.sm,
  },
});
