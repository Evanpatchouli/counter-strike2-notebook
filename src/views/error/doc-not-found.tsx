import { Stack } from "@mui/material";
import { AppError } from "./app-error";

const DocNotFound = ({ error }: { error: AppError }) => (
  <Stack direction="column">
    <h1>不是哥们？</h1>
    <p>这都能输错？</p>
    <p>
      <strong>{error.statusText || error.message}</strong>
    </p>
  </Stack>
);

export default DocNotFound;
