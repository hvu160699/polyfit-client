import React from 'react'

const LevelPage = () => {
    return (
        <div className="container">
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" aria-describedby="titleHelp" placeholder="Enter title" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" aria-describedby="descriptionHelp" placeholder="Enter description" />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="text" className="form-control" id="image" aria-describedby="imageHelp" placeholder="Enter image" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default LevelPage;
