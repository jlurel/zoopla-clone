import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Properties from "./components/Properties";
import PropertyDetails from "./components/PropertyDetails";
import Search from "./components/Search";
import { ThemeProvider } from "./contexts/themeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sale" element={<Search purpose="sale" />} />
            <Route path="/rent" element={<Search purpose="rent" />} />
            <Route
              path="/sale/properties"
              element={<Properties purpose="sale" />}
            />
            <Route
              path="/rent/properties"
              element={<Properties purpose="rent" />}
            />
            <Route path="/property/:propertyId" element={<PropertyDetails />} />
          </Routes>
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
