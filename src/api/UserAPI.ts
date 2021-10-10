import { updateProfile } from 'firebase/auth';
import { auth } from './AuthAPI';

export const UserAPI = {
  updateProfile: async (displayName: string) => {
    const user = auth.currentUser;
    if (!user) throw new Error('Пользователь не существует');
    try {
      await updateProfile(user, {
        displayName: displayName,
      });
      return 'Имя пользователя изменено';
    } catch (error) {
      throw new Error('Обновить профиль не удалось');
    }
  },
};
