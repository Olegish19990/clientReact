import CourseCard from "./CourseCard";

export default function CardList({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="empty" role="status" aria-live="polite">
        Порожньо
      </div>
    );
  }

  return (
    <div className="grid">
        {items.map(c=> (
            <CourseCard key={c.id} {...c}/>
        ))}
    </div>
  );
}
