

import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistoy } from "../Api";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface PriceProps {
    coinId: string;
}
interface IChart {
    time_open: number ;
    time_close: number ;
    open: string ;
    high: string ;
    low: string ;
    close: string ;
    volume: string ;
    market_cap: number ;
}


function Price({coinId}:PriceProps) {
    const { isLoading, data } = useQuery<IChart[]>(["chart",coinId],()=>fetchCoinHistoy(coinId));
    const isDark = useRecoilValue(isDarkAtom);

    return (
        <div>
            {isLoading ? "Loading..." : 
            
            <ApexChart 
                type="line"
                series={[
                    {
                        name:"high-Price",
                        data: data?.map(price => price.high) as [],
                    },
                    {
                        name:"low-Price",
                        data: data?.map(price => price.low) as [],
                    },
            
                ]}
                options={{
                    chart:{
                        width:300,
                        height:300,
                        toolbar: {
                            show: false
                        },
                        background: "transparent",
                    },
                    theme: {
                        mode: isDark ? "dark" : "light"
                    },
                    grid: {
                        show: false
                    },
                    xaxis: {
                        labels: {
                            show: false
                        },
                        type: "datetime",
                        categories: data?.map((price)=>new Date(price.time_close*1000).toISOString())
                    },
                    yaxis: {
                        show:false
                    }


                }}
                
            
            
            />}
        </div>
    )
}

export default Price;