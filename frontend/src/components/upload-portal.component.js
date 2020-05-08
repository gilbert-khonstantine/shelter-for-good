import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Geocoder from 'react-mapbox-gl-geocoder'
import axios from 'axios'

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


export default class uploadPage extends Component {
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
            photo: "",
            viewport: {},
            personID: "",
        }
    }

    OnChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onPhotoChange(e) {
        this.setState({ photo: e.target.files[0] });
    };

    OnChangeZip(e) {
        this.setState({
            zipcode: e.target.value
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

    handleSubmit(e) {
        e.preventDefault()
        console.log(`Form submitted:`);
        console.log(this.state);
        let formData = new FormData();
        // Update the formData object 
        if (this.state.photo != null) {
            formData.append(
                "myFile",
                this.state.photo,
                this.state.photo.name
            );
        }

        axios.post("http://localhost:4000/api/user/upload", this.state)
            .then((res) => {
                console.log("POST request sent!")
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
                console.log(err.response)
            })

        this.setState({
            address: "",
            zipcode: "",
            date: "",
            description: "",
            photo: ""
        });
    }

    onFileChange(e) {
        this.setState({ photo: e.target.files[0] })
    }

    render() {
        return (
            <BrowserRouter >
                <div className="container">
                    <h3>Upload</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            {/* <Switch>
                                <Route exact path="/user/upload" component={Map} />
                                <Route exact path="/user/upload" component={SearchableMap} />
                            </Switch> */}
                            <p>Type here to autofill your location</p>
                            <Geocoder
                                {...mapAccess} onSelected={this.onSelected} hideOnSelect={false}
                                queryParams={queryParams} viewport={this.state.viewport}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" value={this.state.address} onChange={this.OnChangeAddress} />
                        </div>
                        <div className="form-group">
                            <label>Zipcode</label>
                            <input type="text" className="form-control" value={this.state.zipCode} onChange={this.OnChangeZip} />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" className="form-control" value={this.state.date} onChange={this.OnChangeDate} />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea id="story" className="form-control" value={this.state.description} onChange={this.OnChangeDescription}
                                rows="5" cols="50">
                            </textarea>
                        </div>
                        {/* <div className="form-group">
                            <label>Photo</label>
                            <br />
                            <input type="file" id="img" onChange={this.onPhotoChange} name="img" accept="image/*" />
                        </div> */}
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                        </div>
                        <div>
                            <input type="submit" className="btn btn-primary" value="Submit" />
                        </div>
                    </form>
                </div>
            </BrowserRouter>

        )
    }
}