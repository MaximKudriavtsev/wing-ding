## Архитектура запросов

# user group
- post('/auth');
- post('/registration');
- post('/profile/get')->middleware('auth');
- post('/profile/change')->middleware('auth');
- post('/friends/get')->middleware('auth');
- post('/friends/add')->middleware('auth');

# event group
- post('/create')->middleware('auth');
- post('/join')->middleware('auth');
- post('/leave')->middleware('auth');
- post('/get')->middleware('auth');
- post('/list/get')->middleware('auth');