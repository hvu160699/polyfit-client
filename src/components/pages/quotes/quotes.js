import React, { useState, useEffect } from 'react'
import { Form, Input, message, Button, Table, Divider, Popconfirm } from 'antd'
import { getAllQuotes, deleteQuotes, createNewQuotes } from '../../../api/quotes.api'

const QuotesForm = (props) => {

    const { getFieldDecorator } = props.form
    const [quotesData, setQuotesData] = useState([])

    useEffect(() => {
        getQuotesData()
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

    const getQuotesData = async () => {
        try {
            const data = await getAllQuotes()
            return setQuotesData(data)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteItem = id => {
        deleteQuotes(id).then(data => {
            if (data.status === 0) {
                message.success(data.message)
                return getQuotesData()
            }
            else message.error(data.message)
        })
    }

    const handleForm = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                createNewQuotes(values)
                    .then(data => {
                        if (data.status === 0) {
                            message.success(data.message)
                            getQuotesData().then(() => props.form.resetFields())

                        } else message.error(data.message)
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        });
    }

    // const showDetailItem = async (data) => {
    //     setOpenedModal(data.id)
    //     props.form.setFieldsValue(data)
    // }

    return (
        <React.Fragment>
            <div className="container">
                <Form onSubmit={handleForm}>
                    <div className="row">
                        <div className="col-sm-6">
                            <Form.Item label="Title">
                                {getFieldDecorator('title', {
                                    // rules: [{ required: true, message: 'Please input title!' }],
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
                                {getFieldDecorator('image_url', {
                                    rules: [{ required: true, message: 'Please input image!' }],
                                })(
                                    <Input
                                        size="large"
                                        placeholder="image"
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
                        {quotesData &&
                            <Table
                                expandedRowRender={record => (
                                    <p style={{ margin: 0 }}><b>Image url :</b> {record.image_url}</p>
                                )}
                                dataSource={quotesData}
                                columns={columns} />}
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

const QuotesPage = Form.create({ name: 'Quotes_form' })(QuotesForm);

export default QuotesPage