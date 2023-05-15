// ** React Imports
import { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
// ** Reactstrap

import { Row, Col, Alert, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'

// ** User View Components
import PlanCard from './PlanCard'
import UserInfoCard from './UserInfoCard'
import UserTimeline from './UserTimeline'
// import InvoiceList from '../../invoice/list'
// import PermissionsTable from './PermissionsTable'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { request } from '../../../../@fake-db/services/utilities'
const UserView = () => {
  // ** Vars
  const [active, setActive] = useState('1')
  const [patient, setPatient] = useState([]);
  const id = useParams();

  const fetchPatient = useCallback(
    async () => {
      const url = `patient/admissions?q=${id.id}`;
      const rs = await request(url, 'GET', true);
      // setPatient(rs.result[0])
      console.log(rs, url)
    },
    [],
  )
  // ** Get suer on mount
  useEffect(() => {
    fetchPatient();
  }, [])


  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
  // return store.selectedUser !== null && store.selectedUser !== undefined ? (

  return (
    <div className='app-user-view nav-vertical'>
      <Row>
        <Col xl='2' lg='2' md='2'>
          <Nav tabs className='nav-left'>
            <NavItem>
              <NavLink
                active={active === '1'}
                onClick={() => {
                  toggle('1')
                }}
              >
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === '2'}
                onClick={() => {
                  toggle('2')
                }}
              >
                Encounters
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === '3'}
                onClick={() => {
                  toggle('3')
                }}
              >
                Vitals
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === '4'}
                onClick={() => {
                  toggle('4')
                }}
              >
                Allergens
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                active={active === '5'}
                onClick={() => {
                  toggle('5')
                }}
              >
                Problem List
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === '6'}
                onClick={() => {
                  toggle('6')
                }}
              >
                Immunization Chart
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === '7'}
                onClick={() => {
                  toggle('7')
                }}
              >
                Clinical Tasks
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === '8'}
                onClick={() => {
                  toggle('8')
                }}
              >
                Documents
              </NavLink>
            </NavItem>
            Request
            <NavItem>
              <NavLink
                active={active === '9'}
                onClick={() => {
                  toggle('9')
                }}
              >
                Clinical Lab
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col xl='10' lg='10' md='7' >
          <Row xl='12'>
            <Col xl='9' lg='7' md='7'>
              {/* <UserInfoCard selectedUser={patient} /> */}
            </Col>
            <Col xl='3' lg='4' md='5'>
              {/* <PlanCard selectedUser={patient} /> */}
            </Col>
          </Row>
          <Col xl='12' lg='12' md='7'>
            <TabContent activeTab={active}>
              <TabPane tabId='1'>
                <p>
                  Oat cake marzipan cake lollipop caramels wafer pie jelly beans. Icing halvah chocolate cake carrot cake.
                  Jelly beans carrot cake marshmallow gingerbread chocolate cake. Sweet fruitcake cheesecake biscuit cotton
                  candy. Cookie powder marshmallow donut. Gummies cupcake croissant.
                </p>
              </TabPane>
              <TabPane tabId='2'>
                <p>
                  Sugar plum tootsie roll biscuit caramels. Liquorice brownie pastry cotton candy oat cake fruitcake jelly
                  chupa chups. Sweet fruitcake cheesecake biscuit cotton candy. Cookie powder marshmallow donut. Pudding
                  caramels pastry powder cake soufflé wafer caramels. Jelly-o pie cupcake.
                </p>
              </TabPane>
              <TabPane tabId='3'>
                <p>
                  Icing croissant powder jelly bonbon cake marzipan fruitcake. Tootsie roll marzipan tart marshmallow pastry
                  cupcake chupa chups cookie. Fruitcake dessert lollipop pudding jelly. Cookie dragée jujubes croissant lemon
                  drops cotton candy. Carrot cake candy canes powder donut toffee cookie.
                </p>
              </TabPane>
            </TabContent>
            <UserTimeline />
          </Col>
        </Col>
      </Row>
      <Row>
        {/* <Col xl='11' lg='12' md='7'>
          <TabContent activeTab={active}>
            <TabPane tabId='1'>
              <p>
                Oat cake marzipan cake lollipop caramels wafer pie jelly beans. Icing halvah chocolate cake carrot cake.
                Jelly beans carrot cake marshmallow gingerbread chocolate cake. Sweet fruitcake cheesecake biscuit cotton
                candy. Cookie powder marshmallow donut. Gummies cupcake croissant.
              </p>
            </TabPane>
            <TabPane tabId='2'>
              <p>
                Sugar plum tootsie roll biscuit caramels. Liquorice brownie pastry cotton candy oat cake fruitcake jelly
                chupa chups. Sweet fruitcake cheesecake biscuit cotton candy. Cookie powder marshmallow donut. Pudding
                caramels pastry powder cake soufflé wafer caramels. Jelly-o pie cupcake.
              </p>
            </TabPane>
            <TabPane tabId='3'>
              <p>
                Icing croissant powder jelly bonbon cake marzipan fruitcake. Tootsie roll marzipan tart marshmallow pastry
                cupcake chupa chups cookie. Fruitcake dessert lollipop pudding jelly. Cookie dragée jujubes croissant lemon
                drops cotton candy. Carrot cake candy canes powder donut toffee cookie.
              </p>
            </TabPane>
          </TabContent>
          <UserTimeline />
        </Col> */}
        {/* <Col md='6'>
          {/* <PermissionsTable /> */}
        {/* <h1>hi</h1> */}
        {/* </Col>  */}
      </Row>
      <Row>
        <Col sm='12'>
          {/* <InvoiceList /> */}
          {/* <h1>invoice</h1> */}
        </Col>
      </Row>
    </div>
  )
  // ) : (
  //   <Alert color='danger'>
  //     <h4 className='alert-heading'>User not found</h4>
  //     <div className='alert-body'>
  //       User with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>Users List</Link>
  //     </div>
  //   </Alert>
  // )
}
export default UserView
