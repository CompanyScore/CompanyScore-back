// swagger.responses.ts
export const USER_RESPONSE = {
  schema: {
    example: {
      id: 'uuid',
      name: 'John Doe',
      role: 'user',
      refreshToken: 'some-refresh-token',
      linkedinId: 'linkedin-12345',
      avatar: 'file/users/avatars/avatar.png',
      position: 'Software Engineer',
      description: 'A brief description about the user',
      createDate: '2023-01-01T00:00:00.000Z',
      deleteDate: "",
      isDeleted: false,
    },
  },
};

export const USERS_RESPONSE = {
  schema: {
    example: [
      {
        id: 'uuid',
        name: 'John Doe',
        role: 'user',
        refreshToken: 'some-refresh-token',
        linkedinId: 'linkedin-12345',
        avatar: 'file/users/avatars/avatar.png',
        position: 'Software Engineer',
        description: 'A brief description about the user',
        createDate: '2023-01-01T00:00:00.000Z',
        deleteDate: '',
        isDeleted: false,
      },
    ],
  },
};
