import React, { useState, useEffect } from 'react'
import { Form, Input, message, Button, Table, Divider, Popconfirm, Select, Modal } from 'antd'
import { getAllMeals, deleteMeals, createNewMeals, updateMeals } from '../../../api/meals.api'
import { getAllDiets } from '../../../api/diets.api'

const { Option } = Select

const MealsForm = (props) => {

    const { getFieldDecorator } = props.form
    const [mealsData, setMealsData] = useState([])
    const [dietsData, setDietsData] = useState([])
    const [openedModal, setOpenedModal] = useState(false)

    useEffect(() => {
        getDietsData()
        getMealsData()
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
            title: 'ID Diets',
            dataIndex: 'polyfitDietId',
            key: 'polyfitDietId'
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
                                    <Form.Item label="ID Diets">
                                        {getFieldDecorator('id_diets', {
                                        })(
                                            <Select size="large">
                                                {dietsData.map((element, key) => {
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
            const data = await getAllDiets()
            return setDietsData(data)
        } catch (err) {
            console.log(err)
        }
    }

    const getMealsData = async () => {
        try {
            const data = await getAllMeals();
            return setMealsData(data)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteItem = id => {
        deleteMeals(id).then(data => {
            if (data.status === 0) {
                message.success(data.message)
                getMealsData()
            }
            else message.error(data.message)
        })
    }

    const handleForm = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                createNewMeals(values)
                    .then(data => {
                        if (data.status === 0) {
                            message.success(data.message)
                            getMealsData().then(() => props.form.resetFields())

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
                updateMeals(openedModal, values)
                    .then(data => {
                        if (data.status === 0) {
                            message.success(data.message)
                            getMealsData().then(() => props.form.resetFields())
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
                            <Form.Item label="ID Diets">
                                {getFieldDecorator('id_diets', {
                                    // rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Select size="large">
                                        {dietsData.map((element, key) => {
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
                        {mealsData &&
                            <Table
                                expandedRowRender={record => (
                                    <p style={{ margin: 0 }}><b>Image url :</b> {record.image_url}</p>
                                )}
                                dataSource={mealsData}
                                columns={columns} />}
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

const MealsPage = Form.create({ name: 'Meals_form' })(MealsForm);

export default MealsPage