import { User } from '../user/types';

export type CreateEventArgs = {
  title: string;
  date: string;
  place: string;
  text: string;
  img: string;
};
type CreateEventResponse = { status: number; id: string };
type CreateEvent = (obj: CreateEventArgs) => Promise<CreateEventResponse>;

type UpdateEventResponse = { status: number };
type UpdateEvent = (obj: CreateEventArgs, id: number) => Promise<UpdateEventResponse>;

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
  membersPhotos: User['photo'][];
  isMember: boolean;
  isHost: boolean;
};

export type GetEventResponse = { data: Event };
export type DeleteEventResponse = { status: number };
export type GetMembersResponse = { status: string; members: User[] };
export type StatusResponse = { status: string };
export type SearchEvent = { data: { status: string; events: Event[] } };

export type EventApi = {
  createEvent: CreateEvent;

  updateEvent: UpdateEvent;

  deleteEvent: (id: string) => Promise<DeleteEventResponse>;

  getEvent: (id: string) => Promise<GetEventResponse>;

  getMembers: (id: string) => Promise<GetMembersResponse>;

  joinEvent: (id: string) => Promise<StatusResponse>;

  leaveEvent: (id: string) => Promise<StatusResponse>;

  searchEvent: (name: string) => Promise<SearchEvent>;
};
