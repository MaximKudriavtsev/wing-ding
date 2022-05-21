import { Event } from '../event/types';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerifiedAt: string | null;
  description: string;
  birthDate: string | null;
  photo: string | null;
  createdAt: string;
  updatedAt: string;
  friends: number;
  events: number;
};

export type AuthResponse = { status: 200; data: { accessToken?: string; error?: string } };

export type GetUserResponse = { status: 200; data: { user: User } };

export type GetUserEvents = { status: 200; data: Event[] };

export type GetUserFriends = { status: 200; friends: User[] };

export type Status = { status: 200; error?: string };

export type UserApi = {
  auth: ({ email, password }: { email: string, password: string }) => Promise<AuthResponse>;

  registration: ({ email, password, firstName, lastName }:
    { email: string, password: string, firstName: string, lastName: string }) => Promise<AuthResponse>;

  getAuthorizedUser: () => Promise<GetUserResponse>;

  getUser: (id: string) => Promise<GetUserResponse>;

  getUserEvents: (id: string) => Promise<GetUserEvents>;

  getFriendList: (id: string) => Promise<GetUserFriends>;

  addToFriends: (id: string) => Promise<Status>;

  deleteFromFriends: (id: string) => Promise<Status>;

  changeProfile: ({ firstName, lastName, birthDate, description, photo }:
    { firstName: string, lastName: string, birthDate: string, description: string, photo: string }) => Promise<any>;
};
