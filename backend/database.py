
ASSET_TYPES = {
    "stock",
    "bond",
    "crypto",
    "nft",
    "defi",
    "real_estate",
}

HOLDINGS = {
    "user_1": {
        "wallet_1": [
            {"asset_id": "asset_1", "amount": 37653},
            {"asset_id": "asset_2", "amount": 746},
            {"asset_id": "asset_4", "amount": 7646},
            {"asset_id": "asset_5", "amount": 7645},
            {"asset_id": "asset_6", "amount": 9834},
            {"asset_id": "asset_7", "amount": 2985},
            {"asset_id": "asset_8", "amount": 35720},
            {"asset_id": "asset_10", "amount": 7258},
            {"asset_id": "asset_11", "amount": 47604},
            {"asset_id": "asset_12", "amount": 5740},
        ],
        "wallet_2": [
            {"asset_id": "asset_1", "amount": 4376},
            {"asset_id": "asset_3", "amount": 7348},
            {"asset_id": "asset_4", "amount": 75804},
            {"asset_id": "asset_5", "amount": 57803},
            {"asset_id": "asset_6", "amount": 40387},
            {"asset_id": "asset_7", "amount": 75804},
            {"asset_id": "asset_8", "amount": 57890},
            {"asset_id": "asset_9", "amount": 57403},
            {"asset_id": "asset_11", "amount": 58034},
            {"asset_id": "asset_12", "amount": 47634},
        ],
        "wallet_3": [
            {"asset_id": "asset_2", "amount": 2453},
            {"asset_id": "asset_3", "amount": 87553},
            {"asset_id": "asset_4", "amount": 34433},
            {"asset_id": "asset_5", "amount": 75843},
            {"asset_id": "asset_6", "amount": 27504},
            {"asset_id": "asset_7", "amount": 47820},
            {"asset_id": "asset_8", "amount": 47582},
            {"asset_id": "asset_9", "amount": 89764},
            {"asset_id": "asset_10", "amount": 2323},
            {"asset_id": "asset_12", "amount": 75496},
        ]
    },
    "user_2": {
        "wallet_4": [
            {"asset_id": "asset_1", "amount": 8553},
            {"asset_id": "asset_3", "amount": 234},
            {"asset_id": "asset_4", "amount": 764},
            {"asset_id": "asset_5", "amount": 235},
            {"asset_id": "asset_6", "amount": 764},
            {"asset_id": "asset_7", "amount": 689450},
            {"asset_id": "asset_8", "amount": 86034},
            {"asset_id": "asset_9", "amount": 578340},
            {"asset_id": "asset_11", "amount": 6839},
            {"asset_id": "asset_12", "amount": 5740},
        ],
        "wallet_5": [
            {"asset_id": "asset_2", "amount": 68930},
            {"asset_id": "asset_3", "amount": 70695},
            {"asset_id": "asset_4", "amount": 69504},
            {"asset_id": "asset_5", "amount": 1247},
            {"asset_id": "asset_6", "amount": 239857},
            {"asset_id": "asset_7", "amount": 275},
            {"asset_id": "asset_8", "amount": 63087},
            {"asset_id": "asset_9", "amount": 543},
            {"asset_id": "asset_10", "amount": 690458},
            {"asset_id": "asset_12", "amount": 68309},
        ],
        "wallet_6": [
            {"asset_id": "asset_1", "amount": 578934},
            {"asset_id": "asset_2", "amount": 2453},
            {"asset_id": "asset_3", "amount": 653},
            {"asset_id": "asset_4", "amount": 635},
            {"asset_id": "asset_5", "amount": 65873},
            {"asset_id": "asset_8", "amount": 5783},
            {"asset_id": "asset_9", "amount": 5784},
            {"asset_id": "asset_10", "amount": 876},
            {"asset_id": "asset_11", "amount": 325},
            {"asset_id": "asset_12", "amount": 765},
        ]
    }
}

ASSETS = {
    "asset_1": {
        "ticker": "BTC",
        "name": "Bitcoin",
        "type": "crypto"
    },
    "asset_2": {
        "ticker": "ETH",
        "name": "Ethereum",
        "type": "crypto"
    },
    "asset_3": {
        "ticker": "AAPL",
        "name": "Apple",
        "type": "stock"
    },
    "asset_4": {
        "ticker": "TSLA",
        "name": "Tesla",
        "type": "stock"
    },
    "asset_5": {
        "ticker": "10YR",
        "name": "10 Year Bond",
        "type": "bonds"
    },
    "asset_6": {
        "ticker": "20YR",
        "name": "20 Year Bond",
        "type": "bonds"
    },
    "asset_7": {
        "ticker": "BAYC",
        "name": "Bored Ape Yacht Club",
        "type": "nft"
    },
    "asset_8": {
        "ticker": "SMB",
        "name": "Solana Monkey Business",
        "type": "nft"
    },
    "asset_9": {
        "ticker": "JOE",
        "name": "Trader Joe",
        "type": "defi"
    },
    "asset_10": {
        "ticker": "OHM",
        "name": "Olympus",
        "type": "defi"
    },
    "asset_11": {
        "ticker": "FUNDRISE",
        "name": "Fundrise",
        "type": "real_estate"
    },
    "asset_12": {
        "ticker": "CONCREIT",
        "name": "Concreit",
        "type": "real_estate"
    }
}