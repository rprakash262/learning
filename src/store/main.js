export const mainSlice = (set) => ({
  showSnackbar: false,
  snackbarMsg: "",
  snackbarMsgType: null,

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
  })
})
