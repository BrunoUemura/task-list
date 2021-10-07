import api from './baseURL';
import { ITasksUpdate } from '../config/interfaces';
import axios from 'axios';

export class Tasks {
  static async getAllTasks() {
    try {
      const { data } = await axios.get('http://localhost:4000/api/v1/tasks');
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async createTask(title: string, userId: string, token: string) {
    try {
      await axios.post(
        'http://localhost:4000/api/v1/tasks',
        {
          title,
          userId,
        },
        {
          headers: {
            authorization: token,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async updateTask({ id, title, done }: ITasksUpdate, token: string) {
    try {
      await axios.put(
        `http://localhost:4000/api/v1/tasks/${id}`,
        {
          title,
          done,
        },
        {
          headers: {
            authorization: token,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteTask(id: string, token: string) {
    try {
      await axios.delete(`http://localhost:4000/api/v1/tasks/${id}`, {
        headers: {
          authorization: token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
