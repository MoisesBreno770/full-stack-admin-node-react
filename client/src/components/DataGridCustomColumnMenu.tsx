import { GridColumnMenuContainer, GridFilterMenuItem, HideGridColMenuItem } from "@mui/x-data-grid";

export const CustomColumnMenu = (props: any) => {
    const { hideMenu, currentColumn, open} = props;

    return (
        <GridColumnMenuContainer
            hideMenu={hideMenu}
            currentColumn={currentColumn}
            open={open}
        >
            <GridFilterMenuItem onClick={hideMenu} column={currentColumn}></GridFilterMenuItem>
            <HideGridColMenuItem onClick={hideMenu} column={currentColumn}></HideGridColMenuItem>
        </GridColumnMenuContainer>
    );
}