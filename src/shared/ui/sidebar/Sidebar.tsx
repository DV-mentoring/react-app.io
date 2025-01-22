import * as React from 'react'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { TodoList } from '../../../features/todo-list/TodoList'
import { NavLink } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import UpcomingIcon from '@mui/icons-material/Upcoming'

import { Drawer, AppBar, DrawerHeader } from './model/sidebar.styles'

export function Sidebar() {
    const theme = useTheme()
    const [open, setOpen] = useState(false)

    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <Box className="box-sidebar">
            <CssBaseline />
            <AppBar position="fixed" open={open} className="app-bar">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={`button-app-bar ${open ? 'button-app-bar--hidden' : ''}`}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        TodoDaily
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem
                        disablePadding
                        className="list-item"
                        component={NavLink}
                        to="/"
                    >
                        <ListItemButton
                            className={`list-item-button ${open ? 'open' : 'list-item-button--hidden'}`}
                        >
                            <ListItemIcon
                                className={`list-icon ${open ? 'open' : 'list-icon--hidden'}`}
                            >
                                <CalendarTodayIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={'Today'}
                                className={`list-text ${open ? 'open' : 'list-text--hidden'}`}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        className="list-item"
                        component={NavLink}
                        to="/Yesterday"
                    >
                        <ListItemButton
                            className={`list-item-button ${open ? 'open' : 'list-item-button--hidden'}`}
                        >
                            <ListItemIcon
                                className={`list-icon ${open ? 'open' : 'list-icon--hidden'}`}
                            >
                                <CalendarMonthIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={'Yesterday'}
                                className={`list-text ${open ? 'open' : 'list-text--hidden'}`}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        className="list-item"
                        component={NavLink}
                        to="/Upcoming"
                    >
                        <ListItemButton
                            className={`list-item-button ${open ? 'open' : 'list-item-button--hidden'}`}
                        >
                            <ListItemIcon
                                className={`list-icon ${open ? 'open' : 'list-icon--hidden'}`}
                            >
                                <UpcomingIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={'Upcoming'}
                                className={`list-text ${open ? 'open' : 'list-text--hidden'}`}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
            <Box component="main" className="main-box">
                <DrawerHeader />
                <Typography>
                    <Routes>
                        <Route path="/" element={<TodoList day={'Today'} />} />
                        <Route
                            path="/Yesterday"
                            element={<TodoList day={'Yesterday'} />}
                        />
                        <Route
                            path="/Upcoming"
                            element={<TodoList day={'Upcoming'} />}
                        />
                    </Routes>
                </Typography>
            </Box>
        </Box>
    )
}
