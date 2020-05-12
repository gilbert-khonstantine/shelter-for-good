import React, { Component } from 'react'
import MapGL, { Marker, Popup } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

const accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'; // Mapbox access token

const style = {
    padding: '4px',
    color: '#fff',
    cursor: 'pointer',
    background: 'red',
    borderRadius: '2px'
};


export default class dashboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploads: [],
            addressCount: {}
        }
        this.getAllUploads()
    }
    async getAllUploads() {
        await axios.get("/api/admin/getAllUploads")
            .then(res => {
                console.log("get all uploads function")
                console.log(res)
                console.log(res.data)
                let addCount = {}
                res.data.map(function (upload, i) {
                    if (addCount[upload.address] !== undefined) {
                        addCount[upload.address][0]++;
                    } else {
                        if (upload.coordinates) {
                            addCount[upload.address] = [1, upload.coordinates.longitude, upload.coordinates.latitude]
                        }
                    }
                })

                this.setState({
                    uploads: res.data,
                    addressCount: addCount
                })
                console.log("test")
                console.log(this.state.addressCount)
                console.log("test2")
                console.log(this.state)
            })
            .catch(err => {
                console.log(err)
            })
    }

    setMarkers() {
        {
            this.state.uploads.map(function (upload, i) {
                console.log(upload)
                if (upload.coordinates) {
                    return (
                        <Marker longitude={upload.coordinates.longitude} latitude={upload.coordinates.latitude}>
                            {/* <div style={style}>{this.state.addressCount[upload.address]}</div> */}
                            <div style={style}>1</div>
                        </Marker>
                    )
                }
            })
        }
    }

    getMarkers() {
        return (
            Object.entries(this.state.addressCount).map(([key, value], i) =>
                <Marker longitude={value[1]} latitude={value[2]}>
                    {/* <div style={style}>{this.state.addressCount[upload.address]}</div> */}
                    <div style={style}>{value[0]}</div>
                </Marker>
            )
        )
    }

    render() {
        return (
            <div className="container">
                <MapGL
                    style={{ width: '800px', height: '600px' }}
                    accessToken={accessToken}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    latitude={1.290270}
                    longitude={103.851959}
                    zoom={10}
                    onViewportChange={viewport => {
                    }}>
                    {this.getMarkers()}
                </MapGL>
            </div>
        )
    }
}