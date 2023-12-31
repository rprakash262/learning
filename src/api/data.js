import { apiClient } from './supabase';

export const dataApi = {
  fetchAllCourses: async function() {
    let { data, error } = await apiClient.from('courses').select('*');

    return { data, error }
  },

  fetchAllTestSeries: async function() {
    let { data, error } = await apiClient.from('test_series').select('*');

    return { data, error }
  },

  fetchCourse: async function(id) {
    const { data, error } = await apiClient.from("courses").select("*").eq("id", id);
    
    return { data, error }
  },

  fetchCourseVideos: async function(id) {
    let { data, error } = await apiClient.from('videos').select('*').eq("course_id", id);

    return { data, error }
  },
}
