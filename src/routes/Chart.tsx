import { useQuery } from "react-query";
import { fetchCoinHistoy } from "../Api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
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

function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IChart[]>(["chart",coinId],()=>fetchCoinHistoy(coinId),{
        refetchInterval: 5000,
    });

    const isDark = useRecoilValue(isDarkAtom);

    return (
    <div>
       {isLoading ? "Loading..." : 
        <ApexChart 
            type="candlestick"
            series={[
              {
                data: data && data?.map((data) => ({
                    x: new Date(data.time_close*1000).toISOString(),
                    y:[data.open,data.high,data.low,data.close]
                }))
              }   
            ] as any}
            options={{
                chart: {
                    width: 300,
                    height: 300,
                    background: "transparent",
                    toolbar: {
                        show: false,
                    }
                },
                grid: {
                    show: false
                },
                theme: {
                    mode: isDark ? "dark" : "light"
                },
                xaxis: {
                    type: "datetime"
                },
                yaxis: {
                    show:false,
                },
                plotOptions: {
                    candlestick: {
                        colors: {
                            upward: "#f53b57",
                            downward: "#3C90EB"
                        },
                        wick: {
                            useFillColor: true
                        }
    
                    }
                },
            }}
            
        />
       } 
    </div>
    )   

}

export default Chart;