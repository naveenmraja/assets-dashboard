import {Component} from "react";
import {AppBar, CssBaseline, FormControl, Grid, Link, Toolbar} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme({ palette: { mode: 'dark' } });

class Header extends Component {

    render() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static"  >
                    <Toolbar>
                        <Grid container>
                            <Grid item xs={6} sx={{mt: 1}}>
                                <Link href={"/"} underline="none">
                                    <img src={"/assetdash-logo.png"} alt={"AssetDash"}/>
                                </Link>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{ mt: 3, mb: 3, float: 'right'}}>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        );
    }
}

export default Header