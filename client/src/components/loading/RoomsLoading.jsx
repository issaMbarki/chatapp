import { Grid, Skeleton, Stack, useTheme } from "@mui/material";

export const RoomsLoading = ({ contentHeight }) => {
  const theme = useTheme();
  return (
    <Grid item xs={12} sm={4}>
      <Stack
        spacing={1}
        sx={{
          height: contentHeight,
          overflow: "auto",
          borderRadius: 1,
          boxShadow: 1,
          backgroundColor: theme.palette.listBackGround.main,
          px: 2,
          py: 2,
        }}
      >
        <Skeleton variant="rounded" height="20%" animation="pulse" />
        <Skeleton variant="rounded" animation="wave" />
        <Skeleton variant="rounded" height="20%" animation="pulse" />
        <Skeleton variant="rounded" animation="wave" />
        <Skeleton variant="rounded" height="20%" animation="pulse" />
        <Skeleton variant="rounded" animation="wave" />
        <Skeleton variant="rounded" height="20%" animation="pulse" />
        <Skeleton variant="rounded" animation="wave" />
        <Skeleton variant="rounded" height="20%" animation="pulse" />
        <Skeleton variant="rounded" animation="wave" />
      </Stack>
    </Grid>
  );
};
