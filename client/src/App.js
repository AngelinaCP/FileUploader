import axios from "axios"
import {UploadOutlined} from '@ant-design/icons'
import {Form, Row, Col, Upload, Typography, Button, message} from 'antd'
import './App.css';
const {Title} = Typography;
const URL = "http://localhost:3001";

const FORM_LAYOUT = {
  labelCol: {
    span: 8
  }
}

const FORM_BTN_LAYOUT = {
  wrapperCol: {
    span: 16,
    offset: 8
  }
}

const uploadFile = (values) => {
  console.log('file values', values.imageFile.file.originFileObj);
  const data = new FormData();
  // console.log('values', values.imageFile.file.originalFileObj);
  data.append("image-file", values.imageFile.file.originFileObj);
  axios.post(URL, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    message.success(res.data.message);
  }).catch(error => {
    message.error(error)
  })
}

const dummyRequest = (arg1, arg2) => {
  console.log('Dummy Rq');
}

function App() {
  return (
    <div className="App">
      <Row align="middle" justify="center">
        <Col span={6}>
          <Title level={2} style={{fontWeight: '300'}}>File Upload-Antd </Title>
          <Form name="file-upload-form" {...FORM_LAYOUT} onFinish={uploadFile}>
            <Form.Item label="Select a file to upload" name="imageFile">
              <Upload customRequest={dummyRequest} showUploadList={false}>
                <Button icon={<UploadOutlined/>}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item {...FORM_BTN_LAYOUT}>
              <Button type="primary" htmlType="submit">Upload file</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default App;
