import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "../../../../lib/api";
import type { NoteTag } from "../../../../types/note";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const allTags: NoteTag[] = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;

  const firstTag =
    slug && slug[0] !== "All" && allTags.includes(slug[0] as NoteTag)
      ? (slug[0] as NoteTag)
      : undefined;
  const page = 1;
  const perPage = 12;
  const search = "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page, perPage, search, tag: firstTag }],
    queryFn: () => fetchNotes(page, perPage, search, firstTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={firstTag} />
    </HydrationBoundary>
  );
}
