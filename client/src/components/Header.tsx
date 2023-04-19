import { Typography, Box, useTheme } from '@mui/material';

export const Header = ( {title, subtitle}: any) => {
    const theme: any = useTheme();
    return (
        <Box>
            <Typography
                variant='h2'
                color={theme.palette.secondary[100]}
                fontWeight='bold'
                sx={{ mb: '5px' }}
            >
                {title}
            </Typography>
            <Typography
                variant='h5'
                color={theme.palette.secondary[300]}
            >
                {subtitle}
            </Typography>
        </Box>
    );
}