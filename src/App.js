import List from "./components/List";
import { useEffect, useState } from "react";
import Calls from "./components/Calls";
import './index.css'



// json-server --watch db.json --port 3010 --routes routes.json


function App() {

  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState("all");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  function constructNewItem() {
    return {
      "content": inputText,
      "state": "active",
      "count": 1,
    }
  }

  async function changeState(id, state) {
    await Calls.updateShoppingItem(id, { state: state === "completed" ? "active" : "completed" });
    fetchData();
  }

  async function changeCount(id, oldCount, number) {
    if (oldCount + number > 0) {
      await Calls.updateShoppingItem(id, { count: oldCount + number });
      fetchData();
    } else {
      alert("Nelze zadat hdnotu menší než 1 !")
    }
  }

  async function deleteItem(id) {
    await Calls.deleteShoppingItem(id)
    fetchData()
  }

  async function addItem() {
    await Calls.createShoppingItem(constructNewItem())
    fetchData()
  }

  async function fetchData() {
    setLoader(true)
    switch (filter) {
      case "all":
        await Calls.getShoppingListAll()
          .then(result => { setError(false); setData(result) })
          .catch(error => { setError(true); setData([]) })
        break;

      case "completed":
        await Calls.getShoppingListOnlyCompleted()
          .then(result => { setError(false); setData(result) })
          .catch(error => { setError(true); setData([]) })
        break;

      case "active":
        await Calls.getShoppingListOnlyActive()
          .then(result => { setError(false); setData(result) })
          .catch(error => { setError(true); setData([]) })
        break;

      default:
        await Calls.getShoppingListAll()
          .then(result => { setError(false); setData(result) })
          .catch(error => { setError(true); setData([]) })
        break;
    }
    setLoader(false)
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [filter]);

  return (
    <div className="App">
      {loader &&
        <div className="loader">
          <h2>Loading..</h2>
        </div>
      }
      <div className="card">
        <div className="cardHeader">
          <div className="cardHeader-content">
            <h1>Shopping list</h1>
            <input type="text" onChange={(event) => setInputText(event.target.value)} />
            <button onClick={() => addItem()} id='addButton'>Add item</button>
          </div>
        </div>
        <div className="cardContent">
          {error && <div className="error">Error occured, please reload the page or try again later.</div>}
          <List
            data={data}
            onDelete={(id) => deleteItem(id)}
            onStateChange={(id, state) => changeState(id, state)}
            onChangeCount={(id, oldCount, number) => changeCount(id, oldCount, number)}
          />

        </div>
        <div className="cardFooter">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
        </div>


      </div>
    </div >
  );
}


export default App;
