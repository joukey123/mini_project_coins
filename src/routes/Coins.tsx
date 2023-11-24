import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import {styled, keyframes } from "styled-components";
import { fetchCoins } from "../Api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { Helmet } from "react-helmet";


const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
`
const Header = styled.header`
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Title = styled.h1`
    display: block;
    width: 33%;
    font-size: 30px;
    text-align: center;
` 
const CoinList = styled.ul`
`

const Coin = styled.li`
    background-color: white;
    color : #1e272e;
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
const Blank = styled.div`
    width: 20%;
`
const DarkMode = styled.div`
    position: relative;
    width: 15%;
    height: 30px;
    border-radius: 15px;
    background-color: ${props=>props.theme.bgDarkBtn};
    cursor: pointer;
`
const Btn = styled.div<{isDark:boolean}>`
    position: absolute;
    top:0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${props=>props.theme.darkBtn};
    transition: left .2s ease-in-out;
    left: ${(props)=>props.isDark ? "30px" : "0px"};
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

    const {isLoading, data} = useQuery<ICoin[]>("allCoins",fetchCoins);
    const isDark = useRecoilValue(isDarkAtom);
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

    return (
        <Container>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header>
                <Blank></Blank>
                <Title>코인</Title>
                <DarkMode onClick={toggleDarkAtom}>
                    <Btn isDark={isDark}></Btn>
                </DarkMode>
            </Header>
            {isLoading ? "Loading..." : 
                <CoinList>
                    {data?.slice(0,100).map((coin)=><Coin key={coin.id}>
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