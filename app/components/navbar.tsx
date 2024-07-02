import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
// import Logout from "./logout";

export default function LayoutNav() {
  return (
    <Navbar maxWidth="full" classNames={{wrapper: "px-0"}}>
      <NavbarBrand>
        <p className="font-bold text-inherit">Fight Log</p>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem>
          <Link href="/">Home</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent>
        <NavbarItem>
          <Link href="/matchups">Matchups</Link>
        </NavbarItem>
      </NavbarContent>
      {/*
      <NavbarContent justify="end">
        <NavbarItem>
          <Logout color="primary" variant="flat"/>
        </NavbarItem>
      </NavbarContent>
      */}
    </Navbar>
  );
}