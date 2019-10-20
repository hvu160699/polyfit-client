import React, { useState, useEffect } from 'react'
import { Form, Input, message, Button, Table, Divider, Popconfirm } from 'antd'
import { getAllDishes, createNewDishes, deleteDishes } from '../../../api/dishes.api'


const DishesForm = (props) => {

    const { getFieldDecorator } = props.form
    const [dishesData, setDishesData] = useState([])

    useEffect(() => {
        getDishesData()
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
            key: 'image_url'
        },
        {
            title: 'Protein',
            dataIndex: 'protein',
            key: 'protein'
        },
        {
            title: 'Carb',
            dataIndex: 'carb',
            key: 'carb'
        },
        {
            title: 'Calories',
            dataIndex: 'calories',
            key: 'calories'
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

    const getDishesData = async () => {
        try {
            const data = await getAllDishes();
            return setDishesData(data)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteItem = id => {
        deleteDishes(id).then(data => {
            if (data.status === 0) {
                getDishesData()
            }
            else message.error(data.message)
        })
    }

    const handleForm = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                createNewDishes(values)
                    .then(data => {
                        console.log(data)
                        if (data.status === 0) {
                            message.success(data.message)
                            getDishesData()
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
                            <Form.Item label="Protein">
                                {getFieldDecorator('protein', {
                                    rules: [{ required: true, message: 'Please input protein!' }],
                                })(
                                    <Input
                                        size="large"
                                        placeholder="Protein"
                                    />,
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-sm-6">
                            <Form.Item label="Fat">
                                {getFieldDecorator('fat', {
                                    rules: [{ required: true, message: 'Please input fat!' }],
                                })(
                                    <Input
                                        size="large"
                                        placeholder="Fat"
                                    />,
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-sm-6">
                            <Form.Item label="Carb">
                                {getFieldDecorator('carb', {
                                    rules: [{ required: true, message: 'Please input carb!' }],
                                })(
                                    <Input
                                        size="large"
                                        placeholder="Carb"
                                    />,
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-sm-6">
                            <Form.Item label="Calories">
                                {getFieldDecorator('calories', {
                                    rules: [{ required: true, message: 'Please input calories!' }],
                                })(
                                    <Input
                                        size="large"
                                        placeholder="Calories"
                                    />,
                                )}
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Submit
                            </Button>
                        </div>
                    </div>
                </Form>

                <div className="row">
                    <div className="col-sm">
                        {dishesData && <Table dataSource={dishesData} columns={columns} />}
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

const DishesPage = Form.create({ name: 'dishes_form' })(DishesForm);

export default DishesPage