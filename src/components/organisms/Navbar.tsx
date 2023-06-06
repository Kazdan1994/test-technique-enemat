import { Avatar } from "primereact/avatar";
import Logo from "@assets/logo.svg";

export function Navbar() {
  return (
    <div className="m-4 mb-0 flex justify-content-between">
      <img height={32} src={Logo} alt="" />
      <Avatar image="/img/arthur.jpg" size="xlarge" shape="circle" />
    </div>
  );
}
