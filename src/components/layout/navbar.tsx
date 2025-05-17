import Link from "next/link";
import { Container } from "./container";
import { dashboardPath, issuesPath } from "@/paths";
import { LucideBug } from "lucide-react";
import ActiveLink from "@/components/active-link";
import { ThemeToggle } from "../theme-toggle";

const navLinks = [
  { name: "Dashboard", href: dashboardPath() },
  { name: "Issues", href: issuesPath() },
];

export default function Navbar() {
  return (
    <header className="py-4 border-b">
      <Container>
        <nav className="flex gap-layout items-center">
          <Link href="/">
            <LucideBug className="size-6 md:size-8" />
          </Link>
          <div className="ml-auto flex gap-layout items-center">
            <Menu />
            <ThemeToggle />
          </div>
        </nav>
      </Container>
    </header>
  );
}

function Menu() {
  return (
    <ul className="flex gap-layout text-muted-foreground">
      {navLinks.map((link) => (
        <li key={link.name}>
          <ActiveLink href={link.href}>{link.name}</ActiveLink>
        </li>
      ))}
    </ul>
  );
}
