// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect, useCallback, useContext } from 'react'
import axios from 'axios'
import { patientname, request } from '../../../../@fake-db/services/utilities'
import Avatar from '@components/avatar'
import { ThemeColors } from "../../../../utility/context/ThemeColors"

// ** Table Data & Columns
// import { data, columns } from './data'

// ** Add New Modal Component
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, FileText, MoreVertical, Edit, Archive, Trash } from 'react-feather'

import { formatDate } from '@utils'

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => {
  console.log(props, ref)
  return (
    <div className='form-check'>
      <Input type='checkbox' ref={ref} {...props} />
    </div>
  )
})


const DataTableWithButtons = ({ patient, printDoc }) => {
  // ** States
  const store = useContext(ThemeColors)
  const [printArr, setPrintArr] = store.printArr
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([])
  const [meta, setMeta] = useState([])
  const [items, setItems] = useState([])
  const [selectedData, setSelectedData] = React.useState();


  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)

  const fetchTransactions = useCallback(
    async page => {
      try {
        // dispatch(startBlock());
        const p = page || 1;
        const url = `transactions/pending?page=${p}&limit=6&patient_id=${patient.id}&startDate=&endDate=&fetch=1`;
        const rs = await request(url, 'GET');
        const { result, all, ...meta } = rs;
        console.log(rs)
        setMeta(meta);
        setData([...result]);
        setItems([...all]);
        // setLoading(false);
        // dispatch(stopBlock());
      } catch (e) {
        // dispatch(stopBlock());
        console.log('could not fetch transactions')
        // notifyError(e.message || 'could not fetch transactions');
        // setLoading(false);
      }
    },
    [patient]
  );

  useEffect(() => {
    // if (loading) {
    fetchTransactions();
    // }
  }, [fetchTransactions]);

  const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']
  const status = {
    1: { title: 'Current', color: 'light-primary' },
    2: { title: 'Professional', color: 'light-success' },
    3: { title: 'Rejected', color: 'light-danger' },
    4: { title: 'Resigned', color: 'light-warning' },
    5: { title: 'Applied', color: 'light-info' }
  }
  const columns = [
    {
      name: 'Date',
      minWidth: '100px',
      sortable: row => row.createdAt,
      cell: row => <span>{formatDate(row.createdAt)}</span>
    },
    {
      name: 'Services',
      sortable: true,
      minWidth: '250px',
      selector: row => <span>{row.description}</span>
    },
    {
      name: 'Amount (₦)',
      sortable: true,
      minWidth: '70px',
      cell: row => <span className='mx-1'>{row.amount}</span>
    }
  ]

  const handleChange = (state) => {
    if (state.selectedCount > 0) {
      setSelectedData(state.selectedRows);
      setPrintArr(state.selectedRows);
      console.log(printArr, selectedData);
      console.log(state);
    }
  };
  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    const status = {
      1: { title: 'Current', color: 'light-primary' },
      2: { title: 'Professional', color: 'light-success' },
      3: { title: 'Rejected', color: 'light-danger' },
      4: { title: 'Resigned', color: 'light-warning' },
      5: { title: 'Applied', color: 'light-info' }
    }

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.post.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.full_name.toLowerCase().includes(value.toLowerCase()) ||
          item.post.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.age.toLowerCase().includes(value.toLowerCase()) ||
          item.salary.toLowerCase().includes(value.toLowerCase()) ||
          item.start_date.toLowerCase().includes(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? Math.ceil(filteredData.length / 7) : Math.ceil(data.length / 7) || 1}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
    />
  )

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  return (
    <Fragment>
      <Card style={{ boxShadow: ' none' }}>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h1' className='align-items-center'>Transaction Of {patientname(patient, true)}</CardTitle>
        </CardHeader>
        <div className='react-dataTable w-100'>
          <DataTable
            noHeader
            pagination
            selectableRows
            columns={columns}
            paginationPerPage={7}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={searchValue.length ? filteredData : data}
            // selectableRowsComponent={BootstrapCheckbox}
            onSelectedRowsChange={handleChange}
          />
          <Button color='gradient-success' className='mx-2' onClick={printDoc}>Print</Button>
        </div>
      </Card>
    </Fragment >
  )
}

export default DataTableWithButtons
