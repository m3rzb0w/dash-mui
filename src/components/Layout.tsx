import { Box } from "@mui/system"
import { ReactNode } from "react"
import { Drawer, Typography, List, ListItem, ListItemText, ListItemIcon, ListItemButton } from "@mui/material"
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router"
import ManageSearchIcon from '@mui/icons-material/ManageSearch'

const drawerWidth = 240

const styles = {
    page: {
        background: '#f9f9f9',
        width: '100%',
        minHeight: '100vh',
    },
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    active: {
        background: '#f4f4f4',
    }
}

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const menuItems = [
        {
            text: "My Notes",
            icon: <SubjectOutlined color="secondary" />,
            path: "/",
        },
        {
            text: "Create Note",
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: "/create"
        },
        {
            text: "Campaign",
            icon: <ManageSearchIcon color="secondary" />,
            path: "/campaign"
        },
    ]

    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Box sx={styles.root}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <div>
                    <Typography variant="h5">
                        Notes
                    </Typography>
                </div>

                <List>
                    {menuItems.map(item => (
                        <ListItemButton
                            key={item.text}
                            sx={location.pathname === item.path || location.pathname.startsWith(item.path) && item.path !== "/"
                                ? styles.active 
                                : null}
                            onClick={() => navigate(item.path)}
                        >
                            <ListItem>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <Box sx={styles.page}>
                {children}
            </Box>
        </Box>
    )
}