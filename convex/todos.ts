import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({
    args:{},
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").order("desc").collect();
        return todos;
    },
});

export const addTodo = mutation({
    args: {title: v.string()},
    handler: async (ctx, args) =>{
        const todoId = await ctx.db.insert("todos", {
            title: args.title, 
            isCompleted: false,
        });
        return todoId;
    },
});

export const toggleTodo = mutation({
    args: {id: v.id("todos")},
    handler: async (ctx, args) =>{
        const todos = await ctx.db.get(args.id);
        if(!todos) throw new Error("Todo not found");

        await ctx.db.patch(args.id, {
            isCompleted: !todos.isCompleted,
        });
    },
});

export const deleteTodo = mutation({
    args: {id: v.id("todos")},
    handler: async (ctx, args) =>{
        await ctx.db.delete(args.id);
    },
});

export const updateTodo = mutation({
    args: {
        id: v.id("todos"),
        title: v.string(),
    },
    handler: async (ctx, args) =>{
        await ctx.db.patch(args.id, {
            title: args.title,
        });
    },
});

export const clearAllTodos = mutation({
    handler: async (ctx) =>{
        const todos = await ctx.db.query("todos").collect();

        //Delete all todos 
        for(const todo of todos){
            await ctx.db.delete(todo._id);
        }
        return{deleteCount: todos.length};  
    },
});