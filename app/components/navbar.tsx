import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import Logout from "./logout";

export default function LayoutNav() {
  return (
    <Navbar maxWidth="full" classNames={{wrapper: "px-0"}}>
      <NavbarBrand>
        <p className="font-bold text-inherit">Fight Log</p>
      </NavbarBrand>
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