import Header from "../components/Header";
import { useState } from "react";
import Link from "next/dist/client/link";
import axios from "axios";
import { toast } from "react-toastify";

export default function register() {
  let [name, updateName] = useState("");
  let [email, updateEmail] = useState("");
  let [password, updatePassword] = useState("");

  let [isLoading, updateLoading] = useState(false);

  let handleSubmitClick = async () => {
    try {
      let { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/register`,
        {
          name,
          email,
          password,
        }
      );
      console.log(data);
      toast(data);
    } catch (e) {
      console.log(e);
      updateLoading(() => false);
      toast(data);
    }

    updateLoading(() => false);
  };

  let handleFormSubmit = (e) => {
    e.preventDefault();
    // if form gets validated it comes here otherwise not

    updateLoading(() => true);

    handleSubmitClick();
  };
  return (
    <div>
      <Header content="Register" loggedIn={false} />

      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleFormSubmit}>
          <div className="mt-8">
            <label className="py-1">Enter Name</label>
            <input
              type="text"
              placeholder="Ben Dover"
              name="name"
              id="name"
              className="flex px-4 py-8 h-12  w-full bg-white2 items-center rounded-lg"
              value={name}
              required
              onChange={(e) => {
                updateName(() => e.target.value);
              }}
              onFocus={(e) => e.target.classList.add("focussedInput")}
              onBlur={(e) => e.target.classList.toggle("focussedInput")}
            />
          </div>
          <div className="mt-5">
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
          <span>Registered? </span>
          <span className="text-blue">
            <Link href={"/login"}>Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
