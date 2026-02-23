import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSubmit: (value: string) => void;
}

export default function SearchBox({ onSubmit }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={(e) => onSubmit(e.target.value)}
    />
  );
}
