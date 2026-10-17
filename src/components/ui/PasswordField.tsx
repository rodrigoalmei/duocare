import { useState } from 'react';
import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors } from '@/constants/colors';

import { TextField, type TextFieldProps } from './TextField';

export function PasswordField(props: Omit<TextFieldProps, 'secureTextEntry' | 'rightIcon'>) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...props}
      secureTextEntry={!visible}
      rightIcon={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={visible ? 'Ocultar senha' : 'Mostrar senha'}
          hitSlop={12}
          onPress={() => setVisible((current) => !current)}>
          <Ionicons name={visible ? 'eye-off-outline' : 'eye-outline'} size={22} color={colors.textSecondary} />
        </Pressable>
      }
    />
  );
}
