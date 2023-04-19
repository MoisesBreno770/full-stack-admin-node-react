import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from './FlexBetween';

export const StatBox = ({ title, value, increase, icon, description }: any): JSX.Element => {
    const theme: any = useTheme();

    return (
        <Box
            gridColumn="span 2"
            gridRow="span 1"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p="1.25rem 1rem"
            flex="1 1 100%"
            borderRadius='0.55rem'
            bgcolor={theme.palette.background.alt}
        >
          <FlexBetween>
            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
              {title}
            </Typography>
            {icon}
          </FlexBetween>
    
          <Typography
            variant="h3"
            fontWeight="600"
            sx={{ color: theme.palette.secondary[200] }}
          >
            {value}
          </Typography>
          <FlexBetween gap="1rem">
            <Typography
              variant="h5"
              fontStyle="italic"
              sx={{ color: theme.palette.secondary.light }}
            >
              {increase}
            </Typography>
            <Typography>{description}</Typography>
          </FlexBetween>
        </Box>
      );
}