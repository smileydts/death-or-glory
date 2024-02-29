function initGame() {
   function createFetchOptions(data, method = 'POST') {
      return {
         method: method,
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
      };
   }

   async function joinGame(name) {
      try {
         const data1 = {
            name: name
         };
         const options1 = createFetchOptions(data1);

         const response1 = await fetch('http://localhost:5000/api/join', options1);
         if (!response1.ok) {
            throw new Error('Network response was not ok');
         }
         const output1 = await response1.json();
         console.log('Success:', output1);
         document.cookie = `player_id=${output1.player_id}; path=/`;

         const data2 = {
            player_id: output1.player_id
         };
         const options2 = createFetchOptions(data2);

         const response2 = await fetch('http://localhost:5000/api/get_players', options2);
         if (!response2.ok) {
            throw new Error('Network response was not ok');
         }
         const output2 = await response2.json();
         console.log('Success:', output2);
      } catch (error) {
         console.log('Error:', error);
      }
   }

   document.getElementById('joinGameButton').addEventListener('click', function() {
      const name = document.getElementById('name').value;
      joinGame(name);
   });
}

document.addEventListener('DOMContentLoaded', initGame);