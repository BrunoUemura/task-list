import React, { useEffect, useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { ITasksType } from '../../config/interfaces';
import { Authentication } from '../../services/authentication';
import { Tasks } from '../../services/tasks';

import { MainContainer, MainHeader, MainBody, InputTask, TaskList } from './styles';

const Home = () => {
  const [tasks, setTasks] = useState<Array<ITasksType>>([]);
  const [task, setTask] = useState('');
  const [newTask, setNewTask] = useState(false);

  useEffect(() => {
    (async () => {
      setNewTask(false);
      const data = await Tasks.getAllTasks();
      setTasks(data);
    })();
  }, [newTask]);

  const handleCreateTask = async (): Promise<void> => {
    if (task === '') {
      return;
    }

    const userId: string = Authentication.checkUserSession();
    const token = localStorage.getItem('token');

    await Tasks.createTask(task, userId, token);
    setNewTask(true);
    setTask('');
  };

  const handleUpdateTask = async (id: string, title: string, done?: boolean): Promise<void> => {
    const token = localStorage.getItem('token');
    await Tasks.deleteTask(id, token);
    setNewTask(true);
  };

  const handleCompleteTask = async (id: string) => {
    const token = localStorage.getItem('token');
    const chkBox: any = document.querySelector('.checkbox');
    const done = chkBox.checked;

    await Tasks.updateTask({ id, done }, token);
    setNewTask(true);
  };

  const handleDeleteTask = async (id: string): Promise<void> => {
    const token = localStorage.getItem('token');
    await Tasks.deleteTask(id, token);
    setNewTask(true);
  };

  return (
    <MainContainer>
      <MainHeader>
        <h1>Task List</h1>
      </MainHeader>
      <MainBody>
        <InputTask>
          <input type="text" placeholder="Type you task here" onChange={(e) => setTask(e.target.value)} />
          <button type="submit" onClick={handleCreateTask}>
            +
          </button>
        </InputTask>
        {tasks.length !== 0 ? (
          tasks.map((task) => (
            <TaskList key={task.id}>
              <div className="complete-task">
                <input
                  className="checkbox"
                  type="checkbox"
                  onClick={(e) => {
                    handleCompleteTask(task.id);
                  }}
                />
              </div>
              <div className="task-text">
                <p>{task.title}</p>
              </div>
              <div className="edit-remove">
                <MdEdit color="green" />
                <MdDelete
                  color="red"
                  onClick={() => {
                    handleDeleteTask(task.id);
                  }}
                />
              </div>
            </TaskList>
          ))
        ) : (
          <TaskList>
            <p>No task created yet</p>
          </TaskList>
        )}
      </MainBody>
    </MainContainer>
  );
};

export default Home;
