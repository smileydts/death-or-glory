### routes

### Join Endpoint

- **Purpose**: Requests to join the game.
- **Method**: POST
- **URL**: `/api/join`
- **Request Payload**: `{"name": name}`
- **Response**: `{"player_id", player_id}`.

### Players Endpoint

- **Purpose**: Returns a list of all players in the game.
- **Method**: POST
- **URL**: `/api/players`
- **Request Payload**: `{"player_id": player_id}`
- **Response**: Array of player objects, each with `id` and `name`.
