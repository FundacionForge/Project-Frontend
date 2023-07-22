export const config = {
  API_BACKEND: import.meta.env.VITE_BACKEND_URL,
  TOKEN_STORAGE: 'tokenForge',
  ROUTE: {
    LOGIN: '/',
    ADMIN: {
      TABLE_TEACHER: 'table-teacher',
      TABLE_STUDENT: 'table-student',
      TABLE_COURSE: 'table-course'
    }
  }
}
