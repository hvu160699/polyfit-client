import React, { useState, useEffect } from 'react'
import { Form, Input, message, Button, Table, Divider, Popconfirm } from 'antd'
import { getAllBodyparts, deleteBodyparts, createNewBodyparts } from '../../../api/bodyparts.api'


const BodypartsForm = (props) => {

    const { getFieldDecorator } = props.form
    const [bodypartsData, setBodypartsData] = useState([])

    useEffect(() => {
        getBodypartsData()
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Image url',
            dataIndex: 'image_url',
            key: 'image_url',
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (row) => (
                <span>
                    <a>Edit</a>
                    <Divider type="vertical" />
                    <Popconfirm title="Sure to delete?" onConfirm={() => deleteItem(row.id)}>
                        <a>Delete</a>
                    </Popconfirm>
                </span>
            ),
        },
    ]

    const getBodypartsData = async () => {
        try {
            const data = await getAllBodyparts();
            return setBodypartsData(data)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteItem = id => {
        deleteBodyparts(id).then(data => {
            if (data.status === 0) {
                message.success(data.message)
                return getBodypartsData()
            }
            else message.error(data.message)
        })
    }

    const handleForm = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                createNewBodyparts(values)
                    .then(data => {
                        if (data.status === 0) {
                            message.success(data.message)
                            getBodypartsData().then(() => props.form.resetFields())

                        } else message.error(data.message)
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        });
    }

    return (
        <React.Fragment>
            <div className="container">
                <Form onSubmit={handleForm}>
                    <div className="row">
                        <div className="col-sm-6">
                            <Form.Item label="Title">
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: 'Please input title!' }],
                                })(
                                    <Input
                                        size="large"
                                        placeholder="Title"
                                    />,
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-sm-6">
                            <Form.Item label="Image url">
                                {getFieldDecorator('image_url', {
                                    rules: [{ required: true, message: 'Please input image url!' }],
                                })(
                                    <Input
                                        size="large"
                                        placeholder="Image url"
                                    />,
                                )}
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <Button size="large" type="primary" htmlType="submit" className="login-form-button">
                                Submit
                            </Button>
                        </div>
                    </div>
                </Form>

                <div className="row mt-4">
                    <div className="col-sm">
                        {bodypartsData &&
                            <Table
                                expandedRowRender={record => (
                                    <p style={{ margin: 0 }}><b>Image url :</b> {record.image_url}</p>
                                )}
                                dataSource={bodypartsData}
                                columns={columns} />}
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

const BodypartsPage = Form.create({ name: 'bodyparts_form' })(BodypartsForm);

export default BodypartsPage