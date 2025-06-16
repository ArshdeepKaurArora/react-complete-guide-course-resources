import { createContext, useEffect, useState, useOptimistic } from 'react';

export const OpinionsContext = createContext({
  opinions: null,
  addOpinion: (opinion) => {},
  upvoteOpinion: (id) => {},
  downvoteOpinion: (id) => {},
});

export function OpinionsContextProvider({ children }) {
  const [opinions, setOpinions] = useState();
  const [optimisticOpinions, addOptimisticOpinion] = useOptimistic(
    opinions,
    (state, { type, id }) => {
      if (type === 'upvote') {
        return state.map((opinion) => {
          if (opinion.id === id) {
            return { ...opinion, votes: opinion.votes + 1 };
          }
          return opinion;
        });
      }
      if (type === 'downvote') {
        return state.map((opinion) => {
          if (opinion.id === id) {
            return { ...opinion, votes: opinion.votes - 1 };
          }
          return opinion;
        });
      }
      return state;
    }
  );

  useEffect(() => {
    async function loadOpinions() {
      const response = await fetch('http://localhost:3000/opinions');
      const opinions = await response.json();
      setOpinions(opinions);
    }

    loadOpinions();
  }, []);

  async function addOpinion(enteredOpinionData) {
    const response = await fetch('http://localhost:3000/opinions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enteredOpinionData),
    });

    if (!response.ok) {
      return;
    }

    const savedOpinion = await response.json();
    setOpinions((prevOpinions) => [savedOpinion, ...prevOpinions]);
  }

  async function upvoteOpinion(id) {
    // Optimistically update the UI
    addOptimisticOpinion({ type: 'upvote', id });

    const response = await fetch('http://localhost:3000/opinions/' + id + '/upvote', {
      method: 'POST',
    });

    if (!response.ok) {
      return;
    }
    
    // Update with the actual server response
    const updatedOpinion = await response.json();
    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return updatedOpinion;
        }
        return opinion;
      });
    });
  }

  async function downvoteOpinion(id) {
    // Optimistically update the UI
    addOptimisticOpinion({ type: 'downvote', id });

    const response = await fetch('http://localhost:3000/opinions/' + id + '/downvote', {
      method: 'POST',
    });

    if (!response.ok) {
      return;
    }

    // Update with the actual server response
    const updatedOpinion = await response.json();
    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return updatedOpinion;
        }
        return opinion;
      });
    });
  }

  const contextValue = {
    opinions: optimisticOpinions,
    addOpinion,
    upvoteOpinion,
    downvoteOpinion,
  };

  return <OpinionsContext.Provider value={contextValue}>{children}</OpinionsContext.Provider>;
}
