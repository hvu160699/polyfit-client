import React, { useState, useEffect } from 'react'
import { Form, Input, message, Button, Table, Divider, Popconfirm, Select, InputNumber, Modal } from 'antd'
import { getAllDishes, createNewDishes, deleteDishes, updateDishes } from '../../../api/dishes.api'
import { getAllMeals } from '../../../api/meals.api'
import { getAllIngredients } from '../../../api/ingredients.api'

const { Option } = Select
const { TextArea } = Input

const DishesForm = (props) => {

    const { getFieldDecorator } = props.form
    const [dishesData, setDishesData] = useState([])
    const [mealsData, setMealsData] = useState([])
    const [ingredientsData, setIngredientsData] = useState([])
    const [openedModal, setOpenedModal] = useState(false)

    useEffect(() => {
        getDishesData()
        getMealsData()
        getIngredientsData()
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
            title: 'ID Meals',
            dataIndex: 'polyfitMealId',
            key: 'polyfitMealId'
        },
        {
            title: 'Ingredients',
            dataIndex: 'ingredients',
            render: row => (
                <dl>
                    {
                        row.map(item => {
                            return <dt>{item.title}</dt>
                        })
                    }
                </dl>
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
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
                                    <Form.Item label="Protein">
                                        {getFieldDecorator('protein', {
                                        })(
                                            <InputNumber
                                                size="large"
                                                placeholder="Protein"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-6">
                                    <Form.Item label="Fat">
                                        {getFieldDecorator('fat', {
                                        })(
                                            <InputNumber
                                                size="large"
                                                placeholder="Fat"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-6">
                                    <Form.Item label="Carb">
                                        {getFieldDecorator('carb', {
                                        })(
                                            <InputNumber
                                                size="large"
                                                placeholder="Carb"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-6">
                                    <Form.Item label="Calories">
                                        {getFieldDecorator('calories', {
                                        })(
                                            <InputNumber
                                                size="large"
                                                placeholder="Calories"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-6">
                                    <Form.Item label="ID Meals">
                                        {getFieldDecorator('id_meals', {
                                            // rules: [{ required: true, message: 'Please input your Password!' }],
                                        })(
                                            <Select size="large">
                                                {mealsData.map((element, key) => {
                                                    return <Option key={key} value={element.id}>{element.title}</Option>
                                                })}
                                            </Select>
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-6">
                                    <Form.Item label="ID Ingredients">
                                        {getFieldDecorator('ingredientsArr', {
                                            // rules: [{ required: true, message: 'Please input your Password!' }],
                                        })(
                                            <Select mode="multiple"
                                                size="large">
                                                {ingredientsData.map((element, key) => {
                                                    return <Option key={key} value={element.id}>{element.title}</Option>
                                                })}
                                            </Select>
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-6">
                                    <Form.Item label="Description">
                                        {getFieldDecorator('description', {
                                            rules: [{ required: true, message: 'Please input description!' }],
                                        })(
                                            <TextArea
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

    const getMealsData = async () => {
        try {
            const data = await getAllMeals();
            return setMealsData(data)
        } catch (err) {
            console.log(err)
        }
    }


    const getIngredientsData = async () => {
        try {
            const data = await getAllIngredients();
            return setIngredientsData(data)
        } catch (err) {
            console.log(err)
        }
    }

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
                message.success(data.message)
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
                        if (data.status === 0) {
                            message.success(data.message)
                            getDishesData().then(() => props.form.resetFields())

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
                updateDishes(openedModal, values)
                    .then(data => {
                        if (data.status === 0) {
                            message.success(data.message)
                            getDishesData().then(() => props.form.resetFields())
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
                            <Form.Item label="Protein">
                                {getFieldDecorator('protein', {
                                    rules: [{ required: true, message: 'Please input protein!' }],
                                })(
                                    <InputNumber
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
                                    <InputNumber
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
                                    <InputNumber
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
                                    <InputNumber
                                        size="large"
                                        placeholder="Calories"
                                    />,
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-sm-6">
                            <Form.Item label="ID Meals">
                                {getFieldDecorator('id_meals', {
                                    // rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Select size="large">
                                        {mealsData.map((element, key) => {
                                            return <Option key={key} value={element.id}>{element.title}</Option>
                                        })}
                                    </Select>
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-sm-6">
                            <Form.Item label="ID Ingredients">
                                {getFieldDecorator('ingredientsArr', {
                                    // rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Select mode="multiple"
                                        size="large">
                                        {ingredientsData.map((element, key) => {
                                            return <Option key={key} value={element.id}>{element.title}</Option>
                                        })}
                                    </Select>
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-sm-6">
                            <Form.Item label="Description">
                                {getFieldDecorator('description', {
                                    rules: [{ required: true, message: 'Please input description!' }],
                                })(
                                    <TextArea
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
                        {dishesData &&
                            <Table
                                expandedRowRender={record => (
                                    <div>
                                        <p style={{ margin: 0 }}><b>Image url :</b> {record.image_url}</p>
                                        <p style={{ margin: 0 }}><b>Description :</b> {record.description}</p>
                                    </div>
                                )}
                                dataSource={dishesData}
                                columns={columns} />}
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

const DishesPage = Form.create({ name: 'dishes_form' })(DishesForm);

export default DishesPage