const API_ENDPOINTS = {
  // Auth
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    register: '/auth/register'
  },
  
  // Students
  students: {
    base: '/students',
    byId: (id) => `/students/${id}`,
    search: '/students/search'
  },
  
  // Courses
  courses: {
    base: '/courses',
    byId: (id) => `/courses/${id}`,
    search: '/courses/search'
  },
  
  // Chapters
  chapters: {
    base: '/chapters',
    byId: (id) => `/chapters/${id}`,
    byCourse: (courseId) => `/courses/${courseId}/chapters`
  }
};

export default API_ENDPOINTS;
