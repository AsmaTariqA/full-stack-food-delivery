"use client";

import { useEffect } from "react";
import {
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import useSWR from "swr";
import axios from "axios";
import { useUserStore } from "@/store/UserStore";

export default function Buttons() {
  const { status } = useSession();

  // fetch user profile
  const fetcher = async () => {
    const response = await axios.get("/api/profile");
    return response.data;
  };
  const { data: user } = useSWR("user", fetcher);

  const setUser = useUserStore((state) => state.setUser);

  // ✅ update store only when user changes
  useEffect(() => {
    if (user) setUser(user);
  }, [user, setUser]);

  const userImage = user?.image || "/profile.png";

  let userName = user?.name || "User";
  if (userName?.includes(" ")) userName = userName.split(" ")[0];

  return (
    <>
      {status === "authenticated" ? (
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm font-semibold text-gray-700">
            Hi, <span className="text-primary">{userName}</span>
          </span>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="primary"
                isBordered
                src={userImage}
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" as={Link} href="/profile">
                My Profile
              </DropdownItem>
              <DropdownItem key="orders" as={Link} href="/orders">
                My Orders
              </DropdownItem>
              <DropdownItem key="settings" as={Link} href="/">
                Settings
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => signOut()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      ) : (
        <div className="flex gap-3">
          <Button
            as={Link}
            color="secondary"
            href="/register"
            variant="shadow"
            radius="full"
            className="font-medium"
          >
            Sign Up
          </Button>
          <Button
            as={Link}
            color="primary"
            href="/login"
            variant="shadow"
            radius="full"
            className="font-medium"
          >
            Sign In
          </Button>
        </div>
      )}
    </>
  );
}
