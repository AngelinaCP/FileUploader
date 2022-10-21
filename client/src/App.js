import axios from "axios"
import {UploadOutlined} from '@ant-design/icons'
import ImgCrop from "antd-img-crop";
import {Form, Row, Col, Upload, Typography, Button, message} from 'antd'
import './App.css';
import { useState, useEffect } from "react";
const {Title} = Typography;
const URL = "http://localhost:3001/post/photoUpload/1";

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

const getSrcFromFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
};


  
function App() {

  // const [img, setImg] = useState();
  const [fileList, setFileList] = useState([]);
  console.log('file lists', fileList)

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    const src = file.url || (await getSrcFromFile(file));
    const imgWindow = window.open(src);

    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };

  const uploadFile = () => {
    const data = new FormData();
    fileList.forEach((file) => {
      data.append("image-file", file.originFileObj)
    })
    // data.append("image-file", props.imageFile.file.originFileObj);
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
  // const fetchImages = async() => {
  //   const url = 'http://localhost:3001/fetchImage/image-file-1662375832677.png'

  //   fetch(url)
  //   .then(response => response.blob())
  //   .then(imageBlob => {
  //       const imageObjectURL = window.URL.createObjectURL(imageBlob);
  //       setImg(imageObjectURL)
  //   });
  // }
  // useEffect(() => {
  //   fetchImages();
  // }, []);

  return (
    <div className="App">
      <Row align="middle" justify="center">
        <Col span={6}>
          <Form name="file-upload-form" {...FORM_LAYOUT} onFinish={uploadFile}>
            <Form.Item name="imageFile">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}>
                <UploadOutlined/>
              </Upload>
            </Form.Item>
            <Form.Item {...FORM_BTN_LAYOUT}>
              <Button type="primary" htmlType="submit">Upload file</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <div>
      </div>
      </div>
  );
}

export default App;
