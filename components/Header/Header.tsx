import TagsMenu from "../TagsMenu/TagsMenu";
import css from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={css.header}>
      <h1>
        <Link href="/" aria-label="Home">
          NoteHub
        </Link>
      </h1>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/notes/filter/all">Нотатки</Link>
          </li>

          <li>
            <TagsMenu />
          </li>
        </ul>
      </nav>
    </header>
  );
}
