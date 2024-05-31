import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b px-6 py-3">
      <Link href="/">
        <h2 className="text-xl font-bold">Recetario</h2>
      </Link>
      <div className="flex gap-2">
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Recetas
        </Link>
        <Link
          href="/ingredientes"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Ingredientes
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
