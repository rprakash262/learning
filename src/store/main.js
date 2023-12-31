export const mainSlice = (set) => ({
  showSnackbar: false,
  snackbarMsg: "",
  snackbarMsgType: null,
  selectedCourseId: null,
  selectedVideo: null,

  setShowSnackbar: (msg, msgType) => set((state) => {
    return {
      ...state,
      snackbarMsg: msg,
      snackbarMsgType: msgType,
      showSnackbar: true
    }
  }),

  setHideSnackbar: () => set((state) => {
    return {
      ...state,
      showSnackbar: false
    }
  }),

  setSelectedCourseId: (id) => set((state) => {
    return {
      ...state,
      selectedCourseId: id
    }
  }),

  setSelectedVideo: (video) => set((state) => {
    return {
      ...state,
      selectedVideo: video
    }
  })
})
