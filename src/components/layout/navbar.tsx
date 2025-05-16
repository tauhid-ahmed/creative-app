import Link from "next/link";
import { Container } from "./container";
import { dashboardPath, issuesPath } from "@/paths";
import { LucideBug } from "lucide-react";

const navLinks = [
  { name: "Dashboard", href: dashboardPath() },
  { name: "Issues", href: issuesPath() },
];

export default function Navbar() {
  return (
    <header className="py-4 border-b">
      <Container>
        <nav className="flex gap-layout justify-between items-center">
          <Link href="/">
            <LucideBug className="size-6 md:size-8" />
          </Link>
          <Menu />
        </nav>
      </Container>
    </header>
  );
}

function Menu() {
  return (
    <ul className="flex gap-layout text-muted-foreground">
      {navLinks.map((link) => (
        <li
          className="hover:text-foreground transition-colors duration-300"
          key={link.name}
        >
          <Link href={link.href}>{link.name}</Link>
        </li>
      ))}
    </ul>
  );
}
