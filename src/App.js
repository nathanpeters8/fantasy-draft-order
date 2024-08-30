import React, { useState, useEffect } from 'react';
import { fetchGistData } from './updateGist';

const teams = [
  'David',
  'Drew',
  'Jake',
  'Joe/Gen',
  'Jim',
  'Keith',
  'Mike',
  'Nate',
  'Ronnie',
  'Sarah/Deven',
  'Shaun',
  'Tammy',
];

const top3Teams = ['Tammy', 'Keith', 'Jim'];

function App() {
  const [selectedPositions, setSelectedPositions] = useState({ Tammy: 1, Keith: 2, Jim: 3 });
  const [randomizedTeams, setRandomizedTeams] = useState([]);
  const [finalDraftOrder, setFinalDraftOrder] = useState(Array(12).fill(null));
  const [isLoading, setIsLoading] = useState(true);

  // Update the draft order when selected positions change
  useEffect(() => {
    async function loadDraftOrder() {
      const data = await fetchGistData();
      if (data && data.finalDraftOrder) {
        setFinalDraftOrder(data.finalDraftOrder);
      }
      setIsLoading(false);
    }
    loadDraftOrder();
    // updateFinalDraftOrder(selectedPositions, randomizedTeams);
  }, []);

  // Fisher-Yates Shuffle Algorithm
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleRandomize = () => {
    const remainingTeams = teams.filter(
      (team) => !top3Teams.includes(team) && !Object.keys(selectedPositions).includes(team)
    );

    const randomized = shuffleArray(remainingTeams);
    setRandomizedTeams(randomized);
    updateFinalDraftOrder(selectedPositions, randomized);
  };

  // Function to update final draft order
  const updateFinalDraftOrder = (selectedPositions, randomizedTeams) => {
    const order = Array(12).fill(null);

    // Fill in the top 3 teams with their selected positions
    Object.keys(selectedPositions).forEach((team) => {
      const position = selectedPositions[team] - 1; // Adjust for zero-based index
      order[position] = team;
    });

    // Fill in the remaining positions with randomized teams
    randomizedTeams.forEach((team) => {
      const emptyIndex = order.indexOf(null);
      order[emptyIndex] = team;
    });

    setFinalDraftOrder(order);
  };

  return (
    <div className='container'>
      <h1 className='text-center my-4 text-decoration-underline'>Fantasy Football Draft Order 2024</h1>
      <div className='row d-flex align-items-center'>
        <div className='col-12 d-flex justify-content-center'>
          {finalDraftOrder.includes(null) && (
            <button onClick={handleRandomize} className='btn btn-primary btn-lg mb-5 mt-2'>
              Randomize
            </button>
          )}
        </div>
        <div className='col-12 d-flex flex-column align-items-center'>
          <ul className='list-group'>
            {finalDraftOrder.map((team, index) => (
              <li key={index} className='list-group-item list-group-item-action'>
                <span className='fw-bold fst-italic'>{index + 1}.</span> <span className='fs-5 ms-3'>{team || ''}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
