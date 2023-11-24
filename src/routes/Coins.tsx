import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


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
const CoinList = styled.ul`
`

const Coin = styled.li`
    background-color: white;
    color : ${props => props.theme.bgColor};
    margin-bottom: 10px;
    border-radius: 10px;
    a{
        padding: 20px;
        transition: color .3s ease-in-out;
        display: flex;
        align-items: center;
        &:hover {
            color: ${props => props.theme.accentColor};
        }
    }
`
const Img = styled.img`
    width: 30px;
    margin-right: 10px;

`
interface ICoin {
    id: string,
    name: string,
    symbol:string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}


function Coins() { 

    const [coins, setCoins] = useState<ICoin[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        (async () => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0,100));
            setIsLoading(current => !current);
        })();
    },[]);

    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {isLoading ? "Loading..." : 
                <CoinList>
                    {coins.map((coin)=><Coin key={coin.id}>
                        <Link to={
                            {
                                pathname:`/${coin.id}`,
                                state: {name : coin.name},
                            }}>
                            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                            {coin.name} &rarr; </Link></Coin>)}
                </CoinList> 
            }

          
        </Container>
    )
}

export default Coins;