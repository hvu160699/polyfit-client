import React, { useState, useEffect } from 'react'
import { Form, Input, message, Button, Table, Divider, Popconfirm } from 'antd'
import { getAllLevel, createNewLevel, deleteLevel } from '../../../api/level.api'

const LevelForm = (props) => {

    const { getFieldDecorator } = props.form
    const [levelData, setLevelData] = useState([])

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