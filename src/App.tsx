import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./Pages/Root.tsx";
import ErrorPage from "./Pages/ErrorPage/ErrorPage.tsx";
import HomePage from "./Pages/HomePage/HomePage.tsx";
import ItemPage from "./Pages/ItemPage/ItemPage.tsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <ErrorPage />,
            children:[
                {
                    index: true,
                    element: <HomePage />
                },
                {
                    path: '/item' ,
                    element: <ItemPage />
                }
            ]
        }
    ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
