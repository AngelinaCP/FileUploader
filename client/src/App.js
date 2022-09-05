import axios from "axios"
import {UploadOutlined} from '@ant-design/icons'
import {Form, Row, Col, Upload, Typography, Button, message} from 'antd'
import './App.css';
import { useState, useEffect } from "react";
const {Title} = Typography;
const URL = "http://localhost:300";

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

const uploadFile = (props) => {
  console.log('file values', props.imageFile.file.originFileObj);
  const data = new FormData();
  // console.log('values', values.imageFile.file.originalFileObj);
  data.append("image-file", props.imageFile.file.originFileObj);
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

  
function App() {

  const [img, setImg] = useState();


  const fetchImages = async() => {
    const url = 'http://localhost:3001/fetchImage/image-file-1662375832677.png'

    fetch(url)
    .then(response => response.blob())
    .then(imageBlob => {
        const imageObjectURL = window.URL.createObjectURL(imageBlob);
        setImg(imageObjectURL)
    });
  }
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="App">
      <Row align="middle" justify="center">
        <Col span={6}>
          <Title level={2} style={{fontWeight: '300'}}>File Upload-Antd </Title>
          <Form name="file-upload-form" {...FORM_LAYOUT} onFinish={uploadFile}>
            <Form.Item label="Select a file to upload" name="imageFile">
              <Upload  showUploadList={false}>
                <Button icon={<UploadOutlined/>}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item {...FORM_BTN_LAYOUT}>
              <Button type="primary" htmlType="submit">Upload file</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <div>
        <img src={img} alt="icons" />
      </div>
      </div>
  );
}

export default App;
