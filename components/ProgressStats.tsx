import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

const ProgressStats = () => {
    const {colors} = useTheme();
    const settingsStyles = createSettingsStyles(colors);

    const todos = useQuery(api.todos.getTodos);
    const totalTodos = todos ? todos.length : 0;
    const completedTodos = todos ? todos.filter(todo => todo.isCompleted).length : 0;
    const activeTodos = totalTodos - completedTodos;

  return (
    <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
        <Text style={settingsStyles.sectionTitle}>Progress Stats</Text>
        <View style={settingsStyles.statsContainer}>
            {/* Total Todos */}
            <LinearGradient colors={colors.gradients.background} style={[settingsStyles.statCard, {borderLeftColor: colors.primary}]}>
                <View style={settingsStyles.statIconContainer}>
                    <LinearGradient colors={colors.gradients.primary} style={settingsStyles.statIcon}>
                        <Ionicons name="list" size={24} color="#ffffff" />
                    </LinearGradient>
                </View>
                <View style={settingsStyles.statInfo}>
                    <Text style={settingsStyles.statLabel}>Total Todos</Text>
                    <Text style={settingsStyles.statNumber}>{totalTodos}</Text>
                </View>
            </LinearGradient>
            {/* Completed Todos */}
            <LinearGradient colors={colors.gradients.background} style={[settingsStyles.statCard, {borderLeftColor: colors.success}]}>
                <View style={settingsStyles.statIconContainer}>
                    <LinearGradient colors={colors.gradients.success} style={settingsStyles.statIcon}>
                        <Ionicons name="checkmark" size={24} color="#ffffff" />
                    </LinearGradient>
                </View>
                <View style={settingsStyles.statInfo}>
                    <Text style={settingsStyles.statLabel}>Completed Todos</Text>
                    <Text style={settingsStyles.statNumber}>{completedTodos}</Text>
                </View>
            </LinearGradient>
            {/* Active Todos */}
            <LinearGradient colors={colors.gradients.background} style={[settingsStyles.statCard, {borderLeftColor: colors.warning}]}>
                <View style={settingsStyles.statIconContainer}>
                    <LinearGradient colors={colors.gradients.warning} style={settingsStyles.statIcon}>
                        <Ionicons name="time" size={24} color="#ffffff" />
                    </LinearGradient>
                </View>
                <View style={settingsStyles.statInfo}>
                    <Text style={settingsStyles.statLabel}>Active</Text>
                    <Text style={settingsStyles.statNumber}>{activeTodos}</Text>
                </View>
            </LinearGradient>
        </View>
    </LinearGradient>
  )
}
export default ProgressStats