import { Box } from '@mui/material';
import { Header } from '../../components/Header'; 
import { BreakdownChart } from '../../components/BreakdownChart';

export const Breakdown = () => {
    return <Box m='1.5rem 2.5rem'>
        <Header title='BREAKDOWN' subtitle='Breakdown of Sales By Category'></Header>
        <Box mt='40px' height='75vh'>
            <BreakdownChart></BreakdownChart>
        </Box>
    </Box>
}