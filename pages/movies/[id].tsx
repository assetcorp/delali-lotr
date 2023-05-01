import MovieDetails from "@/src/components/MovieDetails";
import Nav from "@/src/components/Nav.component";
import { useRouter } from "next/router";

export default function MovieDetailsPage() {
  const { query } = useRouter();
  const movieId = query.id;

  return (
    <>
      <Nav />
      <MovieDetails movieId={movieId as string} />
    </>
  );
}
