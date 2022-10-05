import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Menu from "../globalComponents/Menu";

export default function UserPage() {
  const { userId } = useParams();
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser.userId === +userId) setOwner(true);
  }, []);
  console.log(owner);
  return <Menu />;
}
