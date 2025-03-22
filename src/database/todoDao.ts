import { db } from "../firebase";
import { TodoInput } from "../models/todo.models";

const todosRef = db.collection("todos");

export const createTodo = async (data: TodoInput) => {
    const newTodo = {
        ...data,
        createdAt: new Date().toISOString(),
    };
    const docRef = await todosRef.add(newTodo);
    return {id: docRef.id, ...newTodo};
};

export const getAllTodos = async () => {
    const snapshot = await todosRef.orderBy("createdAt", "desc").get();
    console.log('snapshotDocs: ', snapshot.docs);
    return snapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}));
}

export const updateTodo = async (id: string, data: Partial<TodoInput>) => {
    const docRef = todosRef.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
        return null;
    }
    await docRef.update(data);
    const updatedDoc = await docRef.get();
    return {id: updatedDoc.id, ...updatedDoc.data()};
}

export const deleteTodo = async (id: string) => {
    const docRef = todosRef.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
        return false;
    }
    await docRef.delete();
    return true;
}