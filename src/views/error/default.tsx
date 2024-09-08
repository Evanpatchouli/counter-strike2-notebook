import { Stack } from "@mui/material";
import { AppError } from "./app-error";

const Default = ({ error }: { error: AppError }) => (
  <Stack direction="column">
    <h1>Oops!</h1>
    <p>Sorry, an unexpected error has occurred.</p>
    <p>
      <i>{error.statusText || error.message}</i>
    </p>
  </Stack>
);

export default Default;
