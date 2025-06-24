import React, { useEffect, useState } from 'react';
import api from '../api';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import CreateTaskModal from './CreateTaskModal';
import EditTaskModal from './EditTaskModal';
import '../css/TodoList.css'; // 👈 Create this CSS file

function TodoList() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleStatus = async (task, status) => {
    try {
      await api.put(`/tasks/${task.id}`, {
        ...task,
        completed: status,
      });
      fetchTasks();
    } catch (error) {
      console.error("Failed to toggle task status", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const handleEditSave = async (updatedTask) => {
    try {
      await api.put(`/tasks/${updatedTask.id}`, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  return (
    <div className="todo-wrapper container mt-5">
      <div className="card shadow p-4 rounded-4">
        <h3 className="mb-4 text-center text-primary fw-bold">📝 My To-Do List</h3>

        <div className="d-flex justify-content-end mb-3">
          <Button variant="success" onClick={() => setShowModal(true)}>
            + Add Task
          </Button>
        </div>

        <CreateTaskModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          onTaskCreated={fetchTasks}
        />

        <EditTaskModal
          show={editModalShow}
          onHide={() => setEditModalShow(false)}
          task={taskToEdit}
          onSave={handleEditSave}
        />

        <div className="table-responsive">
          <Table bordered hover className="table-custom">
            <thead className="table-light">
              <tr>
                <th>No</th>
                <th>Task</th>
                <th>Completed</th>
                <th>Pending</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task, idx) => (
                  <tr key={task.id}>
                    <td>{idx + 1}</td>
                    <td className="fw-semibold">{task.task}</td>
                    <td className="text-center">
                      <Form.Check
                        type="radio"
                        checked={task.completed}
                        onChange={() => toggleStatus(task, true)}
                      />
                    </td>
                    <td className="text-center">
                      <Form.Check
                        type="radio"
                        checked={!task.completed}
                        onChange={() => toggleStatus(task, false)}
                      />
                    </td>
                    <td><span className="badge bg-info">{new Date(task.created_at).toLocaleString()}</span></td>
                    <td><span className="badge bg-secondary">{new Date(task.updated_at).toLocaleString()}</span></td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => {
                          setTaskToEdit(task);
                          setEditModalShow(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted">No tasks found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
