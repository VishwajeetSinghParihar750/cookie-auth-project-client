import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import Link from "next/link";

export default function Navbar(props) {
  const router = useRouter();
  const { loggedIn } = props;

  let handleLogout = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/logout`,
        {
          withCredentials: true,
        }
      );
      toast(data);
      window.localStorage.removeItem("user");

      router.push("/login");
    } catch (e) {
      console.log(e);
      if (e.response && e.response.data) toast(e.response.data);
    }
  };

  return (
    <div className="p-2 text-base mx-5">
      <ul className="flex justify-between">
        <ul className="flex">
          {loggedIn && (
            <Link href={"/"}>
              <li className="mr-8 hover:text-cyan-500 cursor-pointer">
                <span>
                  <FontAwesomeIcon icon="fa-solid fa-home" />
                </span>
                <span className="px-2">App</span>
              </li>
            </Link>
          )}
          {!loggedIn && (
            <Link href={"/login"}>
              <li className="mr-8  hover:text-cyan-500 cursor-pointer">
                <span>
                  <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />
                </span>
                <span className="px-2">Login</span>
              </li>
            </Link>
          )}
          {!loggedIn && (
            <Link href={"/register"}>
              <li className=" hover:text-cyan-500  cursor-pointer">
                <span>
                  <FontAwesomeIcon icon="fa-solid fa-user" />
                </span>
                <span className="px-2">Register</span>
              </li>
            </Link>
          )}
        </ul>
        <div>
          {loggedIn && (
            <span onClick={handleLogout}>
              <li className=" hover:text-cyan-500  cursor-pointer">
                <span>
                  <FontAwesomeIcon icon="fa-solid fa-user" />
                </span>
                <span className="px-2">Logout</span>
              </li>
            </span>
          )}
        </div>
      </ul>
    </div>
  );
}
