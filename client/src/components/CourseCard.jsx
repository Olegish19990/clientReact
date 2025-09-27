export default function CourseCard({
  title,
  category,
  price,
  popularity,
  tags = [],
}) {
  return (
    <article className="card" aria-label={`Курс ${title}`}>
      <header className="card__header">
        <h3 className="card__title">{title}</h3>
        <span className="card__badge" aria-label="Категорія">
          {category}
        </span>
      </header>
      <div className="card__body">
        <p className="card__row">
          <strong>Ціна:</strong> {price.toLocaleString("uk-UA")} ₴
        </p>
        <p className="card__row">
          <strong>Популярність:</strong> {popularity}/100
        </p>
        {tags?.length > 0 && (
          <ul className="tags" aria-label="Теги курсу">
            {tags.map((t) => (
              <li key={t} className="tag">
                #{t}
              </li>
            ))}
          </ul>
        )}
      </div>
      {popularity >= 95 && (
        <div className="ribbon" aria-hidden="true">
          Хіт
        </div>
      )}
    </article>
  );
}
