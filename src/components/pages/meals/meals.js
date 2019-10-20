import React, { useState, useEffect } from 'react'
import { Form, Input, message, Button, Table, Divider, Popconfirm, Select } from 'antd'
import { getAllMeals, deleteMeals, createNewMeals } from '../../../api/meals.api'
import { getAllDiets } from '../../../api/diets.api'

const { Option } = Select

const MealsForm = (props) => {

    const { getFieldDecorator } = props.form
    const [mealsData, setMealsData] = useState([])
    const [dietsData, setDietsData] = useState([])

    useEffect(() => {
        getDietsData()
        getMealsData()
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndexL: 'id',
            key: 'id'
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'ID Diets',
            dataIndex: 'id_diets',
            key: 'id_diets'
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
                        console.log(data)
                        if (data.status === 0) {
                            message.success(data.message)
                            getMealsData()
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
                            <Form.Item label="ID Meals">
                                {getFieldDecorator('id_meals', {
                                    // rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Select size="large">
                                        {dietsData.map((element, key) => {
                                            // console.log(element)
                                            return <Option key={key} value={element.title}>{element.title}</Option>
                                        })}
                                    </Select>
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
                        {mealsData && <Table dataSource={mealsData} columns={columns} />}
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

const MealsPage = Form.create({ name: 'Meals_form' })(MealsForm);

export default MealsPage