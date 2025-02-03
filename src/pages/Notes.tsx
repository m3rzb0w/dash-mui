import { useEffect, useState } from "react"
import { Container, Grid } from "@mui/system"
import NoteCard from "../components/NoteCard"

interface Note {
  title: string
  details: string
  category: string
  id: string
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data: Note[]) => setNotes(data))
  }, [])

  const handleDelete = async (id: Note["id"]) => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: "DELETE",
    });
    const newNotes = notes.filter((note) => note.id !== id)
    setNotes(newNotes);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid key={note.id} size={{xs:12, sm:6, md:4, lg:3}}> 
            <NoteCard note={note} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
