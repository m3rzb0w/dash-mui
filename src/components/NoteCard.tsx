import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { DeleteOutline } from '@mui/icons-material';

interface Note {
    title: string
    details: string
    category: string
    id: string

}

interface Props {
    note: Note
    handleDelete: (id: Note['id']) => void
}

export default function NoteCard({ note, handleDelete }: Props) {
    return (
        <div>
            <Card elevation={1}>
                <CardHeader
                    action={
                        <IconButton onClick={() => handleDelete(note.id)}>
                            <DeleteOutline />
                        </IconButton>
                    }
                    title={note.title}
                    subheader={note.category}
                />
                <CardContent>
                    <Typography variant='body2' color='textSecondary'>
                        {note.details}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}