export async function fetchCoins() {
    const response = await fetch("https://api.coinpaprika.com/v1/coins");
    const json = await response.json();
    return json;
}

export async function fetchCoinInfo(coinId:string) {
    const response = await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`);
    const json = await response.json();
    return json;
}

export async function fetchCoinTickers(coinId:string) {
    const response = await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
    const json = await response.json();
    return json;
}

export async function fetchCoinHistoy(coinId:string) {
    const response = await fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`);
    const json = await response.json();
    return json;
}
