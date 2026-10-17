import type { ReactNode } from 'react';
import { forwardRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
  type TextInput as TextInputType,
} from 'react-native';

import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { fontFamily } from '@/constants/typography';

import { AppText } from './AppText';

export type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export const TextField = forwardRef<TextInputType, TextFieldProps>(function TextField(
  { label, error, helperText, leftIcon, rightIcon, editable = true, style, onFocus, onBlur, ...props },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const helper = error ?? helperText;

  return (
    <View style={styles.wrapper}>
      <AppText variant="label" color={colors.textSecondary}>
        {label}
      </AppText>
      <View
        style={[
          styles.field,
          focused && styles.focused,
          Boolean(error) && styles.error,
          !editable && styles.disabled,
        ]}>
        {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
        <TextInput
          ref={ref}
          accessibilityLabel={label}
          editable={editable}
          placeholderTextColor={colors.neutral[500]}
          selectionColor={colors.brand.coral}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          style={[styles.input, style]}
          {...props}
        />
        {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
      </View>
      {helper ? (
        <AppText variant="caption" color={error ? colors.status.error : colors.textSecondary}>
          {helper}
        </AppText>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: { width: '100%', gap: spacing[2] },
  field: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing[4],
  },
  focused: { borderColor: colors.brand.coral, borderWidth: 2, paddingHorizontal: 15 },
  error: { borderColor: colors.status.error },
  disabled: { opacity: 0.55, backgroundColor: colors.neutral[100] },
  input: {
    flex: 1,
    minWidth: 0,
    color: colors.text,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: spacing[3],
  },
  icon: { alignItems: 'center', justifyContent: 'center', marginRight: spacing[2] },
});
