# Архитектура баз данных

## User
- id: String (UUID)
- first_name: String (50)
- last_name: String (50)
- email: String(100)
- password: String(100)
- password_solt: String(30)
- description: String (256)
- avatar_image: String (URL)
- images: Array<String>
- birth_date: Timestamp
- friends_ids: Array<UUID>
- author_events_ids: Array<UUID>
- participated_events_ids: Array<UUID>
- verified: Boolean
- created_at: Timestamp


## Event
- id: String (UUID)
- title: String (100)
- description: String (256)
- author_id: (UUID)
- start_time: Timestamp
- end_time: Timestamp
- location_lat: Double
- location_lng: Double
- location_name: String (256)
- participants_ids: Array<UUID>
- max_participants_count: Integer
- avatar_image: String (URL)
- images: Array<String>
