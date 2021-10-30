import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';
import {
  TaskData,
  Task,
  PartialTaskData,
  DoneTask,
} from '../Redux/modules/tasksSlice';
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
  setDoneTask: async (date: string, doneTasks: DoneTask, merge: boolean) => {
    const userid = auth.currentUser?.uid;

    if (userid) {
      try {
        await setDoc(
          doc(db, `users/${userid}/doneTasksLists`, date),
          doneTasks,
          {
            merge: merge,
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  },
  getDoneTask: async (date: string) => {
    const userid = auth.currentUser?.uid;

    if (userid) {
      try {
        const docRef = doc(db, `users/${userid}/doneTasksLists`, date);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          //return doneTaskList
          return docSnap.data() as DoneTask;
        } else {
          // doc.data() will be undefined in this case
          //return empty object as doneTaskList
          return {} as DoneTask;
        }
      } catch (err) {
        console.log(err);
        throw new Error('Не удалось получить данные с сервера');
      }
    }
  },
  deleteDoneTask: async (doneTaskDate: string) => {
    const userid = auth.currentUser?.uid;

    if (userid) {
      try {
        const task = doc(db, `users/${userid}/doneTasksLists`, doneTaskDate);

        await deleteDoc(task);
      } catch (err) {
        console.log(err);
      }
    }
  },
  setBatchDoneTask: async (
    taskApiData: TaskApi,
    doneTaskApiData: DoneTaskApiData
  ) => {
    const { taskId, taskData } = taskApiData;
    const { doneTaskDate, doneTasks, doneTasksMerge } = doneTaskApiData;
    const userid = auth.currentUser?.uid;
    const batch = writeBatch(db);
    if (userid) {
      try {
        const task = doc(db, `users/${userid}/tasks`, taskId);
        batch.set(task, taskData, { merge: true });

        const doneTask = doc(
          db,
          `users/${userid}/doneTasksLists`,
          doneTaskDate
        );
        batch.set(doneTask, doneTasks, {
          merge: doneTasksMerge,
        });
        await batch.commit();
      } catch (err) {
        console.log(err);
      }
    }
  },
};

interface TaskApi {
  taskId: string;
  taskData: PartialTaskData;
}
interface DoneTaskApiData {
  doneTaskDate: string;
  doneTasks: DoneTask;
  doneTasksMerge: boolean;
}
