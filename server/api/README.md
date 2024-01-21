### Routes

### Join

- **Purpose**: Requests to join the game.  If unsuccessful because the game is full, a 403 error is returned.
- **Method**: POST
- **URL**: `/api/join`
- **Request Payload**: `{"name": name}`
- **Response**: `{"player_id", player_id}`.

### Players

- **Purpose**: Returns a list of all players in the game from the perspective of the requester.  Positions are 0-indexed and are intended to be displayed clockwise starting with the south position.
- **Method**: POST
- **URL**: `/api/players`
- **Request Payload**: `{"player_id": player_id}`
- **Response**: Array of player objects, each with `id` and `name`.
