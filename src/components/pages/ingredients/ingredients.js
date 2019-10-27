import React, { useState, useEffect } from 'react'
import { Form, Input, message, Button, Table, Divider, Popconfirm } from 'antd'
import { getAllIngredients, createNewIngredients, deleteIngredients } from '../../../api/ingredients.api'

const { TextArea } = Input

const IngredientsForm = (props) => {

    const { getFieldDecorator } = props.form
    const [ingredientsData, setIngredientsData] = useState([])

    useEffect(() => {
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

    const getIngredientsData = async () => {
        try {
            const data = await getAllIngredients();
            return setIngredientsData(data)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteItem = id => {
        deleteIngredients(id).then(data => {
            if (data.status === 0) {
                message.success(data.message)
                getIngredientsData()
            }
            else message.error(data.message)
        })
    }

    const handleForm = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                createNewIngredients(values)
                    .then(data => {
                        if (data.status === 0) {
                            message.success(data.message)
                            getIngredientsData().then(() => props.form.resetFields())

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
                        {ingredientsData &&
                            <Table
                                expandedRowRender={record => (
                                    <p style={{ margin: 0 }}><b>Image url :</b> {record.image_url}</p>
                                )}
                                dataSource={ingredientsData}
                                columns={columns} />}
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

const IngredientsPage = Form.create({ name: 'ingredients_form' })(IngredientsForm);

export default IngredientsPage