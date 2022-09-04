import {Component} from "react";
import {
    Alert,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select, Skeleton, Snackbar,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TablePagination, TableRow,
    Typography
} from "@mui/material";
import * as React from "react";
import {connect} from "react-redux";
import {
    hideHoldingsSnackbar,
    setAssetType, setSelectedChartIndex,
    updatePortfolioHoldings,
    updateRowsPerPage,
    updateTablePage
} from "../features/dashboardSlice";

function mapStateToProps(state) {
    return {
        user : state.dashboard.user,
        holdings: state.dashboard.user.portfolio.holdings,
        ui: state.dashboard.ui
    }
}

class PortfolioHoldings extends Component {

    handleChangePage = (event, newPage) => {
        this.props.dispatch(updateTablePage(newPage))
    }

    handleChangeRowsPerPage = (event) => {
        this.props.dispatch(updateRowsPerPage(parseInt(event.target.value, 10)))
        this.props.dispatch(updateTablePage(0))
    }

    formatAmount = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    handleAssetTypeSelection = (event) => {
        const assetType = event.target.value
        const assetTypeToIndexMap = this.props.ui.assetTypeToIndexMap
        const chartIndex = (assetType in assetTypeToIndexMap) ? assetTypeToIndexMap[assetType] : undefined
        this.props.dispatch(setSelectedChartIndex(chartIndex))
        this.props.dispatch(setAssetType(assetType))
        const request = {
            user_id: this.props.user.id
        }
        if(event.target.value !== "all") {
            request["asset_type"] = assetType
        }
        this.props.dispatch(updateTablePage(0))
        this.props.dispatch(updatePortfolioHoldings(request))
    }

    closeHoldingsSnackbar = () => {
        this.props.dispatch(hideHoldingsSnackbar())
    }

    render() {
        const rowsPerPage = this.props.ui.rowsPerPage
        const tablePage = this.props.ui.tablePage

        return(
            <Grid container
                  alignItems="center"
                  justify="center" sx={{height: "100%"}}>
                <Snackbar open={this.props.ui.showHoldingsSnackbar} autoHideDuration={5000} onClose={this.closeHoldingsSnackbar}>
                    <Alert onClose={this.closeHoldingsSnackbar} severity="error" sx={{ width: '100%' }}>
                        Error occurred while fetching portfolio holdings !
                    </Alert>
                </Snackbar>
                <Grid item xs={12} md={8} sx={{height: "10%", float: "left"}}>
                    <Typography variant="h5" textAlign={"center"}>
                        <b>{"Portfolio Holdings"}</b>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={{height: "10%"}} >
                    <FormControl size={"small"} fullWidth sx={{float: "right"}}>
                        <InputLabel>Asset Type</InputLabel>
                        <Select
                            value={this.props.ui.assetType}
                            label="Asset Type"
                            onChange={this.handleAssetTypeSelection}
                        >
                            <MenuItem value={"all"}>All</MenuItem>
                            <MenuItem value={"crypto"}>Crypto</MenuItem>
                            <MenuItem value={"bonds"}>Bonds</MenuItem>
                            <MenuItem value={"stock"}>Stocks</MenuItem>
                            <MenuItem value={"nft"}>NFT</MenuItem>
                            <MenuItem value={"defi"}>DeFi</MenuItem>
                            <MenuItem value={"real_estate"}>RealEstate</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sx={{height: "90%", width: "100%"}}>
                    {this.props.ui.holdingsLoader ?
                        (<Skeleton variant="rounded" width={"100%"} height={"100%"} />) :
                        (
                        <Paper sx={{height: "100%", width: "100%", overflow: "hidden"}} elevation={12} >
                            <TableContainer sx={{height: "80%"}}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="right">Ticker</TableCell>
                                            <TableCell align="right">% Holding</TableCell>
                                            <TableCell align="right">Amount ($)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rowsPerPage > 0
                                                ? this.props.holdings.slice(tablePage * rowsPerPage, tablePage * rowsPerPage + rowsPerPage)
                                                : this.props.holdings
                                        ).map((userAsset) => (
                                            <TableRow key={userAsset.name} hover role="checkbox" tabIndex={-1} >
                                                <TableCell component="th" scope="row">
                                                    {userAsset.name}
                                                </TableCell>
                                                <TableCell align="right">{userAsset.ticker}</TableCell>
                                                <TableCell align="right">{userAsset.percentage}%</TableCell>
                                                <TableCell align="right">$ {this.formatAmount(userAsset.value)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={this.props.holdings.length}
                                rowsPerPage={rowsPerPage}
                                page={tablePage}
                                onPageChange={this.handleChangePage}
                                onRowsPerPageChange={this.handleChangeRowsPerPage}
                            />
                        </Paper>
                    )}
                </Grid>
            </Grid>
        )
    }
}

export default connect(mapStateToProps)(PortfolioHoldings)