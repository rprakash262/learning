import { create } from "zustand";
import { devtools } from 'zustand/middleware'
import { mainSlice } from './main'

export const useStore = create()(devtools((...a) => ({
  ...mainSlice(...a),
})))