import React, { Component } from "react";
import UserService from "../services/UserService";

class ViewUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {},
    };
  }

  componentDidMount() {
    UserService.GetItem(this.state.id).then((res) => {
      this.setState({ user: res.data });
    });
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center">View Details</h3>
          <div className="card-body">
            <div className="row">
              <label> Nama Barang : </label>
              <div> &nbsp; {this.state.user.nama_barang}</div>
            </div>
            <div className="row">
              <label> Jumlah : </label>
              <div> &nbsp; {this.state.user.jumlah}</div>
            </div>
            <div className="row">
              <label> Harga Satuan : </label>
              <div>&nbsp;Rp {Number(this.state.user.harga_satuan).toLocaleString('id-ID')}</div>
            </div>
            <div className="row">
              <label> Lokasi : </label>
              <div> &nbsp; {this.state.user.lokasi}</div>
            </div>
            <div className="row">
              <label> Deskripsi : </label>
              <div> &nbsp; {this.state.user.deskripsi}</div>
            </div>
      
            </div>
          </div>
        </div>
      
    );
  }
}

export default ViewUserComponent;