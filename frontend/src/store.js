// Path: frontend/src/store.js

import create from 'zustand'

const useStore = create(set => ({
    user: null,
    setUser: (user) => set({ user }),
    flashMessage: '',
    setFlashMessage: (message) => set({ flashMessage: message }),
    currentPage: 1,  // 現在のページを追加
    setCurrentPage: (page) => set({ currentPage: page }),  // 現在のページを設定する関数を追加
    totalPages: 1,  // 総ページ数を追加
    setTotalPages: (pages) => set({ totalPages: pages }),  // 総ページ数を設定する関数を追加
}))

export default useStore
