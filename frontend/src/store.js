// Path: frontend/src/store.js

import create from 'zustand'

const useStore = create(set => ({
    user: null,
    setUser: (user) => {
        // ユーザー情報をローカルストレージに保存
        localStorage.setItem('user', JSON.stringify(user));
        set({ user });
    },
}))

export default useStore
