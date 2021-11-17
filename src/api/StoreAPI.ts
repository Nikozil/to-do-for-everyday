import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { HistoryDay } from '../Redux/modules/historySlice';
import {
  LivedDay,
  LivedTask,
  PartialTaskData,
  Task,
  TaskData,
} from '../Redux/modules/tasksSlice';

export const StoreAPI = {
  setTask: async (TaskData: TaskData) => {
    const userid = auth.currentUser?.uid;

    if (userid) {
      try {
        const newTask = doc(collection(db, `users/${userid}/tasks`));
        await setDoc(newTask, TaskData);
        return { id: newTask.id, data: TaskData } as Task;
      } catch (err) {
        console.log(err);
        throw new Error('Не удалось получить данные с сервера');
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
  updateLivedDay: async (date: string, livedDay: Partial<LivedDay>) => {
    const userid = auth.currentUser?.uid;

    if (userid) {
      try {
        await setDoc(doc(db, `users/${userid}/days`, date), livedDay, {
          merge: true,
        });
      } catch (err) {
        console.log(err);
      }
    }
  },
  // updateLivedDay: async (date: string, livedDay: LivedDay, merge: boolean) => {
  //   const userid = auth.currentUser?.uid;

  //   if (userid) {
  //     try {
  //       await setDoc(doc(db, `users/${userid}/day`, date), livedDay, {
  //         merge: merge,
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // },
  getLivedDay: async (date: string) => {
    const userid = auth.currentUser?.uid;

    if (userid) {
      try {
        const docRef = doc(db, `users/${userid}/days`, date);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          //return doneTaskList

          return docSnap.data() as LivedDay;
        } else {
          // doc.data() will be undefined in this case
          //return empty object as doneTaskList
          return {} as LivedDay;
        }
      } catch (err) {
        console.log(err);
        throw new Error('Не удалось получить данные с сервера');
      }
    }
  },
  deleteLivedDay: async (livedDayDate: string) => {
    const userid = auth.currentUser?.uid;

    if (userid) {
      try {
        const task = doc(db, `users/${userid}/days`, livedDayDate);

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
        let updatedLivedTask = doneTaskRemove
          ? arrayRemove(doneTask)
          : arrayUnion(doneTask);
        let livedDay = { doneTasksList: updatedLivedTask };
        const livedDayDoc = doc(db, `users/${userid}/days`, doneTaskDate);
        //if we add a task, we must use 'set', because doc can be undefined in db
        doneTaskRemove
          ? batch.update(livedDayDoc, livedDay)
          : batch.set(livedDayDoc, livedDay, { merge: true });

        await batch.commit();
      } catch (err) {
        console.log(err);
      }
    }
  },
  getDays: async (start: number, end: number) => {
    const userid = auth.currentUser?.uid;

    if (userid) {
      try {
        const q = query(
          collection(db, `users/${userid}/days`),
          where('timestamp', '>=', start),
          where('timestamp', '<=', end)
        );

        // where('timestamp', '>=', new Date('11.06.2021').getTime()),
        //   where('timestamp', '<=', new Date('11.07.2021').getTime())
        const querySnapshot = await getDocs(q);
        let days = querySnapshot.docs.map((i) => {
          return { ...i.data() } as HistoryDay;
        });
        return days;
      } catch (err) {
        console.log(err);
        throw new Error('Не удалось получить данные с сервера');
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
  doneTask: Partial<LivedTask>;
  doneTaskRemove: boolean;
}
