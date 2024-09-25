import React, { useState } from 'react';
import './App.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editedTodo, setEditedTodo] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [filter, setFilter] = useState('All'); // Filter state

    // Handle adding a new todo
    const handleInputChange = (e) => {
        setNewTodo(e.target.value);
    };

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, { text: newTodo, completed: false }]);
            setNewTodo('');
        }
    };

    // Handle deleting a todo
    const handleDeleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    // Handle toggling the complete status of a todo
    const toggleCompleteTodo = (index) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    // Handle editing a todo
    const handleEditTodo = (index) => {
        setEditingIndex(index);
        setEditedTodo(todos[index].text);
    };

    // Handle saving the edited todo
    const handleSaveEdit = (index) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? { ...todo, text: editedTodo } : todo
        );
        setTodos(updatedTodos);
        setEditingIndex(null);
        setEditedTodo('');
    };

    const handleEditChange = (e) => {
        setEditedTodo(e.target.value);
    };

    // Handle filtering tasks
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    // Filtered tasks based on filter state
    const filteredTodos = todos.filter((todo) => {
        if (filter === 'Completed') return todo.completed;
        if (filter === 'Incomplete') return !todo.completed;
        return true;
    });

    return (
        <div className="todo-container">
            <h1 className='heading'>Todo List</h1>
            
            <div className="todo-form">
                <input
                    type="text"
                    value={newTodo}
                    onChange={handleInputChange}
                    placeholder="Add a new task"
                />
                <button onClick={handleAddTodo}>Add Task</button>
            </div>

            {/* Filter Dropdown */}
            <div className="todo-filter">
                <label>Filter:  </label>
                <select value={filter} onChange={handleFilterChange}>
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Incomplete">Incomplete</option>
                </select>
            </div>

            <ul>
                {filteredTodos.map((todo, index) => (
                    <li key={index} className={todo.completed ? 'completed' : ''}>
                        <div className="todo-item">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleCompleteTodo(index)}
                            />
                            {/* If editing, show input field */}
                            {editingIndex === index ? (
                                <input
                                    type="text"
                                    value={editedTodo}
                                    onChange={handleEditChange}
                                />
                            ) : (
                                <span>{todo.text}</span>
                            )}
                        </div>
                        <div className="todo-actions">
                            {editingIndex === index ? (
                                <button onClick={() => handleSaveEdit(index)}>💾</button>
                            ) : (
                                <>
                                    <button className="edit-btn" onClick={() => handleEditTodo(index)}>
                                        ✏️
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDeleteTodo(index)}>
                                        🗑️
                                    </button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
