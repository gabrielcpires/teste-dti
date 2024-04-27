import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';

function App() {
  const [date, setDate] = useState('');
  const [cachorrosPequenos, setCachorrosPequenos] = useState('');
  const [cachorrosGrandes, setCachorrosGrandes] = useState('');
  const [melhorPetShop, setMelhorPetShop] = useState('');
  const [minPreco, setMinPreco] = useState(null);
  const [aviso, setAviso] = useState('');

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleCachorrosPequenosChange = (event) => {
    setCachorrosPequenos(event.target.value);
  };

  const handleCachorrosGrandesChange = (event) => {
    setCachorrosGrandes(event.target.value);
  };

  const handleSearch = () => {
    if (!date || !cachorrosPequenos || !cachorrosGrandes) {
      setAviso('Preencha todos os campos corretamente.');
      return;
    }

    const diaSemana = new Date(date).getDay();
    const meuCaninoFelizPreco = calcularPreco('Meu Canino Feliz', diaSemana, cachorrosPequenos, cachorrosGrandes);
    const vaiRexPreco = calcularPreco('Vai Rex', diaSemana, cachorrosPequenos, cachorrosGrandes);
    const chowChawgasPreco = calcularPreco('ChowChawgas', diaSemana, cachorrosPequenos, cachorrosGrandes);

    let melhorPetShop = '';
    let minPreco = Number.MAX_VALUE;

    if (meuCaninoFelizPreco < minPreco) {
      melhorPetShop = 'Meu Canino Feliz';
      minPreco = meuCaninoFelizPreco;
    }
    if (vaiRexPreco < minPreco || (vaiRexPreco === minPreco && distanciaCanil('Vai Rex') < distanciaCanil(melhorPetShop))) {
      melhorPetShop = 'Vai Rex';
      minPreco = vaiRexPreco;
    }
    if (chowChawgasPreco < minPreco || (chowChawgasPreco === minPreco && distanciaCanil('ChowChawgas') < distanciaCanil(melhorPetShop))) {
      melhorPetShop = 'ChowChawgas';
      minPreco = chowChawgasPreco;
    }

    setMelhorPetShop(melhorPetShop);
    setMinPreco(minPreco);
    setAviso('');
  };

  const calcularPreco = (petshop, diaSemana, cachorrosPequenos, cachorrosGrandes) => {
    let cachorroPequenoPreco, cachorroGrandePreco;

    switch (petshop) {
      case 'Meu Canino Feliz':
        cachorroPequenoPreco = (diaSemana <= 4) ? 20 : 20 * 1.2;
        cachorroGrandePreco = (diaSemana <= 4) ? 40 : 40 * 1.2;
        break;
      case 'Vai Rex':
        cachorroPequenoPreco = (diaSemana <= 4) ? 15 : 20;
        cachorroGrandePreco = (diaSemana <= 4) ? 50 : 55;
        break;
      case 'ChowChawgas':
        cachorroPequenoPreco = 30;
        cachorroGrandePreco = 45;
        break;
      default:
        cachorroPequenoPreco = 0;
        cachorroGrandePreco = 0;
    }

    const totalCachorrosPequenosPreco = cachorroPequenoPreco * cachorrosPequenos;
    const totalCachorrosGrandesPreco = cachorroGrandePreco * cachorrosGrandes;
    return totalCachorrosPequenosPreco + totalCachorrosGrandesPreco;
  };

  const distanciaCanil = (petshop) => {
    switch (petshop) {
      case 'Meu Canino Feliz':
        return 2;
      case 'Vai Rex':
        return 1.7;
      case 'ChowChawgas':
        return 0.8;
      default:
        return Number.MAX_VALUE;
    }
  };

  return (
    <div className="container">
      <h1 className="title">Localizador de PetShop Ideal  </h1>

      <div className="containerInput">
        <div className="inputGroup">
          <label htmlFor="dateInput">Data:</label>
          <input
            id="dateInput"
            type="date"
            value={date}
            onChange={handleDateChange}
            className="dateInput"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="cachorrosPequenosInput">Quantidade de cães pequenos:</label>
          <input
            id="cachorrosPequenosInput"
            type="number"
            value={cachorrosPequenos}
            onChange={handleCachorrosPequenosChange}
            className="input"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="cachorrosGrandesInput">Quantidade de cães grandes:</label>
          <input
            id="cachorrosGrandesInput"
            type="number"
            value={cachorrosGrandes}
            onChange={handleCachorrosGrandesChange}
            className="input"
          />
        </div>
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size="25" color="#FFF" />
        </button>
      </div>
      {aviso && <p className="aviso">{aviso}</p>}
      {melhorPetShop && minPreco !== null &&
        <main className="main">
          <div className="result">
            <h2>Melhor PetShop:  </h2>
            <h2 className='destaque'>{melhorPetShop}</h2>
            <span>Preço total dos banhos: R${minPreco.toFixed(2)}</span>
            
          </div>
        </main>
      }
    </div>
  );
}

export default App;
