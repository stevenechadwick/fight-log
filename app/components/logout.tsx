'use client';

import { signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";

export type LogoutProps = {
  color?: "primary" | "default" | "secondary" | "success" | "warning" | "danger" | undefined;
  variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost" | undefined;
}

export default function Logout({ color = 'primary', variant = 'solid'}: LogoutProps) {
  return (
    <Button color={color} variant={variant} onClick={() => signOut()}>Logout</Button>
  );
}