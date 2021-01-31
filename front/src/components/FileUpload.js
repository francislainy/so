import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {Upload, message} from 'antd';
import {InboxOutlined} from '@ant-design/icons';

const {Dragger} = Upload;

function FileUpload(props) {

    const allowedFiles = ["stats.json", "index.html"];
    const [list, setList] = useState([])

    const config = {
        name: 'file',
        directory: true,
        fileList: list,
        onChange(info) {
            const {status} = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
                // {
                //     list !== undefined && props.onFileAdded(list)
                // }

                props.onFileAdded(info.fileList)
            }
            if (status === 'done') {
                // {
                //     list !== undefined && props.onFileAdded(this.fileList)
                // }

                props.onFileAdded(info.fileList)
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        beforeUpload: file => {
            if (allowedFiles.includes(file.name)) {
                setList(prev => [...prev, file])
            }

            return false;
        },
    };

    return (
        <div>
            <Dragger {...config}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload.
                </p>
            </Dragger>
        </div>
    );

}

export default FileUpload;
