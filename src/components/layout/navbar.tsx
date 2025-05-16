import Link from "next/link";
import { Container } from "./container";
import { dashboardPath, issuesPath } from "@/paths";

const navLinks = [
  { name: "Dashboard", href: dashboardPath() },
  { name: "Issues", href: issuesPath() },
];

export default function Navbar() {
  return (
    <header className="py-4 border-b">
      <Container>
        <nav className="flex justify-between items-baseline">
          <Link href="/">Logo</Link>
          <Menu />
        </nav>
      </Container>
    </header>
  );
}

function Menu() {
  return (
    <ul className="flex gap-4">
      {navLinks.map((link) => (
        <li key={link.name}>
          <Link href={link.href}>{link.name}</Link>
        </li>
      ))}
    </ul>
  );
}
