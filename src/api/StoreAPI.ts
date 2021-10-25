import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { TaskData, Task, PartialTaskData } from '../Redux/modules/tasksSlice';
import { auth, db } from './AuthAPI';

export const StoreAPI = {
  setTask: async (TaskData: TaskData) => {
    const userid = auth.currentUser?.uid;

    if (userid) {
      try {
        await addDoc(collection(db, `users/${userid}/tasks`), TaskData);
      } catch (err) {
        console.log(err);
      }
    }
  },
  getTask: async () => {
    const userid = auth.currentUser?.uid;

    if (userid) {
      try {
        const querySnapshot = await getDocs(
          collection(db, `users/${userid}/tasks`)
        );

        let tasks = querySnapshot.docs.map((i) => {
          const id = i.id;
          return { id, data: { ...i.data() } } as Task;
        });
        return tasks;
      } catch (err) {
        console.log(err);
        throw new Error('Не удалось получить данные с сервера');
      }
    }
  },
  updateTask: async (taskid: string, data: PartialTaskData) => {
    const userid = auth.currentUser?.uid;

    if (userid) {
      try {
        const task = doc(db, `users/${userid}/tasks`, taskid);
        await setDoc(task, data, { merge: true });
      } catch (err) {
        console.log(err);
      }
    }
  },
  deleteTask: async (taskid: string) => {
    const userid = auth.currentUser?.uid;

    if (userid) {
      try {
        const task = doc(db, `users/${userid}/tasks`, taskid);

        await deleteDoc(task);
      } catch (err) {
        console.log(err);
      }
    }
  },
};
