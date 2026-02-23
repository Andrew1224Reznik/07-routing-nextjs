"use client"; //use client - указывает, что этот файл должден работать на клиенте

import css from "./NoteDetails.client.module.css";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "../../../lib/api";
import { Note } from "../../../types/note";

//Основной компонент NoteDetails, который отображает детали заметки.
//Он использует хук useQuery для получения данных заметки по ее id,
//который извлекается из URL с помощью useParams.
//Если данные загружаются, отображается сообщение "Loading".
//Если произошла ошибка или заметка не найдена, отображается сообщение об ошибке.
//В противном случае отображаются заголовок, содержание и дата создания заметки.
//Также есть кнопка "Back", которая позволяет пользователю вернуться на предыдущую страницу.
export default function NoteDetails() {
  //Получаем параметр id из URL (например, /notes/123, где 123 - это id заметки).
  const { id } = useParams<{ id: string }>();
  //Инициализируем роутер для навигации
  const router = useRouter();

  //Используем useQuery для получения данных заметки по ее id.
  const {
    data: note, //данные заметки
    isLoading, //идентификатор загрузки
    isError, //идентификатор ошибки
  } = useQuery<Note | null>({
    queryKey: ["note", id], //ключ кэширования для React Query
    queryFn: () => fetchNoteById(id), //функция получения данных
    enabled: !!id, //запрос выполняется только если id существует
    refetchOnMount: false, //не обновлять данные при монтировании
  });
  //Функция для возврата на предыдущую страницу
  const handleRouter = () => {
    router.back();
  };

  //Если данные загружаются, отображаем сообщение "Loading"
  if (isLoading) return <p>Loading, please wait...</p>;
  //Если произошла ошибка на заметки не найдена, показываем сообщение
  if (isError || !note) return <p>Something went wrong.</p>;

  //Основной JSX компонента, который отображает детали заметки
  return (
    <div className={css.container}>
      <button className={css.backBtn} onClick={handleRouter}>
        Back
      </button>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created at: {note.createdAt}</p>
      </div>
    </div>
  );
}

//Коротко:
//Компонент берёт id заметки из URL,
//Через React Query получает данные о заметке,
//Показывает лоадер при загрузке и ошибку при проблемах,
//Отображает заголовок, содержание и дату создания заметки,
//Кнопка «Back» возвращает пользователя на предыдущую страницу.
