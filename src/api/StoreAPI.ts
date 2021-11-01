import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  writeBatch,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import {
  DoneDay,
  DoneTask,
  PartialTaskData,
  Task,
  TaskData,
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
        await updateDoc(task, data);
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
  setDoneDay: async (date: string, doneDay: Partial<DoneDay>) => {
    const userid = auth.currentUser?.uid;

    if (userid) {
      try {
        await updateDoc(doc(db, `users/${userid}/day`, date), doneDay);
      } catch (err) {
        console.log(err);
      }
    }
  },
  updateDoneDay: async (date: string, doneDay: DoneDay, merge: boolean) => {
    const userid = auth.currentUser?.uid;

    if (userid) {
      try {
        await setDoc(doc(db, `users/${userid}/day`, date), doneDay, {
          merge: merge,
        });
      } catch (err) {
        console.log(err);
      }
    }
  },
  getDoneDay: async (date: string) => {
    const userid = auth.currentUser?.uid;

    if (userid) {
      try {
        const docRef = doc(db, `users/${userid}/days`, date);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          //return doneTaskList
          return docSnap.data() as DoneDay;
        } else {
          // doc.data() will be undefined in this case
          //return empty object as doneTaskList
          return {} as DoneDay;
        }
      } catch (err) {
        console.log(err);
        throw new Error('Не удалось получить данные с сервера');
      }
    }
  },
  deleteDoneDay: async (doneDayDate: string) => {
    const userid = auth.currentUser?.uid;

    if (userid) {
      try {
        const task = doc(db, `users/${userid}/days`, doneDayDate);

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
    const batch = writeBatch(db);
    const userid = auth.currentUser?.uid;
    const { taskId, taskData } = taskApiData;
    const { doneTaskDate, doneTask, doneTaskRemove } = doneTaskApiData;
    if (userid) {
      try {
        //updateTask
        const task = doc(db, `users/${userid}/tasks`, taskId);
        batch.update(task, taskData);
        //updateDoneTask
        let updatedDoneTask = doneTaskRemove
          ? arrayRemove(doneTask)
          : arrayUnion(doneTask);
        let doneDay = { doneTasksList: updatedDoneTask };
        const doneDayDoc = doc(db, `users/${userid}/days`, doneTaskDate);
        batch.update(doneDayDoc, doneDay);

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
  doneTask: Partial<DoneTask>;
  doneTaskRemove: boolean;
}
