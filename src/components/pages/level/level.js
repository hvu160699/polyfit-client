import React, { useEffect, useState } from 'react'
import { getAllLevel, createNewLevel, deleteLevel } from '../../../api/level.api'
import { message, Icon, Modal } from 'antd'

const { confirm } = Modal


const LevelPage = () => {

    const [levelData, setLevelData] = useState([])

    const loadingData = async () => {
        try {
            const data = await getAllLevel();
            return setLevelData(data);
        }
        catch (err) {
            return console.log(err);
        }
    }

    useEffect(() => {
        loadingData()
    }, [])

    const handleForm = e => {
        e.preventDefault()

        const data = new FormData(e.target)

        const values = {
            title: data.get('title'),
            description: data.get('description'),
            image: data.get('image')
        }

        createNewLevel(values)
            .then(data => {
                if (data.status === 0) {
                    message.success(data.message)
                    loadingData()
                } else message.error(data.message)
            })
            .catch(err => {
                console.log(err)
            });
    }

    const editItem = () => {

    }

    const deleteItem = id => {
        confirm({
            title: "Are you sure to delete this item ?",
            onOk() {
                deleteLevel(id).then(data => {
                    if (data.status === 0) {
                        message.success(data.message)
                        loadingData()
                    }
                    else message.error(data.message)
                })
            },
            onCancel() {
                message.info("Cancelled!")
            }
        })
    }

    return (
        <div className="container">
            <form onSubmit={handleForm}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" className="form-control" aria-describedby="titleHelp" placeholder="Enter title" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" className="form-control" aria-describedby="descriptionHelp" placeholder="Enter description" />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="text" id="image" name="image" className="form-control" aria-describedby="imageHelp" placeholder="Enter image" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <br />

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Image Url</th>
                        <th scope="col">Description</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {levelData && levelData.map((element, i) => {
                        return <tr key={i}>
                            <td>{element.id}</td>
                            <td>{element.title}</td>
                            <td>{element.image}</td>
                            <td>{element.description}</td>
                            <td><Icon type="edit" onClick={() => editItem()} /></td>
                            <td><Icon type="delete" onClick={() => deleteItem(element.id)} /></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default LevelPage;
