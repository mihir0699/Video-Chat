import React , {useEffect} from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import "antd/dist/antd.css";
import "font-awesome/css/font-awesome.min.css";
import Footer from "./components/Footer/Footer";
const App = () => {
  useEffect(()=>{
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  },[])
  return (
    <>
    <ins className="adsbygoogle"
     style={{display : "block"}}
     data-ad-client="ca-pub-5366413451953973"
     data-ad-slot="8917011428"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
    <Router>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </Router>
</>
  );
};

export default App;
