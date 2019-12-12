import React, { useState, useEffect, createRef } from 'react'
import { Form, Input, message, Button, Table, Divider, Popconfirm, Upload, Modal } from 'antd'
import { getAllLevel, createNewLevel, deleteLevel, updateLevel, getLevelById } from '../../../api/level.api'

const LevelForm = (props) => {

    const { getFieldDecorator } = props.form
    const [levelData, setLevelData] = useState([])
    const [openedModal, setOpenedModal] = useState(false)

    const formRef = createRef(null)

    useEffect(() => {
        getLevelData()
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
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            ellipsis: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Action',
            key: 'action',
            render: (row) => (
                <span style={{ color: "#4287f5" }}>
                    <a onClick={() => showDetailItem(row)}>Edit</a>
                    <Modal
                        key="editModal"
                        title="Edit item"
                        centered
                        visible={openedModal === row.id}
                        onOk={e => handleEdit(e)}
                        onCancel={() => setOpenedModal(null)}
                    >
                        <Form onSubmit={handleEdit}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <Form.Item label="Title">
                                        {getFieldDecorator('title', {
                                            rules: [],
                                        })(
                                            <Input
                                                id="title"
                                                size="large"
                                                placeholder="Title"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-6">
                                    <Form.Item label="Image">
                                        {getFieldDecorator('image', {
                                            rules: [],
                                        })(
                                            <Input
                                                size="large"
                                                placeholder="image"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-6">
                                    <Form.Item label="Description">
                                        {getFieldDecorator('description', {
                                            rules: [],
                                        })(
                                            <Input
                                                size="large"
                                                placeholder="Description"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                            </div>
                        </Form>
                    </Modal>
                    <Divider type="vertical" />
                    <Popconfirm title="Sure to delete?" onConfirm={() => deleteItem(row.id)}>
                        <a>Delete</a>
                    </Popconfirm>
                </span>
            ),
        },
    ]

    const showDetailItem = async (data) => {
        setOpenedModal(data.id)
        props.form.setFieldsValue(data)
    }

    const getLevelData = async () => {
        try {
            const data = await getAllLevel()
            return setLevelData(data)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteItem = id => {
        deleteLevel(id).then(data => {
            if (data.status === 0) {
                message.success(data.message)
                return getLevelData()
            }
            else message.error(data.message)
        })
    }

    const handleEdit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                updateLevel(openedModal, values)
                    .then(data => {
                        if (data.status === 0) {
                            message.success(data.message)
                            getLevelData().then(() => props.form.resetFields())
                            setOpenedModal(null)
                        } else message.error(data.message)
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        });
    }

    const handleForm = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                createNewLevel(values)
                    .then(data => {
                        if (data.status === 0) {
                            message.success(data.message)
                            getLevelData().then(() => props.form.resetFields())

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
                                        id="title"
                                        size="large"
                                        placeholder="Title"
                                    />,
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-sm-6">
                            <Form.Item label="Image">
                                {getFieldDecorator('image', {
                                    rules: [{ required: true, message: 'Please input image!' }],
                                })(
                                    <Input
                                        size="large"
                                        placeholder="image"
                                    />,
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-sm-6">
                            <Form.Item label="Description">
                                {getFieldDecorator('description', {
                                    rules: [{ required: true, message: 'Please input description!' }],
                                })(
                                    <Input
                                        size="large"
                                        placeholder="Description"
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
                        {levelData && <Table dataSource={levelData} columns={columns} />}
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

const LevelPage = Form.create({ name: 'Level_form' })(LevelForm);
export default LevelPage