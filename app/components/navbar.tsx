import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import Logout from "./logout";
import { getServerSession } from "next-auth";

export default function LayoutNav() {
  const session = getServerSession()
  if (!session) return null
  return (
    <Navbar>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">Home</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Logout color="primary" variant="flat"/>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}