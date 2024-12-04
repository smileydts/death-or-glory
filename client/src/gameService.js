/**
 * Handles button clicks for game actions.
 * @param {string} action - The action to be performed ('cash', etc.)
 * @param {number} playerId - Index of the player
 * @param {number} cardId - ID of the card being played
 * @param {Function} updateGameState - Function to update global state with the new game state
 */
export const handleGameAction = async (action, playerId, cardId, updateGameState) => {
  if (action === 'cash') {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cash_card`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ player: playerId, card: cardId })
      });

      if (!response.ok) {
        throw new Error('Failed to execute game action');
      }

      const data = await response.json();
      updateGameState(data);
    } catch (error) {
      console.error('Error handling game action:', error);
    }
  }
};
