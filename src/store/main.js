export const mainSlice = (set) => ({
  sampleState: 'Hello world',

  setSampleState: (val) => set((state) => {
    return {
      ...state,
      sampleState: val
    }
  })
})
