import { useMemo, useState } from "react";
import { courses as seed } from "./data/courses.js";
import Filters from "./components/Filters.jsx";
import CourseList from "./components/CourseList.jsx";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all"); // якщо не потрібна категорія — можете прибрати
  const [sortBy, setSortBy] = useState("none");

  const categories = useMemo(
    () => Array.from(new Set(seed.map((c) => c.category))),
    []
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = seed.filter((c) => {
      const inTitle = c.title.toLowerCase().includes(q);
      const inTags = c.tags?.some((t) => t.toLowerCase().includes(q));
      const catOk = category === "all" || c.category === category;
      return catOk && (q === "" || inTitle || inTags);
    });

    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "pop-asc":
        list.sort((a, b) => a.popularity - b.popularity);
        break;
      case "pop-desc":
        list.sort((a, b) => b.popularity - a.popularity);
        break;
      case "title-asc":
        list.sort((a, b) => a.title.localeCompare(b.title, "uk"));
        break;
      case "title-desc":
        list.sort((a, b) => b.title.localeCompare(a.title, "uk"));
        break;
      default:
        break; // none
    }

    return list;
  }, [query, category, sortBy]);

  return (
    <main className="container">
      <h1>Каталог курсів</h1>

      <Filters
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      <CourseList items={visible} query={query} />
    </main>
  );
}
