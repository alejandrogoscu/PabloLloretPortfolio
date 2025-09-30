import Layout from './components/Layout/Layout';
import CustomCursor from './components/Common/CustomCursor/CustomCursor';
import Fiction from './components/Sections/Projects/Fiction';
import Ads from './components/Sections/Projects/Ads';
import Bio from './components/Sections/About/Bio';
import Skills from './components/Sections/About/Skills';
import Contact from './components/Sections/Contact/Contact';
import Login from './components/Admin/Login/Login';
import './App.css';

function App() {
  return (
    <>
      <CustomCursor />
      <Login />
      <Layout>
        <Fiction />
        <Ads />
        <Bio />
        <Skills />
        <Contact />
      </Layout>
    </>
  );
}

export default App;
