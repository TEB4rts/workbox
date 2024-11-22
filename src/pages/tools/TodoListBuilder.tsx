import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ListTodo, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoListBuilder = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (!newTodo.trim()) {
      toast.error("Please enter a task");
      return;
    }
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
    toast.success("Task added successfully");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.success("Task deleted successfully");
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListTodo className="h-6 w-6" />
            Todo List Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <Button onClick={addTodo}>
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                  {todo.text}
                </span>
                <Button variant="ghost" size="sm" onClick={() => deleteTodo(todo.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoListBuilder;