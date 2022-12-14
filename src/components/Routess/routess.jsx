import { createBrowserRouter } from "react-router-dom";
import About from "../About";
import Blog from "../Blog";
import CourseAll from "../CourseAll/CourseAll";
import Courses from "../Courses/Courses";
import SelectedCourse from "../Courses/SelectedCourse";
import ErrorPage from "../ErrorPage";
import Home from "../Home/Home";
import Root from "../Root";
import SignIn from "../SignIn/SignIn";
import Signup from "../Signup/Signup";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/home",
        element: <Home></Home>,
        children: [
          {
            path: "/home/courses/:id",
            loader: async ({ params }) => {
              return fetch(
                `https://server-educators.vercel.app/courses/${params.id}`
              );
            },
            element: <CourseAll></CourseAll>,
          },
          {
            path: "/home/course/:id",
            loader: async ({ params }) => {
              return fetch(
                `https://server-educators.vercel.app/course/${params.id}`
              );
            },
            element: (
              <PrivateRoute>
                <SelectedCourse />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "/courses",
        element: <Courses />,

        children: [
          {
            path: "/courses/:id",
            loader: async ({ params }) => {
              return fetch(
                `https://server-educators.vercel.app/courses/${params.id}`
              );
            },
            element: <CourseAll></CourseAll>,
          },
        ],
      },

      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "*",
        element: <ErrorPage></ErrorPage>,
      },
    ],
  },
]);

export default router;
