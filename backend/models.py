from pydantic import BaseModel
from enum import Enum

class PortfolioHoldings(BaseModel):
    ticker: str
    name: str
    type: str
    value: float
    percentage: float

class PortfolioChart(BaseModel):
    stock: float = 0.0
    bonds: float = 0.0
    crypto: float = 0.0
    nft: float = 0.0
    defi: float = 0.0
    real_estate: float = 0.0

class PortfolioChartResponse(BaseModel):
    total_value: float = 0.0
    chart: PortfolioChart

class AssetType(str, Enum):
    crypto = "crypto"
    stock = "stock"
    bonds = "bonds"
    nft = "nft"
    defi = "defi"
    real_estate = "real_estate"