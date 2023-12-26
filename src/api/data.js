import { apiClient } from './supabase';

export const dataApi = {
  fetchAllCourses: async function() {
    let { data, error } = await apiClient.from('courses').select('*');

    return { data, error }
  },
}
