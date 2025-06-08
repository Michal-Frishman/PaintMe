import { Box, SxProps, Theme } from "@mui/material"

interface BubbleDecorationProps {
  color: string
  sx?: SxProps<Theme>
}

export const BubbleDecoration = ({ color, sx }: BubbleDecorationProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        borderRadius: "50%",
        opacity: 0.3,
        zIndex: 0,
        backgroundColor: color,
        ...sx,
      }}
    />
  )
}
