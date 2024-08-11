import { useState} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [balance, setBalance] = useState(0);
  const [userInput, setUserInput] = useState(0);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [successState, setSuccessState] = useState();
  const currentTime = new Date(); // Get the current date and time
  const [transactions, setTransactions] = useState([]); // Initialize transactions state

  // Manually format the date as dd/mm/yy
  const formattedDate = `${String(currentTime.getDate()).padStart(2, '0')}-${String(currentTime.getMonth() + 1).padStart(2, '0')}-${String(currentTime.getFullYear())}`;
  //padstart ensures day and month are 2 digits
  //.getMonth() + 1 retrieves the month (adding 1 because months are zero-indexed).
  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleDeposit = (event) =>{
    event.preventDefault();
    console.log('Deposit Clicked!');

    const newBalance = Number(balance) + Number(userInput);
    setBalance(newBalance);

    const successState = true;
    setSuccessState(successState);
    setSuccess("Your Deposit Was A Success");

    // Add the new transaction to the transactions array
    const newTransaction = { type: 'Deposit', amount: userInput, date: formattedDate, time: formattedTime };
    setTransactions([...transactions, newTransaction]);

    setError(undefined);
  };

  const handleWithdrawal = (event) =>{
    event.preventDefault();
    console.log('Withdraw Clicked!');
    if (balance < userInput) {
      const successState = false;
      setSuccessState(successState);
      setError("Your Balance Is Not Sufficient");
      return;
    }else{
      const successState = true;
      setSuccessState(successState);
      setSuccess("Your Withdrawal Was A Success");

      // Add the new transaction to the transactions array
      const newTransaction = { type: 'Withdrawal', amount: userInput, date: formattedDate, time: formattedTime };
      setTransactions([...transactions, newTransaction]);
    }

    const newBalance = Number(balance) - Number(userInput);
    setBalance(newBalance);

    setError(undefined);
    // setSuccess
  };

  const handleUserInputChange = (event) =>{
    setUserInput(event.target.value);
    // console.log(userInput);
  };





  return (
    <div className="container">
    <div className="app">
      <div className="top">
        <h1>DepWith App</h1>
      </div>
      <div className="balance">Account Balance: KSH <span id="balance">{balance}</span></div>
      <div className="user-input">
        <form id="transactionForm">
          <input type="number" name="amount" id="amount" value={userInput} onChange={handleUserInputChange} />
          <button id="depositButton" type="submit" onClick={handleDeposit}>Deposit</button>
          <button id="withdrawalButton" type="submit" onClick={handleWithdrawal}>Withdraw</button>
        </form>

        {successState ? <p className='success'>{success}</p> : <p className='error'>{error}</p>}
        
      </div>

      <div className="transactions">
        <h2>Transactions</h2>
        {/* Table with transactions */}
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody id="transactions">
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.type}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date}</td>
                <td>{transaction.time}</td>
              </tr>
            ))}

          </tbody>
          </table>
      </div>
    </div>
  </div>
  )
}

export default App
