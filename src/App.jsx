import Dice from './assets/icon-dice.svg';
import { useState, useEffect } from 'react';

const App = () => {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAdvice, setShowAdvice] = useState(true);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.adviceslip.com/advice');

        if (!response.ok) {
          throw new Error('Could not fetch data');
        }

        const data = await response.json();
        const adviceData = data.slip;
        setAdvice(adviceData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (showAdvice) {
      fetchAdvice();
    }
  }, [showAdvice]);

  const handleShowAdvice = () => {
    setShowAdvice(!showAdvice);
  };

  return (
    <div className="container">
      <div className="advice-container">
        <p className="advice-title">
          advice #<span className="advice-id">{advice.id}</span>
        </p>

        <div className="advice-content">
          <h3 className="advice-text">"{advice.advice}"</h3>

          <div className="pattern-divider"></div>

          <button onClick={handleShowAdvice} className="btn" disabled={loading}>
            {loading ? (
              <img className="rotate" src={Dice} alt="" />
            ) : (
              <img src={Dice} alt="" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
