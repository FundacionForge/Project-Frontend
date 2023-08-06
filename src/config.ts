export const config = {
  API_BACKEND: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
  TOKEN_STORAGE: 'tokenForge',
  QUERY_KEY: {
    STUDENT: 'students',
    SHIFT: 'shifts',
    COURSE: 'courses',
    DEGREE: 'degrees',
  },
  ROLE: {
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER'
  }
}
