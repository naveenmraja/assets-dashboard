const GET_PORTFOLIO_CHART_URL = "http://localhost:5000/portfolio-chart?"
const GET_PORTFOLIO_HOLDINGS_URL = "http://localhost:5000/portfolio-holdings?"

export function getPortfolioChart(params) {
    return fetch(GET_PORTFOLIO_CHART_URL + new URLSearchParams(params))
}

export function getPortfolioHoldings(params) {
    return fetch(GET_PORTFOLIO_HOLDINGS_URL + new URLSearchParams(params))
}