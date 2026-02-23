import Link from "next/link";
import type { NoteTag } from "../../../../types/note";
import css from "./SideBarNotes.module.css";

export default async function SidebarNotes() {
  const tags: (NoteTag | "All")[] = [
    "All",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
    "Todo",
  ];

  return (
    <div>
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag}>
            <Link
              href={
                tag === "All" ? `/notes/filter/All` : `/notes/filter/${tag}`
              }
              className={css.menuLink}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
