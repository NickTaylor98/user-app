export const Route = {
  Users: {
    BASE: 'users',
    FIND_ONE: '/:id',
    FIND_ALL: '',
    CREATE: '',
    UPDATE: '/:id',
    REMOVE: '/:id',
  },
  Auth: {
    BASE: 'auth',
    SIGN_IN: '/signin',
  },
} as const;
