import { Route, Routes } from "react-router"
import Notes from './pages/Notes'
import Create from './pages/Create'
import CampaignInput from "./pages/CampaignInput"
import CampaignPage from "./pages/CampaignPage"
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { purple } from "@mui/material/colors"
import Layout from "./components/Layout"

const theme = createTheme({
  palette: {
    // primary: {
    //   main: '#fefefe',
    // },
    secondary: purple
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route index element={<Notes />} />
          <Route path="create" element={<Create />} />
          <Route path="campaign" element={<CampaignInput />} />
          <Route path="campaign/:opcodeName" element={<CampaignPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

export default App
