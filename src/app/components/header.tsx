import Link from 'next/link';

export function Header() {
  return (
    <header>
      <nav className="nav-header">
          <div className="nav-item"><Link href="/">Home</Link></div>
          <div className="nav-item"><Link href="/animals">Animals</Link></div>
          <div className="nav-item"><Link href="/persons">Persons</Link></div>
      </nav>
    </header>
  );
}
