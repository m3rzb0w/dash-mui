import { FormControlLabel, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import TextField from "@mui/material/TextField"
import { useState } from "react"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { useNavigate } from "react-router"

const styles = {
  field: {
    marginTop: 2,
    marginBottom: 2,
    display: 'block',
  }
}

export default function Create() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState("todos")


  const handleSubmit = (e: any) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    const trimmedTitle = title.trim()
    const trimmedDetails = details.trim()

    if (trimmedTitle == "") {
      setTitleError(true)
    }

    if (trimmedDetails == "") {
      setDetailsError(true)
    }

    if (trimmedTitle && trimmedDetails) {
      fetch('http://localhost:8000/notes', {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({title, details, category})
      }).then(() => navigate("/"))
    }
  }

  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        color="textSecondary"
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value.trimStart())}
          value={title}
          sx={styles.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value.trimStart())}
          value={details}
          sx={styles.field}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />
        
        <FormControl sx={styles.field}>
          <FormLabel color="secondary">Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>
        
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  )
}