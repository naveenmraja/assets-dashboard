from fastapi import FastAPI
from typing import TypeAlias
import uvicorn
from database import *
import itertools
from models import *
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Asset: TypeAlias = dict[str, str]
UserAsset: TypeAlias = dict
UserAssets: TypeAlias = list[UserAsset]     ## All user assets
UserWallet: TypeAlias = list[UserAsset]     ## User assets in a particular wallet
UserHoldings: TypeAlias = dict[str, UserWallet]

def get_user_assets(user_id: str) -> UserAssets:
    user_holdings: UserHoldings = HOLDINGS.get(user_id)
    return list(itertools.chain.from_iterable(user_holdings.values()))

@app.get("/portfolio-chart", response_model=PortfolioChartResponse)
def read_portfolio_chart(user_id: str):

    if user_id not in HOLDINGS:
        return {"chart" : {}}
    user_assets: UserAssets = get_user_assets(user_id)
    assets_value: dict = {}
    total_value: float = 0
    for user_asset in user_assets :
        asset_id: str = user_asset["asset_id"]
        amount: float = user_asset["amount"]
        total_value += amount
        asset_type = ASSETS[asset_id]["type"]
        assets_value[asset_type] = assets_value.get(asset_type, 0) + amount
    assets_percentage: dict = {key: round((value/total_value)*100, 2) for (key, value) in assets_value.items()}
    return {"total_value" : total_value, "chart": assets_percentage}

@app.get("/portfolio-holdings", response_model=list[PortfolioHoldings])
def read_portfolio_holdings(user_id: str, asset_type: AssetType = None):

    if user_id not in HOLDINGS:
        return []
    user_assets: UserAssets = get_user_assets(user_id)
    total_value: float = 0
    holdings: list = []
    assets_value: dict = {}
    for user_asset in user_assets:
        asset_id: str = user_asset["asset_id"]
        amount: float = user_asset["amount"]
        asset: Asset = ASSETS[asset_id]
        total_value += amount
        if asset_type is None or asset_type.value == asset["type"]:
            assets_value[asset_id] = assets_value.get(asset_id, 0) + amount
    for asset_id in assets_value:
        value : float = assets_value[asset_id]
        asset: Asset = ASSETS[asset_id]
        holdings.append({
            "ticker": asset["ticker"],
            "name": asset["name"],
            "type": asset["type"],
            "value": value,
            "percentage": round((value/total_value)*100, 2)
        })
    holdings.sort(key=lambda x: x["value"], reverse=True)
    return holdings

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=5000, log_level="info")
