import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getPortfolioChart, getPortfolioHoldings} from "./dashboardAPI";

const initialState = {
    user : {
        id : "",
        portfolio : {
            totalValue: 0,
            chart : {},
            holdings : []
        }
    },
    ui : {
        showLoader : false,
        assetType : "all",
        selectedChartIndex : undefined,
        hoveredChartIndex : undefined,
        chartLoader : false,
        holdingsLoader : false,
        showHoldingsSnackbar : false,
        showChartSnackbar : false,
        showNoHoldings : false,
        assetTypeToIndexMap : {},
        tablePage: 0,
        rowsPerPage: 5
    }
}

export const updatePortfolioChart = createAsyncThunk(
    'dashboard/chart',
    async (userId) => {
        const response = await getPortfolioChart({ user_id: userId });
        if(response.ok) {
            const chartData = await response.json()
            return chartData
        } else {
            return {errorMessage : response.errorMessage ? response.errorMessage : response.status}
        }
    }
)

export const updatePortfolioHoldings = createAsyncThunk(
    'dashboard/holdings',
    async (request) => {
        const response = await getPortfolioHoldings(request);
        if(response.ok) {
            const holdings = await response.json()
            return {holdings : holdings}
        } else {
            return {errorMessage : response.errorMessage ? response.errorMessage : response.status}
        }
    }
)

export const dashboardSlice = createSlice({
    name : "dashboard",
    initialState,
    reducers : {
        updateUserId : (state, action) => {
            state.user.id = action.payload
        },
        showLoader : (state) => {
            state.ui.chartLoader = true
            state.ui.holdingsLoader = true
        },
        hideLoader : (state) => {
            state.ui.chartLoader = false
            state.ui.holdingsLoader = false
        },
        hideHoldingsSnackbar: (state) => {
            state.ui.showHoldingsSnackbar = false
        },
        hideChartSnackbar: (state) => {
            state.ui.showChartSnackbar = false
        },
        setSelectedChartIndex: (state, action) => {
            state.ui.selectedChartIndex = action.payload
        },
        setHoveredChartIndex : (state, action) => {
            state.ui.hoveredChartIndex = action.payload
        },
        setAssetType: (state, action) => {
            state.ui.assetType = action.payload
        },
        updateRowsPerPage: (state, action) => {
            state.ui.rowsPerPage = action.payload
        },
        updateTablePage: (state, action) => {
            state.ui.tablePage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updatePortfolioChart.fulfilled, (state, action) => {
                const response = action.payload
                if("chart" in response) {
                    state.user.portfolio.totalValue = response.total_value
                    state.user.portfolio.chart = response.chart
                    let assetTypeToIndexMap = {}
                    let index = 0
                    for(const assetType in response.chart) {
                        if(response.chart[assetType] > 0) {
                            assetTypeToIndexMap[assetType] = index ++
                        }
                    }
                    state.ui.assetTypeToIndexMap = assetTypeToIndexMap
                } else {
                    state.ui.showChartSnackbar = false
                    state.ui.showChartSnackbar = true
                }
                state.ui.chartLoader = false
            })
            .addCase(updatePortfolioChart.rejected, (state, action) => {
                state.ui.showChartSnackbar = false
                state.ui.showChartSnackbar = true
                state.ui.chartLoader = false
            })
            .addCase(updatePortfolioHoldings.fulfilled, (state, action) => {
                const response = action.payload
                if("holdings" in response) {
                    state.user.portfolio.holdings = action.payload.holdings
                    if(action.payload.holdings.length === 0) {
                        state.ui.showNoHoldings = true
                    } else {
                        state.ui.showNoHoldings = false
                    }
                } else {
                    state.ui.showChartSnackbar = false
                    state.ui.showHoldingsSnackbar = true
                }
                state.ui.holdingsLoader = false
            })
            .addCase(updatePortfolioHoldings.rejected, (state, action) => {
                state.ui.showChartSnackbar = false
                state.ui.showHoldingsSnackbar = true
                state.ui.holdingsLoader = false
            })
    }
})

export const { updateUserId, showLoader, setSelectedChartIndex, setHoveredChartIndex,
    setAssetType, updateRowsPerPage, updateTablePage,hideHoldingsSnackbar, hideChartSnackbar } = dashboardSlice.actions

export default dashboardSlice.reducer