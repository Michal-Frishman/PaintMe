import { Stack, Slider, IconButton, Tooltip, useTheme, Box } from "@mui/material";

interface ColorPaletteProps {
  brushColor: string;
  brushRadius: number;
  setBrushColor: (color: string) => void;
  setBrushRadius: (radius: number) => void;
}
const colorMap = {
  red: "rgba(255, 0, 0, 0.5)",
  green: "rgba(0, 255, 0, 0.5)",
  blue: "rgba(0, 0, 255, 0.5)",
  yellow: "rgba(255, 255, 0, 0.5)",
  black: "rgba(0, 0, 0, 0.5)",
  white: "rgba(255, 255, 255, 0.5)",
  pink: "rgba(255, 192, 203, 0.5)",
  orange: "rgba(255, 165, 0, 0.5)",
  purple: "rgba(128, 0, 128, 0.5)",
  brown: "rgba(165, 42, 42, 0.5)",
  cyan: "rgba(0, 255, 255, 0.5)",
  gray: "rgba(128, 128, 128, 0.5)",
  salmon: "rgba(250, 128, 114, 0.5)",
  teal: "rgba(0, 128, 128, 0.5)",
  magenta: "rgba(255, 0, 255, 0.5)",
  deepPink: "rgba(255, 20, 147, 0.5)",
  royalBlue: "rgba(65, 105, 225, 0.5)",
  crimson: "rgba(220, 20, 60, 0.5)",
};


const ColorPalette = ({
  brushColor,
  brushRadius,
  setBrushColor,
  setBrushRadius
}: ColorPaletteProps) => {
  const theme = useTheme();

  const entries = Object.entries(colorMap);
  const half = Math.ceil(entries.length / 2);
  const leftColors = entries.slice(0, half);
  const rightColors = entries.slice(half);

  return (
    <Box mr={4}>
      <Stack spacing={2} alignItems="center" pr={3}>
        <Box display="flex" flexDirection="row" gap={1}>
          <Stack spacing={1}>
            {leftColors.map(([key, color]) => (
              <Tooltip title={key} arrow key={key}>
                <IconButton
                  onClick={() => setBrushColor(color)}
                  sx={{
                    bgcolor: color,
                    border: brushColor === color ? `2px solid ${theme.palette.primary.main}` : "1px solid #ccc",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      opacity: 0.9,
                      borderColor: theme.palette.primary.main,
                      transform: "scale(1.1)",
                    },
                  }}
                />
              </Tooltip>
            ))}
          </Stack>

          <Stack spacing={1}>
            {rightColors.map(([key, color]) => (
              <Tooltip title={key} arrow key={key}>
                <IconButton
                  onClick={() => setBrushColor(color)}
                  sx={{
                    bgcolor: color,
                    border: brushColor === color ? `2px solid ${theme.palette.primary.main}` : "1px solid #ccc",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      opacity: 0.9,
                      borderColor: theme.palette.primary.main,
                      transform: "scale(1.1)",
                    },
                  }}
                />
              </Tooltip>
            ))}
          </Stack>
        </Box>

        <Slider
          min={1}
          max={20}
          value={brushRadius}
          onChange={(_, value) => setBrushRadius(value as number)}
          sx={{
            width: 60,
            color: theme.palette.primary.main,
            "& .MuiSlider-thumb": {
              width: 16,
              height: 16,
              transition: "all 0.2s ease",
              "&:hover": {
                boxShadow: `0px 0px 0px 8px ${theme.palette.primary.main}20`,
              },
            },
          }}
          aria-label="גודל מכחול"
        />
      </Stack>
    </Box>
  );
};

export default ColorPalette;
