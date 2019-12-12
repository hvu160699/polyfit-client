import React, { useState, useEffect } from 'react'
import { Form, Input, message, Button, Table, Divider, Popconfirm, Select, Modal } from 'antd'
import { getAllDiets, deleteDiets, createNewDiets, updateDiets } from '../../../api/diets.api'
import { getAllLevel } from '../../../api/level.api'

const { Option } = Select

const DietsForm = (props) => {

    const { getFieldDecorator } = props.form
    const [dietsData, setDietsData] = useState([])
    const [levelData, setLevelData] = useState([])
    const [openedModal, setOpenedModal] = useState(false)

    const getLevelData = async () => {
        try {
            const data = await getAllLevel();
            return setLevelData(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getLevelData()
        getDietsData()
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
            title: 'ID Level',
            dataIndex: 'polyfitLevelId',
            key: 'polyfitLevelId'
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
                                        })(
                                            <Input
                                                size="large"
                                                placeholder="Title"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-6">
                                    <Form.Item label="Description">
                                        {getFieldDecorator('description', {
                                        })(
                                            <Input
                                                size="large"
                                                placeholder="Description"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-6">
                                    <Form.Item label="Image url">
                                        {getFieldDecorator('image_url', {
                                        })(
                                            <Input
                                                size="large"
                                                placeholder="Image url"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-6">
                                    <Form.Item label="ID Level">
                                        {getFieldDecorator('id_level', {
                                        })(
                                            <Select size="large">
                                                {levelData.map((element, key) => {
                                                    // console.log(element)
                                                    return <Option key={key} value={element.id}>{element.title}</Option>
                                                })}
                                            </Select>
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

    const getDietsData = async () => {
        try {
            const data = await getAllDiets();
            return setDietsData(data)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteItem = id => {
        deleteDiets(id).then(data => {
            if (data.status === 0) {
                getDietsData()
            }
            else message.error(data.message)
        })
    }

    const handleForm = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                createNewDiets(values)
                    .then(data => {
                        if (data.status === 0) {
                            message.success(data.message)
                            getDietsData().then(() => props.form.resetFields())

                        } else message.error(data.message)
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        });
    }

    const showDetailItem = async (data) => {
        setOpenedModal(data.id)
        props.form.setFieldsValue(data)
    }

    const handleEdit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                updateDiets(openedModal, values)
                    .then(data => {
                        if (data.status === 0) {
                            message.success(data.message)
                            getDietsData().then(() => props.form.resetFields())
                            setOpenedModal(null)
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
                        <div className="col-sm-6">
                            <Form.Item label="ID Level">
                                {getFieldDecorator('id_level', {
                                    // rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Select size="large">
                                        {levelData.map((element, key) => {
                                            // console.log(element)
                                            return <Option key={key} value={element.id}>{element.title}</Option>
                                        })}
                                    </Select>
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
                        {dietsData &&
                            <Table
                                expandedRowRender={record => (
                                    <p style={{ margin: 0 }}><b>Image url :</b> {record.image_url}</p>
                                )}
                                dataSource={dietsData}
                                columns={columns} />}
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

const DietsPage = Form.create({ name: 'diets_form' })(DietsForm);

export default DietsPage