// Path: frontend/src/store.js

import create from 'zustand'

const useStore = create(set => ({
    user: null,
    setUser: (user) => set({ user }),
    flashMessage: '', // フラッシュメッセージのstateを追加
    setFlashMessage: (message) => set({ flashMessage: message }), // フラッシュメッセージを設定する関数を追加
}))

export default useStore
