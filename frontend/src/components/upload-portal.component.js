import React, { Component } from 'react'

export default class uploadPage extends Component {
    constructor(props) {
        super(props);

        this.OnChangeZip = this.OnChangeZip.bind(this);
        this.OnChangeDescription = this.OnChangeDescription.bind(this);
        this.OnChangeDate = this.OnChangeDate.bind(this);
        this.OnChangeAddress = this.OnChangeAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            address: "",
            zipcode: "",
            date: "",
            description: ""
            // photo: ""
        }
    }

    OnChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

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

    handleSubmit(e) {
        e.preventDefault()
        console.log(`Form submitted:`);
        console.log(this.state);

        this.setState({
            address: "",
            zipcode: "",
            date: "",
            description: ""
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Upload the location and image</h1 >
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" value={this.state.address} onChange={this.OnChangeAddress} />
                    </div>
                    <div className="form-group">
                        <label>Zipcode</label>
                        <input type="text" className="form-control" value={this.state.zipcode} onChange={this.OnChangeZip} />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input type="date" className="form-control" value={this.state.date} onChange={this.OnChangeDate} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" className="form-control" value={this.state.description} onChange={this.OnChangeDescription} />
                    </div>
                    <div className="form-group">
                        <label>Photo</label>
                        <input type="image" className="form-control" />
                    </div>
                    <div>
                        <input type="submit" className="btn btn-primary" value="Submit" />
                    </div>
                </form>
            </div>
        )
    }
}