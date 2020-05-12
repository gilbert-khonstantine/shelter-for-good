import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Geocoder from 'react-mapbox-gl-geocoder'
import axios from 'axios'
import path from 'path'

const mapAccess = {
    // mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN
    mapboxApiAccessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
}

const mapStyle = {
    width: '100%',
    height: 600
}

const queryParams = {
    country: 'sg'
}


export default class editUpload extends Component {
    constructor(props) {
        super(props);

        this.OnChangeZip = this.OnChangeZip.bind(this);
        this.OnChangeDescription = this.OnChangeDescription.bind(this);
        this.OnChangeDate = this.OnChangeDate.bind(this);
        this.OnChangeAddress = this.OnChangeAddress.bind(this);
        this.onPhotoChange = this.onPhotoChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);

        this.state = {
            address: "",
            zipCode: "",
            date: "",
            description: "",
            file: null,
            viewport: {},
            personID: "",
            imgPath: "",
            id: ""
        }
    }

    OnChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onPhotoChange(e) {
        this.setState({ file: e.target.files[0] });
    };

    OnChangeZip(e) {
        this.setState({
            zipCode: e.target.value
        });
    }

    OnChangeDate(e) {
        this.setState({
            date: e.target.value
        });
    }

    OnChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onSelected = (viewport, item) => {
        this.setState({
            viewport: viewport,
            address: item.place_name,
            zipCode: item.context[0].text,
            personID: localStorage.getItem("id")
        });
    }

    async componentWillMount() {
        await axios.get('/api/user/getUpload/' + this.props.match.params.id)
            .then((res) => {
                this.setState({
                    address: res.data[0].address,
                    date: res.data[0].date,
                    description: res.data[0].description,
                    zipCode: res.data[0].zipCode,
                    imgPath: res.data[0].imgPath,
                    personID: res.data[0].personID,
                    id: res.data[0]._id,
                    file: res.data[0].file
                })
                console.log(this.state)
                console.log("img path")
                console.log(this.state.imgPath)
                // console.log(path.join(path.dirname, "uploads", this.state.imgPath))
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async handleSubmit(e) {
        e.preventDefault()
        console.log(`Form submitted:`);
        console.log(this.state);
        // Update the formData object 
        if (this.state.file != null) {
            const data = new FormData()
            data.append('file', this.state.file)
            console.log("file data", data)

            await axios.post("/api/user/imageUploads", data, {})
                .then((res) => {
                    console.log(res.statusText)
                    this.setState({
                        imgPath: res.data.filename
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        axios.post("/api/user/edit/" + this.state.id, this.state)
            .then((res) => {
                console.log(res.statusText)
            })
            .catch((err) => {
                console.log(err)
            })

        this.setState({
            address: "",
            zipcode: "",
            date: "",
            description: "",
            imgPath: "",
            file: null
        });
    }

    onFileChange(e) {
        this.setState({
            file: e.target.files[0]
        })
    }

    render() {
        return (
            <BrowserRouter >
                <div className="container">
                    <h3>Upload</h3>
                    <form onSubmit={this.handleSubmit}>
                        {localStorage.getItem("domain") === "admin" ? <br /> :
                            <div className="form-group">
                                <p>Type here to autofill your location</p>
                                <Geocoder
                                    {...mapAccess} onSelected={this.onSelected} hideOnSelect={false}
                                    queryParams={queryParams} viewport={this.state.viewport}
                                />
                            </div>
                        }
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" value={this.state.address} onChange={this.OnChangeAddress} readOnly={localStorage.getItem("domain") === "admin" ? true : false} />
                        </div>
                        <div className="form-group">
                            <label>Zipcode</label>
                            <input type="text" className="form-control" value={this.state.zipCode} onChange={this.OnChangeZip} readOnly={localStorage.getItem("domain") === "admin" ? true : false} />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" className="form-control" value={this.state.date} onChange={this.OnChangeDate} readOnly={localStorage.getItem("domain") === "admin" ? true : false} />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea id="story" className="form-control" value={this.state.description} onChange={this.OnChangeDescription} readOnly={localStorage.getItem("domain") === "admin" ? true : false}
                                rows="5" cols="50">
                            </textarea>
                        </div>
                        <div className="form-group">
                            <label>Photo</label>
                            <br />
                            {this.state.imgPath ? <img src={require("../uploads/" + this.state.imgPath)} /> : "No image was posted"}
                        </div>
                        {/* <div className="form-group">

                        </div> */}
                        {localStorage.getItem("domain") === "admin" ? <br /> :
                            <div>
                                <input type="file" onChange={this.onFileChange} readOnly={localStorage.getItem("domain") === "admin" ? true : false} />
                                <br />
                                <br />
                                <input type="submit" className="btn btn-primary" value="Submit" />
                            </div>
                        }
                    </form>
                </div>
            </BrowserRouter>

        )
    }
}