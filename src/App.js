import Axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Coin from './components/Coin';
function App() {
  const [listOfCoins,setListOfCoins] = useState([]);
  const [searchWord,setSearchWord] = useState("");
  useEffect(()=>{
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then((res)=>{setListOfCoins(res.data.coins)});
  },[]);
  const filteredCoins = listOfCoins.filter((coin) => {
    const name = coin.name.toLowerCase();
    const word = searchWord.toLowerCase();
    return name.includes(word);
  });

 

  return (
    <div className="App">
      <div className="cryptoHeader">
      <input
          type="text"
          placeholder="Bitcoin..."
          onChange={(e) => {
            setSearchWord(e.target.value)
          }}
        />
      </div>
      <div className="cryptoDisplay">
        {filteredCoins.map((coin)=>(
          <Coin key={coin.id} name={coin.name}
          icon={coin.icon}
          price={coin.price}
          symbol={coin.symbol}/>
        ))}
      </div>
    </div>
  );
}

export default App;
