import { Provider } from "react-redux";
import "./App.css";
import store from "./redux/store";
import { HomeScreen } from "./UI/HomeScreen";

function App() {
  return (

    <div className="container">
      <Provider store={store}>
      <HomeScreen />
      </Provider>
  
    </div>
  );
}

export default App;
