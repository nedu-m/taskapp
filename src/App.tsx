import { useState } from 'react';
import { Plus, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Define Task type
interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Training at the Gym', completed: true },
    { id: 2, name: 'Play Paddle with friends', completed: false },
    { id: 3, name: 'Burger BBQ with family', completed: false },
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingName, setEditingName] = useState('');

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    const newTask: Task = {
      id: Date.now(),
      name: 'New Task',
      completed: false
    };
    setTasks([...tasks, newTask]);
    selectTask(newTask);
  };

  const selectTask = (task: Task) => {
    setSelectedTask(task);
    setEditingName(task.name);
  };

  const saveTask = () => {
    if (editingName.trim() && selectedTask) {
      setTasks(tasks.map(task =>
        task.id === selectedTask.id ? { ...task, name: editingName } : task
      ));
      setSelectedTask(null);
    }
  };

  const deleteTask = () => {
    if (selectedTask) {
      setTasks(tasks.filter(task => task.id !== selectedTask.id));
      setSelectedTask(null);
    }
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-96 min-w-[24rem] flex flex-col h-full bg-white">
        {/* Profile Header */}
        <div className="bg-[#24428f] h-24 p-6 text-white shrink-0 shadow-2xl relative z-10 border-r border-blue-900">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
              <img src="./assets/react.svg" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Hello, Jhon</h2>
              <p className="text-gray-300 italic">What are your plans for today?</p>
            </div>
          </div>
        </div>

        {/* Pro Banner */}
        <div className="bg-[#def945] p-8 rounded-lg flex justify-between items-center shrink-0 border-r border-gray-200">
          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-600" size={24} />
            <span className="font-semibold text-blue-900">Go Pro Upgrade Now</span>
          </div>
          <div>
            <div className="bg-[#071D55] text-yellow-300 font-bold p-3">
              <span>$1</span>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="flex-1 overflow-y-auto pt-4 px-4 pb-4 border-r">
          <div className="space-y-2">
            {tasks.map(task => (
              <Card
                key={task.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors
      ${selectedTask?.id === task.id ? 'border-2 border-blue-500' : ''}`}
                onClick={() => selectTask(task)}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 cursor-pointer flex items-center justify-center flex-shrink-0
          ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTask(task.id);
                    }}
                  >
                    {task.completed && <span className="text-white text-sm">✓</span>}
                  </div>
                  <span className={`ml-3 flex-1 truncate ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {task.name}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      selectTask(task);
                    }}
                    className="rounded-full ml-2 px-4 flex-shrink-0"
                  >
                    Edit
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Add Task Button */}
        <div className="p-4 flex justify-end shrink-0 border-t border-r h-24">
          <Button
            onClick={addTask}
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
          >
            <Plus className="text-white" size={24} />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full bg-gray-50">
        {/* Edit Task Header */}
        <div className="bg-[#3556AB] h-24 p-6 shrink-0">
          <h1 className="text-2xl font-bold text-white text-center">Edit Task</h1>
        </div>

        {/* Edit Task Content */}
        <div className="flex-1 p-6">
          {selectedTask ? (
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Task Name</label>
                <Input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  placeholder="Enter task name"
                  className="w-full text-lg p-6 rounded-2xl border-gray-200"
                />
              </div>

              <div className="flex gap-4 fixed bottom-0 h-24 left-96 right-0 p-6 bg-white border-t">
                <Button
                  variant="destructive"
                  onClick={deleteTask}
                  className="bg-[#AB3535] hover:bg-red-600 text-white px-8 py-6 rounded-xl shadow-xl text-lg"
                >
                  Delete
                </Button>
                <Button
                  variant="default"
                  onClick={saveTask}
                  className="flex-1 bg-[#3556AB] hover:bg-blue-700 text-white py-6 rounded-xl shadow-xl text-lg"
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a task to edit
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
