import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";

export default function Login() {
  let [email, updateEmail] = useState("");
  let [password, updatePassword] = useState("");

  let [isLoading, updateLoading] = useState(false);

  let router = useRouter();

  useEffect(() => {
    try {
      const jsonData = window.localStorage.getItem("user");

      const userInfo = JSON.parse(jsonData);
      if (userInfo && userInfo.email) {
        updateEmail(() => userInfo.email);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  let handleSubmitClick = async () => {
    try {
      let { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (data) toast("Login Success!");

      window.localStorage.setItem("user", JSON.stringify(data));

      updateLoading(() => false);
      router.push("/");
    } catch (e) {
      if (e.response && e.response.data) toast(e.response.data);
      updateLoading(() => false);
    }
  };

  let handleFormSubmit = (e) => {
    e.preventDefault();
    // if form gets validated it comes here otherwise not

    updateLoading(() => true);

    handleSubmitClick();
  };
  return (
    <div>
      <Header content="Login" loggedIn={false} />

      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleFormSubmit}>
          <div className="mt-8">
            <label className="py-1">Enter Email</label>
            <input
              type="Email"
              placeholder="john@cena.com"
              name="email"
              id="email"
              className="flex px-4 py-8 h-12  w-full bg-white2 items-center rounded-lg"
              value={email}
              required
              onChange={(e) => {
                updateEmail(() => e.target.value);
              }}
              onFocus={(e) => e.target.classList.add("focussedInput")}
              onBlur={(e) => e.target.classList.toggle("focussedInput")}
            />
          </div>
          <div className="mt-5">
            <label className="py-1">Enter Password</label>
            <input
              type="password"
              placeholder="JoeMama@myHome"
              name="password"
              id="password"
              className="flex px-4 py-8 h-12  w-full bg-white2 items-center rounded-lg"
              value={password}
              minLength="6"
              maxLength="64"
              required
              onChange={(e) => {
                updatePassword(() => e.target.value);
              }}
              onFocus={(e) => e.target.classList.add("focussedInput")}
              onBlur={(e) => e.target.classList.toggle("focussedInput")}
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              className={`px-20 py-4 text-lg bg-green opacity-80 rounded-lg text-white font-semibold cursor-pointer hover:opacity-70`}
              onSubmit={handleSubmitClick}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </form>

        <div className="flex justify-center mt-2">
          <span>Not Registered? </span>
          <span className="text-blue">
            <Link href={"/register"}>Register</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
