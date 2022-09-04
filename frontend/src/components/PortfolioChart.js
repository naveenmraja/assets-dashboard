import {Component} from "react";
import {Alert, Grid, Skeleton, Snackbar, Typography} from "@mui/material";
import {PieChart} from "react-minimal-pie-chart";
import * as React from "react";
import {connect} from "react-redux";
import {
    hideChartSnackbar,
    setAssetType,
    setHoveredChartIndex,
    setSelectedChartIndex,
    updatePortfolioHoldings, updateTablePage
} from "../features/dashboardSlice";
import {ASSET_TYPE_CHART_COLOR, ASSET_TYPE_LABEL} from "../utils/Constants";

function mapStateToProps(state) {
    return {
        user : state.dashboard.user,
        chart : state.dashboard.user.portfolio.chart,
        totalValue: state.dashboard.user.portfolio.totalValue,
        ui: state.dashboard.ui
    }
}

class PortfolioChart extends Component {

    getChartData = () => {
        let chartData = []
        for(const assetType in this.props.chart) {
            if(this.props.chart[assetType] > 0) {
                const assetChartData = {
                    title: ASSET_TYPE_LABEL[assetType],
                    value: (this.props.chart[assetType]/100)*this.props.totalValue,
                    color : ASSET_TYPE_CHART_COLOR[assetType],
                    assetType : assetType
                }
                chartData.push(assetChartData)
            }
        }
        return chartData
    }

    handleSegmentSelection = (chartData, index) => {
        const request = {
            user_id: this.props.user.id
        }
        if(index === this.props.ui.selectedChartIndex) {
            this.props.dispatch(setAssetType("all"))
            this.props.dispatch(setSelectedChartIndex(undefined))
        } else {
            this.props.dispatch(setAssetType(chartData.assetType))
            this.props.dispatch(setSelectedChartIndex(index))
            request["asset_type"] = chartData.assetType
        }
        this.props.dispatch(updateTablePage(0))
        this.props.dispatch(updatePortfolioHoldings(request))
    }

    formatAmount = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    closeChartSnackbar = () => {
        this.props.dispatch(hideChartSnackbar())
    }

    render() {
        const lineWidth = 60
        const chartData = this.getChartData().map((entry, i) => {
            if (this.props.ui.hoveredChartIndex === i) {
                return {
                    ...entry,
                    color: 'grey',
                };
            }
            return entry;
        });
        return (
            <Grid container
                  alignItems="center"
                  justify="center" sx={{height: "100%", margin: "auto"}}>
                <Snackbar open={this.props.ui.showHoldingsSnackbar} autoHideDuration={5000} onClose={this.closeChartSnackbar}>
                    <Alert onClose={this.closeChartSnackbar} severity="error" sx={{ width: '100%' }}>
                        Error occurred while fetching portfolio holdings !
                    </Alert>
                </Snackbar>
                <Grid item sx={{width: "100%", height: "10%"}}>
                    <Typography variant="h5" textAlign={"center"}>
                        <b>{"Portfolio Chart"}</b>
                    </Typography>
                </Grid>
                <Grid item sx={{ width: "100%", height: "80%"}}>
                    {this.props.ui.chartLoader ? (
                        <Skeleton variant="circular" width={"90%"} height={"90%"} sx={{margin: "auto"}}/>
                    ) : (
                        <PieChart
                        style={{
                            fontFamily:
                                '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                            fontSize: '4px',
                        }}
                        data={chartData}
                        radius={PieChart.defaultProps.radius - 7}
                        lineWidth={60}
                        segmentsStyle={{ transition: 'stroke .4s', cursor: 'pointer' }}
                        segmentsShift={(index) => (index === this.props.ui.selectedChartIndex ? 6 : 1)}
                        animate
                        label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
                        labelPosition={100 - lineWidth / 2}
                        labelStyle={{
                            fill: '#fff',
                            opacity: 0.75,
                            pointerEvents: 'none',
                        }}
                        onClick={(e, index) => {
                            this.handleSegmentSelection(chartData[index], index)
                        }}
                        onMouseOver={(_, index) => {
                            this.props.dispatch(setHoveredChartIndex(index));
                        }}
                        onMouseOut={() => {
                            this.props.dispatch(setHoveredChartIndex(undefined));
                        }}
                    />
                    )}
                </Grid>
                <Grid item sx={{height: "10%", width: "100%"}}>
                    {this.props.ui.chartLoader ? (
                            <Skeleton variant="rounded" width={"90%"} height={"100%"} sx={{margin: "auto"}}/>
                        ) : (
                        <Typography variant={"h5"} color={"success.main"} textAlign={"center"}>
                            <b>$ {this.formatAmount(this.props.totalValue)}</b>
                        </Typography>
                    )}
                </Grid>
            </Grid>
        );
    }
}

export default connect(mapStateToProps)(PortfolioChart)