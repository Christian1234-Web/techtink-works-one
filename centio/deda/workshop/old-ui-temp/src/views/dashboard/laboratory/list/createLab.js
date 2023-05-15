// ** Reactstrap Imports
import { useEffect, useState, useCallback } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import { selectThemeColors } from '@utils'
import AsyncSelect from 'react-select/async'
import Select from 'react-select'
import { useForm } from 'react-hook-form';
import { searchAPI } from '../../../../@fake-db/services/constant'
import { request, patientname } from '../../../../@fake-db/services/utilities'
// import axios from 'axios'

const defaultValues = {
  request_note: '',
  urgent: false,
};

const CreateLab = ({ module, history, location, itemId }) => {

  const [chosenPatient, setChosenPatient] = useState(null)
  const [labTests, setLabTests] = useState([]);
  const [groups, setGroups] = useState([]);
  const [urgent, setUrgent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues,
  });
  const getPatients = async q => {
    if (!q || q.length < 1) {
      return [];
    }

    const url = `${searchAPI}?q=${q}`;
    const res = await request(url, 'GET');
    return res;
  };

  const fetchLabCombo = useCallback(async () => {
    try {
      const url = 'lab-tests/groups';
      const rs = await request(url, 'GET');
      setGroups(rs);
    } catch (e) {
      console.log(e, '1')
      // notifyError('Error fetching lab groups');
    }
    // dispatch(stopBlock());
  }, []);

  const getLabTests = async q => {
    if (!q || q.length < 1) {
      return [];
    }

    const url = `lab-tests?q=${q}`;
    const res = await request(url, 'GET');
    return res?.result || [];
  };
  const onSubmit = async data => {
    try {
      if (!chosenPatient) {
        // notifyError('Please select a patient');
        console.log('select a lab patient')

        return;
      }

      if (labTests.length === 0) {
        // notifyError('Please select a lab tests');
        console.log('select a lab test')
        return;
      }

      const datum = {
        requestType: 'labs',
        patient_id: chosenPatient.id,
        tests: [...labTests],
        request_note: data.request_note,
        urgent: data.urgent,
        pay_later: 0,
        antenatal_id: module === 'antenatal' ? itemId : '',
        admission_id: module === 'admission' ? itemId : '',
        nicu_id: module === 'nicu' ? itemId : '',
        ivf_id: module === 'ivf' ? itemId : '',
      };
      console.log(datum)
      setSubmitting(true);
      const rs = await request('requests/save-request', 'POST', datum);
      setSubmitting(false);
      // notifySuccess('Lab request sent!');
      console.log(rs, 'Lab request sent!')
      //  if (!module || (module && module === '')) {
      //   history.push('/lab');
      // } else {
      //   history.push(`${location.pathname}#lab`);
      // }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      // notifyError('Error sending lab request');
    }
  };
  useEffect(() => {
    fetchLabCombo();
  }, [])
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>New Lab Request</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg='12' md='6' sm='12' className='mb-1'>
              <Label className='form-label'>Patient Name</Label>
              <AsyncSelect
                isClearable
                getOptionValue={option => option.id}
                getOptionLabel={option => patientname(option, true)}
                defaultOptions
                name="patient"
                loadOptions={getPatients}
                onChange={e => {
                  if (e) {
                    setChosenPatient(e);
                  } else {
                    setChosenPatient(null);
                    setLabTests([]);
                  }
                }}
                placeholder="Search patients"
              />
            </Col>
          </Row>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label'>Lab Group</Label>
              <Select
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                getOptionValue={option => option.id}
                getOptionLabel={option => option.name}
                options={groups}
                isClearable={false}
                placeholder="Select Lab Group"
                name="lab_group"
                onChange={e => {
                  setLabTests([
                    ...labTests,
                    ...e.tests.map(t => ({ ...t.labTest })),
                  ]);
                }}
              />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label'>Lab Test</Label>
              <AsyncSelect
                isMulti
                isClearable
                getOptionValue={option => option.id}
                getOptionLabel={option =>
                  `${option.name} (${option.category.name})`
                }
                defaultOptions
                value={labTests}
                name="lab_test"
                loadOptions={getLabTests}
                onChange={e => {
                  if (e) {
                    setLabTests(e);
                  } else {
                    setLabTests([]);
                  }
                }}
                placeholder="Search Lab Test"
                theme={selectThemeColors}
              />
            </Col>
          </Row>
          <Row>
            <Col md='6' sm='12' lg='12' className='mb-1'>
              <div className='form-floating mt-2'>
                <Input
                  type='textarea'
                  name="request_note"
                  id='floating-textarea'
                  placeholder='Floating Label'
                  style={{ minHeight: '100px' }}
                />
                <Label className='form-label' for='floating-textarea'>
                  Request Note
                </Label>
              </div>
            </Col>
            <div className='form-check form-check-inline mx-2'>
              <Input type='checkbox' checked={urgent} onChange={e => setUrgent(!urgent)} name="urgent"
                // ref={register}
                id='basic-cb-checked' />
              <Label for='basic-cb-checked' className='form-check-label'>
                Please check if urgent
              </Label>
            </div>
          </Row>
          <Row>
            <Col sm='12'>
              <div className='d-flex justify-content-end'>
                <Button className='me-1' color='primary' type='submit' disabled={submitting}>
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody >
    </Card >
  )
}
export default CreateLab
