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
import { useState } from "react";
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = Doc<"todos">;

export default function Index() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

const [editedId, setEditedId] = useState<Id<"todos"> | null>(null);
const [editedTitle, setEditedTitle] = useState<string>(""); 

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);

  const isLoading = todos === undefined;

  if (isLoading) return <LoadingSpinner />;

  const handleToggleTodo = async (id : Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.log("Error toggling todo:", error);
      Alert.alert("Error", "Failed to toggle todo. Please try again.");
    }
  };

  const handleDeleteTodo = async (id: Id<"todos">) => {
      Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTodo({ id }),
        },
      ]);
    };

  const handleEditTodo =  ( todo: Todo) => {
    setEditedId(todo._id);
    setEditedTitle(todo.title);
  };
  const handleSaveEdit =  async( todo: Todo) => {

    if (editedId ) {
      try {
        await updateTodo({ id: editedId, title: editedTitle.trim() });
        setEditedId(null);
        setEditedTitle("");
      } catch (error) {
        console.log("Error updating todo:", error);
      Alert.alert("Error", "Failed to update todo. Please try again.");
    } 
   }
  };

  const handleCancelEdit =  ( todo: Todo) => {
    setEditedId(null);
    setEditedTitle("");
  };


  const renderTodoItem = ({ item }: { item: Todo }) => {
        const isEditing = editedId === item._id;
        return (   
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
        
        
        {isEditing? (
          <View style={homeStyles.editContainer}>
            <TextInput
              value={editedTitle}
              onChangeText={setEditedTitle}
              style={homeStyles.editInput}
              autoFocus
              multiline
              placeholder="Edit your todo ..."
              placeholderTextColor={colors.textMuted}
            />
            <View style={homeStyles.editButtons}>
              <TouchableOpacity activeOpacity={0.8} onPress={()=> handleSaveEdit}>
                <LinearGradient 
                colors={colors.gradients.success}
                style={homeStyles.editButton}
                >
                  <Ionicons name="checkmark" size={16} color="#ffffff"/>
                  <Text style={homeStyles.editButtonText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={homeStyles.todoTextContainer}>
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
            <TouchableOpacity activeOpacity={0.8} onPress={()=> handleEditTodo(item)}>
              <LinearGradient 
              colors={colors.gradients.warning}
              style={homeStyles.actionButton}
              >
                <Ionicons name="pencil" size={14} color="#ffffff"/>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={()=> handleDeleteTodo(item._id)}>
              <LinearGradient 
              colors={colors.gradients.danger}
              style={homeStyles.actionButton}
              >
                <Ionicons name="trash" size={14} color="#ffffff"/>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        )}
      </LinearGradient>
    </View>
  );

  }
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
          //showsVerticalScrollIndicator={false}
        />
      
      </SafeAreaView>
    </LinearGradient>
  );
}
 
