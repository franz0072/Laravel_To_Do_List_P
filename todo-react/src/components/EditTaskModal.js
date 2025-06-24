import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EditTaskModal({ show, onHide, task, onSave }) {
  const [taskText, setTaskText] = useState('');
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (task) {
      setTaskText(task.task);
      setStatus(task.completed);
    }
  }, [task]);

  const handleSave = () => {
    onSave({ ...task, task: taskText, completed: status });
    onHide(); // close modal after save
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value === 'true')}
            >
              <option value="false">Pending</option>
              <option value="true">Completed</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTaskModal;
