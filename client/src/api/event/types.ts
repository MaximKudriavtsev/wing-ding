

type CreateEventArgs = {
  title: string;
  date: string;
  place: string;
  description: string;
  img: string;
};
type CreateEventResponse = { status: string, id: string };
type CreateEvent = (obj: CreateEventArgs) => Promise<CreateEventResponse>;

export type Member = {
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

export type Event = {
  id: string;
  img: string;
  title: string;
  place: string;
  text: string;
  host: {
    id: Member['id'];
    photo: Member['photo'];
    firstName: Member['firstName'];
    lastName: Member['lastName'];
  };
  date: string;
  createdAt: string;
  updatedAt: string;
  membersCount: number;
  membersPhoto: Member['photo'][];
};

export type GetEventResponse = { data: Event };
export type GetMembersResponse = { status: string; members: Member[] };
export type StatusResponse = { status: string };

export type EventApi = {
  createEvent: CreateEvent;

  getEvent: (id: string) => Promise<GetEventResponse>;

  getMembers: (id: string) => Promise<GetMembersResponse>;

  joinEvent: (id: string) => Promise<StatusResponse>;

  leaveEvent: (id: string) => Promise<StatusResponse>;
};
