import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { read, utils, write } from 'xlsx'
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import { Box, Button, Typography } from '@mui/material'

interface User {
  name: string
  email: string
  age: number
}

const requiredFields = ["ID", "Name", "Phone", "TitheNumber", "Sex"]

export default function ExcelUpload() {
  const [loading, setLoading] = useState(false)
  const [excelRows, setExcelRows] = useState<any[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [users, setUsers] = useState<User[]>([])

  const readUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (file instanceof Blob) {
        setSelectedFile(file)
        const reader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            const data = e.target.result
            const workbook = read(data as ArrayBuffer, { type: 'array' })
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]
            const json = utils.sheet_to_json(worksheet)
            setExcelRows(json)
          }
        }

        reader.readAsArrayBuffer(file)
      } else {
        console.error('Selected file is not a Blob')
      }
    }
  }

  useEffect(() => {
    const fetchUploadedData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/v1/all-records')
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchUploadedData()
  }, [])

  const uploadData = async () => {
    try {
      setLoading(true)

      const firstItemKeys = excelRows[0] && Object.keys(excelRows[0])

      let requiredValidation = false

      if (firstItemKeys.length) {
        requiredFields.forEach((field) => {
          if (!firstItemKeys.includes(field)) {
            requiredValidation = true
          }
        })
      }

      const existingRecords = await axios.get('http://localhost:7000/api/v1/all-records')
      const existingData = existingRecords.data || []

      const records = excelRows.map((row: any) => ({
        _id: existingData.find((x: any) => x.jokeId === row["ID"])?._id,
        name: row["Name"] || "",
        phone: row["Phone"] || "",
        tithe_number: row["TitheNumber"] || "",
        sex: row["Sex"] || "",
      }))

      const updatedRecords = records.filter((record: any) => record._id)
      const newRecords = records.filter((record: any) => !record._id)

      if (updatedRecords.length) {
        const result = await axios.post('http://localhost:7000/api/v1/edit-record', updatedRecords)
        if (result) {
          alert("Successfully updated " + updatedRecords.length + " documents")
        }
      }

      if (newRecords.length) {
        const result = await axios.post('http://localhost:7000/api/v1/create-tithe-record', newRecords)
        if (result) {
          alert("Successfully added " + newRecords.length + " documents")
        }
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("uploadData error: ", error)
    }
  }

  const removeFile = (e: React.MouseEvent) => {
    e.preventDefault()
    setSelectedFile(null)
    setExcelRows([])
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "name", headerName: "State", flex: 0.3 },
    { field: "phone", headerName: "Phone Number", flex: 0.4 },
    { field: "tithe", headerName: "Tithe Number", flex: 0.5 },
    { field: "sex", headerName: "Sex", flex: 0.3 },
  ]

  const rows = users.map((item: any) => ({
    id: item?._id,
    name: item?.name,
    phone: item?.phone,
    tithe: item?.tithe_number,
    sex: item?.sex,
  }))

  const downloadData = () => {
    const worksheet = utils.json_to_sheet(rows)
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, "Users")
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' })
    
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(data)
    link.download = 'users.xlsx'
    link.click()
  }

  return (
    <div className="bg-white rounded-md p-4 text-gray-800">
      <div className="container mx-auto px-4 md:px-0">
        <Typography variant="h4" className="mb-4">Excel Upload</Typography>
        <div className="rounded-md my-6">
          <input
            type="file"
            onChange={readUploadFile}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            className="text-gray-800 text-base font-medium cursor-pointer mb-4"
          />
          {selectedFile && (
            <div className="mt-4 flex gap-4">
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                onClick={uploadData}
                className="mr-2"
              >
                Upload Data
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={loading}
                onClick={removeFile}
              >
                Remove File
              </Button>
            </div>
          )}
        </div>

        <div className="w-full bg-gray-100 rounded-md my-3 p-3 shadow-md">
          <Box sx={{
            height: 400,
            width: '100%',
            '& .MuiDataGrid-root': {
              border: 'none',
              color: 'rgb(55, 65, 81)',
              backgroundColor: 'white',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #e5e7eb',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f3f4f6',
              color: 'rgb(17, 24, 39)',
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: 'white',
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              backgroundColor: '#f3f4f6',
            },
            '& .MuiCheckbox-root': {
              color: 'rgb(55, 65, 81)',
            },
            '& .MuiTablePagination-root': {
              color: 'rgb(55, 65, 81)',
            },
          }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 20]}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
            />
          </Box>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={downloadData}
          className="mt-4"
        >
          Download Data
        </Button>
      </div>
    </div>
  )
}