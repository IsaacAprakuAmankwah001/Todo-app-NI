import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, FlatList, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = Doc<"todos">;

export default function Index() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);

  const isLoading = todos === undefined;

  if (isLoading) return <LoadingSpinner />;

  const handleToggleTodo = async (id : Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.log("Error toggling todo:", error);
      Alert.alert("Error", "Failed to update the todo. Please try again.");
    }
  };

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <View style={homeStyles.todoItemWrapper}>
      <LinearGradient 
      colors={colors.gradients.surface}
      style ={homeStyles.todoItem}
      start={{x:0, y:0}}
      end={{x:1, y:1}}
      >
        <TouchableOpacity 
        style={homeStyles.checkbox}
        activeOpacity={0.7}
        onPress={() => handleToggleTodo(item._id)}
        >
          <LinearGradient
          colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
          style={[homeStyles.checkboxInner,
            { borderColor: item.isCompleted ? "transparent" : colors.border}
          ]}
          >
            {item.isCompleted && <Ionicons name="checkmark" size={18} color="#ffffff"/>}

          </LinearGradient>
        </TouchableOpacity>
        <View>
          <Text
          style={[
            homeStyles.todoText,
            item.isCompleted && {
              textDecorationLine: 'line-through',
              color: colors.textMuted,
              opacity: 0.6,
            }
          ]}
          >
            {item.title}
          </Text>

          <View style={homeStyles.todoActions}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{}}>
              <LinearGradient 
              colors={colors.gradients.warning}
              style={homeStyles.actionButton}
              >
                <Ionicons name="pencil" size={14} color="#ffffff"/>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{}}>
              <LinearGradient 
              colors={colors.gradients.danger}
              style={homeStyles.actionButton}
              >
                <Ionicons name="trash" size={14} color="#ffffff"/>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar  barStyle={colors.statusBarStyle } />
      <SafeAreaView style={homeStyles.safeArea} >
        <Header/>
        <TodoInput/> 

        <FlatList
          data={todos}
          keyExtractor={(todo) => todo._id}
          renderItem={renderTodoItem}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
        />
      
      </SafeAreaView>
    </LinearGradient>
  );
}
 
