// DataTable.jsx
import React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Button, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

function CustomToolbar({ onAddNew }) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Box sx={{ flexGrow: 1 }} />
      <Button startIcon={<AddIcon />} onClick={onAddNew}>
        Add New
      </Button>
    </GridToolbarContainer>
  );
}

const DataTable = ({ columns, rows, onAddNew, onEdit, onDelete }) => {
  const actionColumn = {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <Box>
        <Button
          size="small"
          onClick={() => onEdit(params.row)}
          sx={{ minWidth: 0, mr: 1 }}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="error"
          onClick={() => onDelete(params.row.id)}
          sx={{ minWidth: 0 }}
        >
          Delete
        </Button>
      </Box>
    ),
  };

  const allColumns = [...columns, actionColumn];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={allColumns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Toolbar: () => <CustomToolbar onAddNew={onAddNew} />,
        }}
      />
    </div>
  );
};

export default DataTable;