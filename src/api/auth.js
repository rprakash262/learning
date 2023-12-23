import { apiClient } from './supabase';

export const authApi = {
  signIn: async function(data) {
    return await apiClient.auth.signInWithPassword(data)
  },

  signUp: async function(data) {
    return await apiClient.auth.signUp(data)
  }, 

  signOut: async function() {
    return await apiClient.auth.signOut()
  },
}
