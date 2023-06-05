import { Avatar } from "primereact/avatar";
import Logo from "@assets/logo.svg";

export function Navbar() {
  return (
    <div className="p-4 flex justify-content-between">
      <img height={32} src={Logo} alt="Akalead" />
      <Avatar label="P" size="xlarge" shape="circle" />
    </div>
  );
}
