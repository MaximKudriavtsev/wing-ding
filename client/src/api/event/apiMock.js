import { delay } from '../mockUtils';

const event = {
  id: 'event_id',
  title: 'Вечериночка у Ашота',
  description:
    'Как обычно, встречаемся чтобы побухать и тусануть. Посмотрим ютюбчик и немного выжрем.',
  authorId: 'some_user_id',
  startTime: 1634482800000,
  endTime: 1634493600000,
  locationLat: 54.191461,
  locationLng: 37.608221,
  locationName: 'г. Тула, ул. Ленина, дом 21',
  participantsIds: [],
  maxParticipantsCount: 10,
  avatarImage:
    'https://artpostergallery.ru/userdata/image/thumbs/72/04/720434017f2b46c344c89a309e0468ac_2.jpg',
  images: [
    'https://aff.bstatic.com/images/hotel/840x460/317/317271694.jpg',
    'https://media-cdn.tripadvisor.com/media/photo-s/11/af/7c/d2/photo0jpg.jpg',
  ],
  tags: ['sport', 'bars'],
};

const eventMockApi = {
  create({
    title,
    description,
    startTime,
    endTime,
    locationName,
    maxParticipantsCount,
    avatarImage,
    images,
    tags,
  }) {
    return delay({
      id: 'event_id',
      title,
      description,
      authorId: 'some_user_id',
      startTime,
      endTime,
      locationLat: 54.191461,
      locationLng: 37.608221,
      locationName,
      participantsIds: [],
      maxParticipantsCount,
      avatarImage,
      images,
      tags,
    });
  },

  join() {
    return delay(event);
  },

  leave() {
    return delay(event);
  },

  get(eventId) {
    return delay(event);
  },

  list: {
    get() {
      return delay({
        events: [event],
      });
    },
  },
};

export default eventMockApi;
