export default function IngredientLayout({ children, modal }) {
  return (
    <main>
      {modal}
      {children}
    </main>
  );
}
