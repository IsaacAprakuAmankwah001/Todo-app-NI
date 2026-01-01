import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, Text } from 'react-native';

const DangerZone = () => {
    const {colors} = useTheme();
    const settingsStyles = createSettingsStyles(colors);

    const clearAllTodos = useMutation(api.todos.clearAllTodos);

    const handleResetApp = async () => {
        Alert.alert(
        "Reset App",
        "⚠️ This will delete ALL your todos permanently. This action cannot be undone.",
        [
            { text: "Cancel", style: "cancel" },
            {
            text: "Delete All",
            style: "destructive",
            onPress: async () => {
                try {
                const result = await clearAllTodos();
                Alert.alert(
                    "App Reset",
                    `Successfully deleted ${result.deleteCount} todo${result.deleteCount === 1 ? "" : "s"}. Your app has been reset.`
                );
                } catch (error) {
                console.log("Error deleting all todos", error);
                Alert.alert("Error", "Failed to reset app");
                }
            },
            },
        ]
        );
    };

  return (
    <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
        <Text style={settingsStyles.sectionTitle}>Danger Zone</Text>
    </LinearGradient>
  )
}

export default DangerZone