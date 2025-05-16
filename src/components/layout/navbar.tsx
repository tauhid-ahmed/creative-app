import Link from "next/link";
import { Container } from "./container";
import { dashboardPath, issuesPath } from "@/paths";
import { LucideBug } from "lucide-react";
import ActiveLink from "@/components/active-link";

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
        <li key={link.name}>
          <ActiveLink href={link.href}>{link.name}</ActiveLink>
        </li>
      ))}
    </ul>
  );
}
