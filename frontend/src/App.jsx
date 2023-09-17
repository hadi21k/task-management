import './App.css'
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Root from './components/Root';
import AuthProvider from './context/provider';

const router = createBrowserRouter([
  { path: "*", Component: Root },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
