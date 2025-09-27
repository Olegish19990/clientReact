import { useMemo, useState } from "react";
import { courses as seed } from "./data/courses.js";
import Filters from "./components/Filters.jsx";
import CourseList from "./components/CourseList.jsx";
import "./App.css";

export default function App() {
  // Підйом стану: все, що впливає на відбір/сортування — тут
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
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
        list.sort((a, b) => b.price - a.price);
        break;
      case "price-desc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "pop-asc":
        list.sort((a, b) => b.popularity - a.popularity);
        break;
      case "pop-desc":
        list.sort((a, b) => a.popularity - b.popularity);
        break;
      default:
        break; 
    }

    return list;
  }, [query, category, sortBy]);

  return (
    <main className="container">
      <h1 className="course_catalog_title">Каталог курсів</h1>

      <Filters
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      <CourseList items={visible} />
    </main>
  );
}
