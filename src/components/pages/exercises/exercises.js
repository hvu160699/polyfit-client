import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Select, Table, Divider, Popconfirm, message, InputNumber, Modal } from 'antd'
import { getAllLevel } from '../../../api/level.api';
import { getAllExercises, deleteExercises, createNewExercises, updateExercises } from '../../../api/exercises.api';
import { getAllBodyparts } from '../../../api/bodyparts.api';
const { Option } = Select;
const { TextArea } = Input;

const ExercisesForm = (props) => {

    const [exerData, setExerData] = useState([])
    const [levelData, setLevelData] = useState([])
    const [bodypartsData, setBodypartsData] = useState([])
    const [openedModal, setOpenedModal] = useState(false)

    const { getFieldDecorator } = props.form

    useEffect(() => {
        getLevelData()
        getBodypartsData()
        getExercisesData()
    }, [])

    const getLevelData = async () => {
        try {
            const data = await getAllLevel();
            return setLevelData(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const getBodypartsData = async () => {
        try {
            const data = await getAllBodyparts()
            return setBodypartsData(data)
        } catch (err) {
            console.log(err)
        }
    }

    const getExercisesData = async () => {
        try {
            const data = await getAllExercises();
            return setExerData(data)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteItem = id => {
        deleteExercises(id).then(data => {
            if (data.status === 0) {
                message.success(data.message)
                getExercisesData()
            }
            else message.error(data.message)
        })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Introduction',
            dataIndex: 'introduction',
            key: 'introduction',
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            ellipsis: true,
        },
        {
            title: 'Tips',
            dataIndex: 'tips',
            key: 'tips',
            ellipsis: true,
        },
        {
            title: 'Sets',
            dataIndex: 'sets',
            key: 'sets',
        },
        {
            title: 'Rest',
            dataIndex: 'rest',
            key: 'rest',
        },
        {
            title: 'Video url',
            dataIndex: 'video_url',
            key: 'video_url',
            ellipsis: true,
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
            key: 'polyfitLevelId',
        },
        {
            title: 'Bodyparts',
            dataIndex: 'bodyparts',
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
                                    <Form.Item label="Introduction">
                                        {getFieldDecorator('introduction', {
                                        })(
                                            <Input
                                                size="large"
                                                placeholder="Introduction"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-6">
                                    <Form.Item label="Content">
                                        {getFieldDecorator('content', {
                                        })(
                                            <TextArea
                                                rows={4}
                                                autoSize={true}
                                                placeholder="Content"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-6">
                                    <Form.Item label="Tips">
                                        {getFieldDecorator('tips', {
                                        })(
                                            <TextArea
                                                rows={4}
                                                autoSize={true}
                                                placeholder="Tips"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-6">
                                    <Form.Item label="Sets">
                                        {getFieldDecorator('sets', {
                                        })(
                                            <InputNumber
                                                size="large"
                                                placeholder="Sets"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-6">
                                    <Form.Item label="Reps">
                                        {getFieldDecorator('reps', {
                                        })(
                                            <InputNumber
                                                size="large"
                                                placeholder="Reps"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-6">
                                    <Form.Item label="Rest">
                                        {getFieldDecorator('rest', {
                                        })(
                                            <InputNumber
                                                width={"100%"}
                                                size="large"
                                                placeholder="Rest"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-6">
                                    <Form.Item label="Video url">
                                        {getFieldDecorator('video_url', {
                                        })(
                                            <Input
                                                size="large"
                                                placeholder="Video url"
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
                                <div className="col-sm-6">
                                    <Form.Item label="ID Bodyparts">
                                        {getFieldDecorator('bodypartsArr', {
                                        })(
                                            <Select mode="multiple" size="large">
                                                {bodypartsData.map((element, key) => {
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
    ];

    const showDetailItem = async (data) => {
        setOpenedModal(data.id)
        props.form.setFieldsValue(data)
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                createNewExercises(values)
                    .then(data => {
                        if (data.status === 0) {
                            message.success(data.message)
                            getExercisesData().then(() => props.form.resetFields())

                        } else message.error(data.message)
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        });
    }



    const handleEdit = e => {
        e.preventDefault()
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                updateExercises(openedModal, values)
                    .then(data => {
                        if (data.status === 0) {
                            message.success(data.message)
                            getExercisesData().then(() => props.form.resetFields())
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
                <Form onSubmit={handleSubmit}>
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
                            <Form.Item label="Introduction">
                                {getFieldDecorator('introduction', {
                                    rules: [{ required: true, message: 'Please input introduction!' }],
                                })(
                                    <Input
                                        size="large"
                                        placeholder="Introduction"
                                    />,
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-sm-6">
                            <Form.Item label="Content">
                                {getFieldDecorator('content', {
                                    rules: [{ required: true, message: 'Please input content!' }],
                                })(
                                    <TextArea
                                        rows={4}
                                        autoSize={true}
                                        placeholder="Content"
                                    />,
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-sm-6">
                            <Form.Item label="Tips">
                                {getFieldDecorator('tips', {
                                    rules: [{ required: true, message: 'Please input tips!' }],
                                })(
                                    <TextArea
                                        rows={4}
                                        autoSize={true}
                                        placeholder="Tips"
                                    />,
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-sm-6">
                            <Form.Item label="Sets">
                                {getFieldDecorator('sets', {
                                    rules: [{ required: true, message: 'Please input sets!' }],
                                })(
                                    <InputNumber
                                        size="large"
                                        placeholder="Sets"
                                    />,
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-sm-6">
                            <Form.Item label="Reps">
                                {getFieldDecorator('reps', {
                                    rules: [{ required: true, message: 'Please input reps!' }],
                                })(
                                    <InputNumber
                                        size="large"
                                        placeholder="Reps"
                                    />,
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-sm-6">
                            <Form.Item label="Rest">
                                {getFieldDecorator('rest', {
                                    rules: [{ required: true, message: 'Please input rest!' }],
                                })(
                                    <InputNumber
                                        width={"100%"}
                                        size="large"
                                        placeholder="Rest"
                                    />,
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-sm-6">
                            <Form.Item label="Video url">
                                {getFieldDecorator('video_url', {
                                    rules: [{ required: true, message: 'Please input Video url!' }],
                                })(
                                    <Input
                                        size="large"
                                        placeholder="Video url"
                                    />,
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-sm-6">
                            <Form.Item label="Image url">
                                {getFieldDecorator('image_url', {
                                    rules: [{ required: true, message: 'Please input Image url!' }],
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
                                    rules: [{ required: true, message: 'Please input ID Level!' }],
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
                        <div className="col-sm-6">
                            <Form.Item label="ID Bodyparts">
                                {getFieldDecorator('bodypartsArr', {
                                    rules: [{ required: true, message: 'Please input ID Bodyparts!' }],
                                })(
                                    <Select mode="multiple" size="large">
                                        {bodypartsData.map((element, key) => {
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
                            <Button type="primary" size="large" htmlType="submit" className="login-form-button">
                                Submit
                            </Button>
                        </div>
                    </div>
                </Form>

                <div className="row mt-4">
                    <div className="col-sm">
                        {exerData &&
                            <Table
                                key={exerData.id}
                                width={"100%"}
                                expandedRowRender={record => (
                                    <div>
                                        <p style={{ margin: 0 }}><b>Tips :</b> {record.tips}</p>
                                        <p style={{ margin: 0 }}><b>Content :</b> {record.content}</p>
                                        <p style={{ margin: 0 }}><b>Image url :</b> {record.image_url}</p>
                                        <p style={{ margin: 0 }}><b>Video url :</b> {record.video_url}</p>
                                    </div>
                                )}
                                dataSource={exerData}
                                columns={columns} />}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const ExercisesPage = Form.create({ name: 'exercises_form' })(ExercisesForm);

export default ExercisesPage