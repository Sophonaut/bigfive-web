import { useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'

const CompareMenu = ({ whitelist, handleUserClick }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget)
    console.log(whitelist)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleMenuClick}
      >
        Comparison Whitelist
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {whitelist.map((user, index) => (
          <MenuItem key={`whitelist-${index}`} index={index} onClick={(e) => handleUserClick(e)}>{user.email}</MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default CompareMenu
