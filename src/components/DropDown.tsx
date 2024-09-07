import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Box } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface DropDownProps {
  primaryLabel: string;
  options: string[];
}

const DropDown = ({ primaryLabel, options }: DropDownProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
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
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
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
        >
          <ListItemText primary={primaryLabel} secondary={options[selectedIndex]} />
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
        anchorOrigin={{vertical: "bottom", horizontal: "left"}}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default DropDown;
