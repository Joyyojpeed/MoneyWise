  const [name, setName] = useState("");
  const [datetime, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  useEffect(()=>{
    getTransactions().then(setTransactions);
  },[]);

  async function getTransactions(){
    const url = process.env.REACT_APP_API_URL + '/transactions';
    const  response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(ev){
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    const price = name.split(' ')[0];
    fetch (url,{
      method : 'POST',
      headers : {'content-type' : 'application/json'},
      body: JSON.stringify({
        price,
        name:name.substring(price.length+1),
        description, 
        datetime, 
      })
      
    }).then(response => {
      response.json().then(json =>{
        setName ('');
        setDate('');
        setDescription('');
        
        console.log('result', json);
      });
    });
    
  }
  let balance = 0;
  for ( const transaction of transactions){
    balance += transaction.price;
  }


  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];


  return (
    <main>
      <h1>
        ${balance}<span>{fraction}</span>
      </h1>
      <form onSubmit={addNewTransaction }>
        <div className="basics">
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="+200 products"
          />
          <input
            value={datetime}
            onChange={(ev) => setDate(ev.target.value)}
            type="datetime-local"
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="description"
          />
        </div>
        <button type="submit">Add new transactions</button>
        
        </form>
        <div className="transactions">
          {transactions.length>0 && transactions.map(transaction =>(
            <div className="transaction">
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="purpose">{transaction.description}</div>
            </div>
            <div className="right">
              <div className={"price " + (transaction.price < 0 ? 'red' : 'green') }>
                Rs{transaction.price}</div>
              <div className="date">2022-01-01 14:35</div>
            </div>
          </div>
          ))}
          
         
        </div>
      
    </main>
  );
}

export default App;
