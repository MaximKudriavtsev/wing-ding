import { delay } from '../mockUtils';
import { EventApi, Event } from './types';
import { member } from '../user/apiMock';

export const event: Event = {
  id: 'event_id',
  title: 'Вечериночка у Ашота',
  img: 'https://artpostergallery.ru/userdata/image/thumbs/72/04/720434017f2b46c344c89a309e0468ac_2.jpg',
  place: 'г. Тула, ул. Ленина, дом 21',
  text: 'Как обычно, встречаемся чтобы побухать и тусануть. Посмотрим ютюбчик и немного выжрем.',
  host: {
    id: '1',
    photo: 'https://www.gannett-cdn.com/presto/2020/01/03/PCIN/ad5fc4b3-b5a4-4a3c-b6c3-cadb19e44810-Screen_Shot_2020-01-03_at_9.21.19_AM.jpg?crop=509,678,x16,y0&quality=50&width=640',
    firstName: 'Альберт',
    lastName: 'Попов',
  },
  date: "2022-02-20T00:00:00.000000Z",
  createdAt: "2022-03-09T19:03:25.000000Z",
  updatedAt: "2022-03-09T19:03:25.000000Z",
  membersCount: 1,
  membersPhoto: [
    'https://www.gannett-cdn.com/presto/2020/01/03/PCIN/ad5fc4b3-b5a4-4a3c-b6c3-cadb19e44810-Screen_Shot_2020-01-03_at_9.21.19_AM.jpg?crop=509,678,x16,y0&quality=50&width=640',
  ],
}

const eventMockApi: EventApi = {
  createEvent: (request) => {
    console.log('POST /api/event/create', request);
    return delay({ status: 'success', id: '1' })
  },

  getEvent: id => {
    console.log(`GET /api/event/get/${id}`, id);
    return delay({ data: event })
  },

  getMembers: id => {
    console.log(`GET /api/event/get/${id}/users`, id);
    return delay({ status: 'success', members: [member] })
  },

  joinEvent: id => {
    console.log(`POST /api/event/join/${id}`, id);
    return delay({ status: 'success' });
  },

  leaveEvent: id => {
    console.log(`POST /api/event/leave/${id}`, id);
    return delay({ status: 'success' });
  },
};

export default eventMockApi;
