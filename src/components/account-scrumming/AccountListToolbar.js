import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { orange, red } from '@material-ui/core/colors';
import { Search as SearchIcon } from 'react-feather';

const AccountListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button
        sx={{
          backgroundColor: red[600],
          height: 56,
          width: 56,
          mx: 1
        }}
        variant="contained"
      >
        Delete
      </Button>
      <Button
        sx={{
          backgroundColor: orange[600],
          height: 56,
          width: 56,
          mx: 1
        }}
        variant="contained"
      >
        Update
      </Button>
      <Button
        color="primary"
        variant="contained"
      >
        Add account
      </Button>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search User"
              variant="outlined"
              onChange={(e) => props.handleSearchData(e.target.value)}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

AccountListToolbar.propTypes = {
  handleSearchData: PropTypes.func.isRequired
};

export default AccountListToolbar;
