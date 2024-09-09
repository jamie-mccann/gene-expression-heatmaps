import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Typography } from "@mui/material";

interface DropDownProps {
  primaryLabel: string;
  options: string[];
  onOptionSelect?: (index: number) => void;
}

const DropDown = ({ primaryLabel, options, onOptionSelect }: DropDownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    event.preventDefault();
    setSelectedIndex(index);
    setAnchorEl(null);
    if (onOptionSelect) {
      onOptionSelect(index);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: "background.paper" }}
      >
        <ListItemButton
          sx={{
            borderColor: "black",
            borderWidth: 2,
            borderStyle: "solid",
            borderRadius: 1,
          }}
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="dataset-menu"
          aria-label="dataset-choice"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
          color="primary"
        >
          <ListItemText
            primary={primaryLabel}
            secondary={options[selectedIndex]}
          />
          <ArrowDropDownIcon />
        </ListItemButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        variant="menu"
        slotProps={{
          paper: {
            style: { maxHeight: 48 * 2.5 },
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            <Typography key={index} variant="subtitle2">
              {option}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DropDown;
