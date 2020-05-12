import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function Uploads(props) {
    function onDelete(e) {
        e.preventDefault();
        axios.delete("/api/user/removeUploads/" + props.uploads._id)
    }

    return (
        <tr>
            <td>{props.uploads.address}</td>
            <td>{props.uploads.zipCode}</td>
            <td>
                {(new Date(props.uploads.date)).getDate() + "-" + ((new Date(props.uploads.date)).getMonth() + 1) + "-" + (new Date(props.uploads.date)).getFullYear()}
            </td>
            <td>{props.uploads.description}</td>
            {/* <td>{props.uploads.imgPath ? <Link to={require("../uploads/1589183504824-MLA_result.png")}>  View </Link> : "No Image Posted"}</td> */}
            <td>
                <Link to={"/user/edit/" + props.uploads._id}>Details/Edit</Link>
                <br />
                <a onClick={onDelete} href={"/user/historical-uploads"}>Remove</a>
            </td>
        </tr>
    )
}


export default class historicalUploads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploads: []
        }
    }

    getDataFromDB() {
        axios.get("/api/user/getUploads/" + localStorage.id)
            .then((res) => {
                console.log(res.data)
                this.setState({
                    uploads: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.getDataFromDB()
    }

    componentDidUpdate() {
        this.getDataFromDB()
    }

    getUploads() {
        return this.state.uploads.map(function (upload, i) {
            return <Uploads uploads={upload} key={i} />
        })
    }

    render() {
        return (
            <div className="container">
                <h1>Historical Submissions</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Address</th>
                            <th>Zip Code</th>
                            <th>Date (DD-MM-YYYY)</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getUploads()}
                    </tbody>
                </table>
            </div>
        )
    }
}