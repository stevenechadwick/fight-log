import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import Logout from "./logout";
import { getServerSession } from "next-auth";

export default function LayoutNav() {
  const session = getServerSession()
  if (!session) return null
  return (
    <Navbar maxWidth="full" classNames={{wrapper: "px-0"}}>
      <NavbarBrand>
        <p className="font-bold text-inherit">Fight Log</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Logout color="primary" variant="flat"/>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}