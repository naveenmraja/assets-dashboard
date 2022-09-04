import {Component} from "react";
import {
    Card,
    CardContent,
    CssBaseline,
    FormControl,
    Grid,
    InputAdornment,
    Paper,
    TextField, Typography
} from "@mui/material";
import Loader from "../components/Loader";
import * as React from "react";
import {connect} from "react-redux";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {styled} from "@mui/styles";
import {SearchRounded} from "@mui/icons-material";
import {
    setAssetType, setHoveredChartIndex, setSelectedChartIndex, showLoader,
    updatePortfolioChart,
    updatePortfolioHoldings,
    updateTablePage,
    updateUserId
} from "../features/dashboardSlice";
import PortfolioChart from "../components/PortfolioChart";
import PortfolioHoldings from "../components/PortfolioHoldings";

function mapStateToProps(state) {
    return {
        user : state.dashboard.user,
        ui: state.dashboard.ui,
        holdings : state.dashboard.user.portfolio.holdings
    }
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary
}))

const theme = createTheme({palette: { mode: 'dark'}});

class DashboardView extends Component {

    componentDidMount() {
        this.updatePortfolio()
    }

    updatePortfolio = () => {
        this.props.dispatch(showLoader())
        this.props.dispatch(updatePortfolioChart(this.props.user.id))
        const request = {
            user_id: this.props.user.id
        }
        this.props.dispatch(updatePortfolioHoldings(request))
    }

    handleTextInput = (event) => {
        this.props.dispatch(updateUserId(event.target.value))
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            this.props.dispatch(setAssetType("all"))
            this.props.dispatch(updateTablePage(0))
            this.props.dispatch(setSelectedChartIndex(undefined))
            this.props.dispatch(setHoveredChartIndex(undefined))
            this.updatePortfolio()
        }
    }

    render() {
        const bannerStyle = {
            maxWidth: "100%",
            backgroundColor: this.props.color ? this.props.color : "#f07558",
            paddingBotttom: "0px",
            margin: "auto",
            width: "fit-content"
        }
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Loader showLoader={this.props.ui.chartLoader && this.props.ui.holdingsLoader}/>
                <Grid container
                      spacing={2}
                      alignItems="center"
                      justify="center"
                      direction="row" sx={{height: "85vh", margin: "auto", width: "100%"}}>
                    <Grid item xs={1} md={1} />
                    <Grid item xs={5} md={5} sx={{height: "10%"}}>
                    </Grid>
                    <Grid item xs={5} md={5} sx={{height: "10%"}}>
                        <FormControl sx={{ float: 'right'}}>
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
                                       size={"small"}
                                       placeholder={"Search by user id"} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={1} md={1} />
                    <Grid item xs={1} md={1} />
                    <Grid item xs={10} md={10} sx={{height: "100%"}}>
                        <StyledPaper sx={{height: "90%", padding: "3%", overflow: "scroll"}}>
                            {(this.props.ui.showNoHoldings) ? (
                                <Card raised sx={bannerStyle}>
                                    <CardContent >
                                        <Typography component={'span'}>
                                            No investments to display. Please link your accounts to view your investments.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Grid container sx={{height: "100%", margin: "auto"}}>
                                    <Grid item xs={12} md={4} sx={{height: "100%"}}>
                                        <PortfolioChart/>
                                    </Grid>
                                    <Grid item xs={12} md={8} sx={{height: "100%"}}>
                                        <PortfolioHoldings />
                                    </Grid>
                                </Grid>
                            )}
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={1} md={1} />
                </Grid>
            </ThemeProvider>
        )
    }
}

export default connect(mapStateToProps)(DashboardView)