import { Badge, Chip, Icon } from "@mui/material";
import React from "react";

interface ChipBadgeProps {
  icon: string;
  label: string;
  badgeContent: string;
}
const ChipBadge = ({ icon, label, badgeContent }: ChipBadgeProps) => (
  <Badge
    color="secondary"
    badgeContent={badgeContent}
    max={100000000}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    sx={{
      "& .MuiBadge-badge": {
        zIndex: 1000,
        justifyContent: "center",
        top: -4,
      },
    }}
  >
    <Chip
      icon={<Icon fontSize="small">{icon}</Icon>}
      label={label}
      size="small"
    />
  </Badge>
);

export default ChipBadge;
