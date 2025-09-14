"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
} from "@nextui-org/react";
import Buttons from "@/components/ui/Buttons";
import { useCartProductsStore } from "@/store/CartProductStore";
import ShoppingCart from "@/components/icons/ShoppingCart";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [count, setCount] = useState(0);

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Menu", href: "/menu" },
    { title: "About", href: "/#about" },
    { title: "Contact", href: "/#contact" },
  ];

  const cartProducts = useCartProductsStore((state) => state.cartProducts);

  // Fix hydration mismatch for cart count
  useEffect(() => {
    setCount(cartProducts.length);
  }, [cartProducts]);

  return (
    <header className="w-full shadow-md sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="xl" className="px-4">
        {/* Left side - Brand */}
        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link
              href="/"
              className="text-2xl font-bold font-serif text-orange-600 tracking-wide hover:text-green-700 transition-colors"
            >
              The pizza shop
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Center - Menu Items (desktop) */}
        <NavbarContent className="hidden sm:flex gap-8" justify="center">
          {menuItems.map((item) => (
            <NavbarItem key={item.title}>
              <Link
                href={item.href}
                className="font-medium text-gray-700 hover:text-orange-600 transition-colors"
              >
                {item.title}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Right side - Buttons + Cart */}
        <NavbarContent justify="end" className="gap-6 items-center">
          <NavbarItem className="hidden sm:flex">
            <Buttons />
          </NavbarItem>
          <Link href="/cart" className="relative hover:scale-110 transition-transform">
            <ShoppingCart />
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-orange-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                {count}
              </span>
            )}
          </Link>
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu>
          {menuItems.map((item) => (
            <NavbarMenuItem key={item.title}>
              <Link
                href={item.href}
                className="block w-full py-2 text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors"
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
          <div className="pt-4 border-t">
            <Buttons />
          </div>
        </NavbarMenu>
      </Navbar>
    </header>
  );
}
