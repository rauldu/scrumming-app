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
import { green, orange, red } from '@material-ui/core/colors';
import { Search as SearchIcon } from 'react-feather';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateForm from './CreateForm';
import UpdateForm from './UpdateForm';
import DeleteForm from './DeleteForm';

const OrganizationListToolbar = (props) => {
  const [dialog, setDialog] = useState(null);
  const [disableDelete, setDisableDelete] = useState(true);
  const [disableUpdate, setDisableUpdate] = useState(true);
  const [disableBusinessUnits, setDisableBusinessUnits] = useState(true);
  const [elementsIDs, setElementsIDs] = useState([]);

  const navigate = useNavigate();

  const { handleSearchData, handleSelectedData, handleApiAction } = props;

  useEffect(() => {
    setDialog(null);
  }, []);

  useEffect(() => {
    if (handleSelectedData.length === 1) {
      setDisableUpdate(false);
      setDisableBusinessUnits(false);
    } else {
      setDisableUpdate(true);
      setDisableBusinessUnits(true);
    }

    if (handleSelectedData.length > 0) {
      setDisableDelete(false);
    } else {
      setDisableDelete(true);
    }
    setElementsIDs(handleSelectedData);
  }, [handleSelectedData]);

  const unmountDialog = (message) => {
    setDialog(null);
    handleApiAction(message);
  };

  const openCreateDialog = () => {
    setDialog(<CreateForm formClosed={unmountDialog} />);
  };

  const openUpdateDialog = () => {
    console.log('PASSING IDs');
    console.log(elementsIDs[0]);
    setDialog(<UpdateForm formClosed={unmountDialog} elementId={elementsIDs[0]} />);
  };

  const openDeleteDialog = () => {
    console.log('PASSING IDs');
    console.log(elementsIDs);
    setDialog(<DeleteForm formClosed={unmountDialog} dataIds={elementsIDs} />);
  };

  const openBusinessUnitsDashboard = () => {
    console.log('Redirecting to B unit dashboard');
    console.log(elementsIDs[0]);
    const organizationID = elementsIDs[0];
    navigate(`${organizationID}/business-unit`);
  };

  return (
    <Box {...props}>
      {dialog}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          sx={{
            backgroundColor: green[600],
            height: 56,
            width: 200,
            mx: 1
          }}
          variant="contained"
          disabled={disableBusinessUnits}
          onClick={openBusinessUnitsDashboard}
        >
          Get Business Units
        </Button>
        <Button
          sx={{
            backgroundColor: red[600],
            height: 56,
            width: 56,
            mx: 1
          }}
          variant="contained"
          disabled={disableDelete}
          onClick={openDeleteDialog}
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
          disabled={disableUpdate}
          onClick={openUpdateDialog}
        >
          Update
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={openCreateDialog}
        >
          Add organization
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
                placeholder="Search Organization"
                variant="outlined"
                onChange={(e) => handleSearchData(e.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

OrganizationListToolbar.propTypes = {
  handleSearchData: PropTypes.func.isRequired,
  handleSelectedData: PropTypes.array.isRequired,
  handleApiAction: PropTypes.func.isRequired,
};

export default OrganizationListToolbar;
