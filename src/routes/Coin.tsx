import { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";


const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
`
const Header = styled.header`
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Title = styled.h1`
    font-size: 30px;
    text-align: center;
` 

const Overview = styled.div`
    display : flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0,0,0,0.4);
    padding: 30px 20px;
    border-radius: 15px;
`
const OvierviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    span:first-child {
        font-size: 12px;
        margin-bottom: 10px;
    }
    span:last-child {
        font-weight: bold;
    }
`
const Description = styled.p`
    margin: 25px 0;
    line-height: 20px;
    padding: 0 10px;
` 

const Taps = styled.div`
    display: grid;
    grid-template-columns: repeat(2,auto);
    column-gap: 20px;
`
const Tap = styled.div`
    background-color: rgba(0,0,0,0.4);
    a{
        display: flex;
        justify-content: center;
        padding: 15px 20px;
    }
    border-radius: 15px;
    margin: 25px 0;
`

interface IParams{
    coinId: string;
}
interface ILocation{
    name:string;
}

interface Iinfo {
    id : string;
    name : string;
    symbol : string;
    rank : number;
    is_new : boolean;
    is_active : boolean;
    type : string;
    logo : string;
    description : string;
    message : string;
    open_source : boolean;
    started_at : string;
    development_status : string;
    hardware_wallet : boolean;
    proof_type : string;
    org_structure : string;
    hash_algorithm : string;
    first_data_at : string;
    last_data_at : string;
}

interface ITickers {
    id : string;
    name : string;
    symbol : string;
    rank : number;
    circulating_supply : number;
    total_supply : number;
    max_supply : number;
    beta_value : number;
    first_data_at : string;
    last_updated : string;
    quotes : {
        USD : {
            ath_date : string;
            ath_price : number;
            market_cap : number;
            market_cap_change_24h : number;
            percent_change_1h : number;
            percent_change_1y : number;
            percent_change_6h : number;
            percent_change_7d : number;
            percent_change_12h : number;
            percent_change_15m : number;
            percent_change_24h : number;
            percent_change_30d : number;
            percent_change_30m : number;
            percent_from_price_ath : number;
            price : number;
            volume_24h : number;
            volume_24h_change_24h : number;
        }
    };
}

function Coin() {
    const {coinId} = useParams<IParams>();
    const [info, setInfo] = useState<Iinfo>();
    const [priceInfo, setPriceInfo] = useState<ITickers>();

    const [isLoading, setIsLoading] = useState(true);
    const { state } = useLocation<ILocation>();


    useEffect(()=>{
        (async ()=>{
            const infoResponse = await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`);
            const infoJson = await infoResponse.json();
            const priceresponse = await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
            const priceJson = await priceresponse.json();
            setInfo(infoJson)
            setPriceInfo(priceJson) 
            setIsLoading(false);   
            })();

    },[])
    return (
         <Container>
            <Header>
                <Title>{state?.name ? state.name : isLoading ? "Loading..." : info?.name  }</Title>
            </Header>
            {isLoading ? "Loading..." : 
                <>
                <Overview>
                    <OvierviewItem>
                        <span>Rank:</span>
                        <span>{info?.rank}</span>
                    </OvierviewItem>
                    <OvierviewItem>
                        <span>Symbol:</span>
                        <span>$ {info?.symbol}</span>
                    </OvierviewItem>
                    <OvierviewItem>
                        <span>Price:</span>
                        <span>$ {priceInfo?.quotes.USD.price.toFixed(3)}</span>
                    </OvierviewItem>
                </Overview>
                <Description>
                    {info?.description}
                </Description>
                <Overview>
                    <OvierviewItem>
                        <span>Total Supply:</span>
                        <span>{priceInfo?.total_supply}</span>
                    </OvierviewItem>
                    <OvierviewItem>
                        <span>Max Supply:</span>
                        <span>{priceInfo?.max_supply}</span>
                    </OvierviewItem>
                </Overview>
                <Taps>
                    <Tap><Link to={`/${coinId}/chart`}> Chart</Link></Tap>
                    <Tap><Link to={`/${coinId}/price`}> Price</Link></Tap>
                </Taps>
                <Switch>
                    <Route path={`/${coinId}/chart`}>
                        <Chart />
                    </Route>
                    <Route path={`/${coinId}/price`}>
                        <Price />
                    </Route>
                </Switch>
                </>
            }
        </Container>
    )
}

export default Coin;