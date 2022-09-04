import { Component } from "react";
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from "react-redux";
import {
    Button,
    CssBaseline,
    Grid, InputAdornment,
    TextField
} from "@mui/material";
import Loader from "../components/Loader";
import {SearchRounded} from "@mui/icons-material";
import {Link as RouterLink} from "react-router-dom";
import './HomeView.css';
import {updateUserId} from "../features/dashboardSlice";

function mapStateToProps(state) {
    return {
        user : state.dashboard.user,
        ui: state.dashboard.ui
    }
}

const theme = createTheme({palette: { mode: 'dark'}});

class HomeView extends Component {

    constructor(props) {
        super(props);
        this.buttonRef = React.createRef();
    }

    handleTextInput = (event) => {
        this.props.dispatch(updateUserId(event.target.value))
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            this.buttonRef.current.click()
        }
    }

    render() {
        return(
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Loader showLoader={this.props.ui.showLoader} />
                <Grid container
                      spacing={1}
                      alignItems="center"
                      justify="center"
                      direction="row" sx={{height: "80vh"}}>
                    <Grid item xs={1} md={1}/>
                    <Grid item xs={8} md={8}>
                        <TextField fullWidth label="User ID" color={"success"}
                                   value={this.props.user.id}
                                   onChange={this.handleTextInput}
                                   onKeyDown={this.handleKeyDown}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <SearchRounded color={"success"}/>
                                           </InputAdornment>
                                       ),
                                   }}
                                   autoFocus
                                   size={"small"}
                                   placeholder={"Please enter your user id here"} />
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <RouterLink to={"/dashboard"} style={{textDecoration: 'none'}}>
                            <Button fullWidth variant="contained" color={"success"} size={"large"} ref={this.buttonRef}>
                                Submit
                            </Button>
                        </RouterLink>
                    </Grid>
                    <Grid item  xs={1} md={1}/>
                </Grid>
            </ThemeProvider>
        )
    }
}

export default connect(mapStateToProps)(HomeView)