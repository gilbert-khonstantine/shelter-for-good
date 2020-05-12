import React, { Component } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

function Uploads(props) {
    return (
        <tr>
            <td>{props.uploads.email}</td>
            <td>{props.uploads.address}</td>
            <td>{props.uploads.zipCode}</td>
            <td>
                {(new Date(props.uploads.date)).getDate() + "-" + ((new Date(props.uploads.date)).getMonth() + 1) + "-" + (new Date(props.uploads.date)).getFullYear()}
            </td>
            <td>{props.uploads.description}</td>
            <td>
                <Link to={"/admin/view/" + props.uploads._id}>Details</Link>
            </td>

        </tr>
    )
}

export default class shelterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            uploads: [],
            emailAndIDPair: {}
        }
    }

    getUserAndUploads() {
        //get all user info
        let emailIDPair = {}
        axios.get("/api/admin/getAllUsers")
            .then(res => {
                res.data.map(function (user, i) {
                    emailIDPair[user._id] = user.email
                })
                this.setState({
                    users: res.data,
                    emailAndIDPair: emailIDPair
                })
            })
            .catch(err => {
                console.log(err)
            })

        //get all uploads by any user
        let uploadTemp = {}
        axios.get("/api/admin/getAllUploads")
            .then(res => {
                uploadTemp = res.data
                uploadTemp.map(function (upload, i) {
                    uploadTemp[i]['email'] = emailIDPair[upload.personID]
                })
                this.setState({
                    uploads: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentWillMount() {
        this.getUserAndUploads()
    }

    getTable() {
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
                            <th>User Email</th>
                            <th>Address</th>
                            <th>Zip Code</th>
                            <th>Date (DD-MM-YYYY)</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getTable()}
                    </tbody>
                </table>
            </div>
        )
    }
}