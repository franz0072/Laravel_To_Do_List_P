import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../api';

function CreateTaskModal({ show, handleClose, onTaskCreated }) {
  const [task, setTask] = useState('');

  const handleCreate = async () => {
    try {
      const res = await api.post('/tasks', {
        task: task,
        status: 'pending', // ✅ required for Laravel validation
      });

      setTask('');
      handleClose();
      if (onTaskCreated) {
        onTaskCreated(); // refresh the list
      }
    } catch (err) {
      console.error('Failed to create task:', err.response?.data || err.message);
      alert('Failed to create task. See console for details.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Task</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleCreate}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTaskModal;
