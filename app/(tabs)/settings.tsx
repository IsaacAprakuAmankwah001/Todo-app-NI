import { createSettingsStyles } from '@/assets/styles/settings.styles';
import useTheme from '@/hooks/useTheme';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

const SettingScreen = () => {
  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const {colors,isDarkMode,toggleDarkMode } = useTheme();

  const settingsStyles = createSettingsStyles(colors);
  return (
    <View>
      <Text>SettingScreen</Text>
    </View>
  )
}

export default SettingScreen