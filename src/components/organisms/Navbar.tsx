import { Avatar } from "primereact/avatar";
import Logo from "@assets/logo.svg";

function Navbar() {
  return (
    <div className="m-4 mb-0 flex justify-content-between">
      <img height={32} src={Logo} alt="" />
      <Avatar image="/img/arthur.jpg" shape="circle" />
    </div>
  );
}

export default Navbar;
