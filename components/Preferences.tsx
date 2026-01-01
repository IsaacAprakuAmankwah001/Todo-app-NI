import { createSettingsStyles } from '@/assets/styles/settings.styles';
import useTheme from '@/hooks/useTheme';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';

const Preferences = () => {
const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const {colors,isDarkMode,toggleDarkMode } = useTheme();

  const settingsStyles = createSettingsStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
      <Text style={settingsStyles.sectionTitle}>Preferences</Text>

      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
            <LinearGradient colors={colors.gradients.primary} style={settingsStyles.settingIcon}>
                <Ionicons name="moon" size={24} color="#ffffff" />
            </LinearGradient>
            <Text style={settingsStyles.settingText}>Dark Mode</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
            thumbColor={isDarkMode ? colors.primary : '#f4f3f4'}
            trackColor={{ false: '#767577', true: colors.success}}
        />
      </View>

      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
            <LinearGradient colors={colors.gradients.warning} style={settingsStyles.settingIcon}>
                <Ionicons name="notifications" size={24} color="#ffffff" />
            </LinearGradient>
            <Text style={settingsStyles.settingText}>Notifications</Text>
        </View>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={setIsNotificationsEnabled}
            thumbColor={isNotificationsEnabled ? colors.warning : '#f4f3f4'}
            trackColor={{ false: '#767577', true: colors.warning}}
        />
      </View>

      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
            <LinearGradient colors={colors.gradients.success} style={settingsStyles.settingIcon}>
                <Ionicons name="sync" size={24} color="#ffffff" />
            </LinearGradient>
            <Text style={settingsStyles.settingText}>Auto Sync</Text>
        </View>
        <Switch
          value={isAutoSync}
          onValueChange={() => setIsAutoSync(!isAutoSync)}
            thumbColor={isAutoSync ? colors.primary : '#f4f3f4'}
            trackColor={{ false: '#767577', true: colors.success}}
        />
      </View>
    </LinearGradient>
  )
}

export default Preferences