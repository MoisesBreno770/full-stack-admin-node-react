import { useMemo, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { Header } from '../../components/Header';
import { useGetSalesQuery } from '../../state/api';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ResponsiveLine } from '@nivo/line';

export const Daily = () => {
    const [startDate, setStartDate]: any = useState(new Date('2021-02-01'));
    const [endDate, setEndDate]: any = useState(new Date('2021-03-01'));
    const { data }: any = useGetSalesQuery();
    const theme: any = useTheme();

    const [formattedData]: any = useMemo(() => {
        if (!data) return [];

        const { dailyData } = data;
        const totalSalesLine: any = {
            id: "totalSales",
            color: theme.palette.secondary.main,
            data: [],
        };
        const totalUnitsLine: any = {
            id: "totalUnits",
            color: theme.palette.secondary[600],
            data: [],
        };


        Object.values(dailyData).forEach(({date, totalSales, totalUnits}: any) => {
            const dateFormatted: any = new Date(date);
            if (dateFormatted >= startDate && dateFormatted <= endDate) {
                const splitDate: any = date.substring(date.indexOf("-") + 1);

                totalSalesLine.data = [
                    ...totalSalesLine.data,
                    { x: splitDate, y: totalSales },
                ];
                totalUnitsLine.data = [
                    ...totalUnitsLine.data,
                    { x: splitDate, y: totalUnits },
                ];
            }
        });
 
        const formattedData: any = [totalSalesLine, totalUnitsLine];
        return [formattedData];
    }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

    return <Box m='1.5rem 2.5rem'>
        <Header title='DAILY SALES' subtitle='Chart of daily sales'></Header>
        <Box height='75vh'>
            <Box display='flex' justifyContent='flex-end'>
                <Box>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: any) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    >
                    </DatePicker>
                </Box>
                <Box>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: any) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    >
                    </DatePicker>
                </Box>
            </Box>

            {data ? (
                <ResponsiveLine
                    data={formattedData}
                    theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: theme.palette.secondary[200],
                                },
                            },
                            legend: {
                                text: {
                                    fill: theme.palette.secondary[200],
                                },
                            },
                            ticks: {
                                line: {
                                    stroke: theme.palette.secondary[200],
                                    strokeWidth: 1,
                                },
                                text: {
                                    fill: theme.palette.secondary[200],
                                },
                            },
                        },
                        legends: {
                            text: {
                                fill: theme.palette.secondary[200],
                            },
                        },
                        tooltip: {
                            container: {
                                color: theme.palette.primary.main,
                            },
                        },
                    }}
                    colors={{ datum: 'color' }}
                    margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                    xScale={{ type: "point" }}
                    yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        stacked: false,
                        reverse: false,
                    }}
                    yFormat=" >-.2f"
                    curve="catmullRom"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Month",
                        legendOffset: 60,
                        legendPosition: "middle",
                    }}
                    axisLeft={{
                        tickValues: 5,
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Total',
                        legendOffset: -50,
                        legendPosition: "middle",
                    }}
                    enableGridX={false}
                    enableGridY={false}
                    pointSize={10}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: "top-right",
                            direction: "column",
                            justify: false,
                            translateX: 50,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: "left-to-right",
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemBackground: "rgba(0, 0, 0, .03)",
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        }
                    ]
                    }
                />
            ) : <>Loading...</>}
        </Box>
    </Box>
}