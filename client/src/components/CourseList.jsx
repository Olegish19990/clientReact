import CourseCard from "./CourseCard.jsx";

export default function CourseList({ items, query = "" }) {
  if (!items || items.length === 0) {
    return (
      <div role="status" aria-live="polite" className="empty">
        Порожньо
      </div>
    );
  }

  return (
    <div className="grid">
      {items.map(c => (
        <CourseCard key={c.id} query={query} {...c} />
      ))}
    </div>
  );
}
