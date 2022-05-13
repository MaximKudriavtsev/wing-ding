import { User } from '../user/types';

type CreateEventArgs = {
  title: string;
  date: string;
  place: string;
  description: string;
  img: string;
};
type CreateEventResponse = { status: string, id: string };
type CreateEvent = (obj: CreateEventArgs) => Promise<CreateEventResponse>;

export type Event = {
  id: string;
  img: string;
  title: string;
  place: string;
  text: string;
  host: {
    id: User['id'];
    photo: User['photo'];
    firstName: User['firstName'];
    lastName: User['lastName'];
  };
  date: string;
  createdAt: string;
  updatedAt: string;
  membersCount: number;
  membersPhoto: User['photo'][];
};

export type GetEventResponse = { data: Event };
export type GetMembersResponse = { status: string; members: User[] };
export type StatusResponse = { status: string };

export type EventApi = {
  createEvent: CreateEvent;

  getEvent: (id: string) => Promise<GetEventResponse>;

  getMembers: (id: string) => Promise<GetMembersResponse>;

  joinEvent: (id: string) => Promise<StatusResponse>;

  leaveEvent: (id: string) => Promise<StatusResponse>;
};
