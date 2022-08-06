import Head from "next/head";
import Header from "../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Index() {
  const router = useRouter();
  const [verified, updateVerified] = useState(false);
  const [loggedUser, updateLoggedUser] = useState();

  const verify = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/verifyLogin`,
        {
          withCredentials: true,
        }
      );
      updateLoggedUser(() => {
        return { ...data };
      });
      updateVerified(() => true);
    } catch (e) {
      if (e.response && e.response.data) toast(e.response.data);
      updateLoggedUser(() => "");
      updateVerified(() => false);
      router.push("/login");
    }
  };

  useEffect(() => {
    verify();
  }, []);
  return (
    <>
      {verified && (
        <div className="flex flex-col">
          <Header content="Privatized App" loggedIn={true} />
          {loggedUser && (
            <div className="max-w-3xl self-center">
              <p className="my-10">{JSON.stringify(loggedUser)}</p>
              {window.localStorage.user && (
                <p className="my-10">
                  {JSON.stringify(window.localStorage.user)}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
