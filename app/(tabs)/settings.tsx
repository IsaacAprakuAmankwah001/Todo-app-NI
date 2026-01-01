import { createSettingsStyles } from '@/assets/styles/settings.styles';
import Preferences from '@/components/Preferences';
import ProgressStats from '@/components/ProgressStats';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const SettingScreen = () => {
  const {colors } = useTheme();

  const settingsStyles = createSettingsStyles(colors);
  return (
    <SafeAreaProvider>
      <LinearGradient colors={colors.gradients.background} style={settingsStyles.container}>
        <SafeAreaView style={settingsStyles.safeArea}>
          <View style={settingsStyles.header}>
            <View style={settingsStyles.titleContainer}>
              <LinearGradient colors={colors.gradients.primary} style={settingsStyles.iconContainer}>
                <Ionicons name="settings-sharp" size={28} color="#ffffff" />
              </LinearGradient>
              <Text style={settingsStyles.title}>Settings</Text>
            </View>
          </View>

          <ScrollView 
          style={settingsStyles.scrollView} 
          contentContainerStyle={settingsStyles.content}
          showsVerticalScrollIndicator={false}
          >
            <ProgressStats />
            <Preferences />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  )
}

export default SettingScreen