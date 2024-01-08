import React, { Component } from "react";
import UserService from "../services/UserService";
import Swal from "sweetalert2"

class CreateUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      nama_barang: "",
      jumlah: "",
      harga_satuan: "",
      lokasi: "",
      deskripsi: "",
    };
    this.changenama_barang = this.changenama_barang.bind(this);
    this.changejumlah = this.changejumlah.bind(this);
    this.changeharga_satuan = this.changeharga_satuan.bind(this);
    this.changelokasi = this.changelokasi.bind(this);
    this.changedeskripsi = this.changedeskripsi.bind(this);
    this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
  }

  // step 3
  componentDidMount() {
    // step 4
    if (this.state.id === "_add") {
      return;
    } else {
      UserService.GetItem(this.state.id).then((res) => {
        let user = res.data;
        this.setState({
          nama_barang: user.nama_barang,
          jumlah: user.jumlah,
          harga_satuan: user.harga_satuan,
          lokasi: user.lokasi,
          deskripsi: user.deskripsi
        });
      });
    }
  }

  saveOrUpdateUser = (e) => {
    e.preventDefault();
    let user = {
      nama_barang: this.state.nama_barang,
      jumlah: this.state.jumlah,
      harga_satuan: this.state.harga_satuan,
      lokasi: this.state.lokasi,
      deskripsi: this.state.deskripsi
    };
    console.log("user => " + JSON.stringify(user));

    // step 5
    if (this.state.id === "_add") {
      UserService.CreateItem(user).then((res) => {
        this.props.history.push("/users");
        Swal.fire(
          'success',
          'Added Successfully',
          'success'
        )
      });
    } else {
      UserService.UpdateItem(user, this.state.id).then((res) => {
        this.props.history.push("/users");
        Swal.fire(
          'success',
          'Updated Successfully',
          'success'
        )
      });
    }
  };

  changenama_barang = (event) => {
    this.setState({ nama_barang: event.target.value });
  };

  changejumlah = (event) => {
    this.setState({ jumlah: event.target.value });
  };

  changeharga_satuan = (event) => {
    this.setState({ harga_satuan: event.target.value });
  };

  changelokasi = (event) => {
    this.setState({ lokasi: event.target.value });
  };

  changelokasi = (event) => {
    this.setState({ lokasi: event.target.value });
  };

  changedeskripsi = (event) => {
    this.setState({ deskripsi: event.target.value });
  };

  cancel() {
    this.props.history.push("/users");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add New Inventory</h3>;
    } else {
      return <h3 className="text-center">Update transaction</h3>;
    }
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Nama Barang </label>
                    <input
                      placeholder=" "
                      name="nama_barang"
                      className="form-control"
                      value={this.state.nama_barang}
                      onChange={this.changenama_barang}
                    />
                  </div>
                  <div className="form-group">
                    <label> Jumlah </label>
                    <input
                      type="number"
                      placeholder="jumlah"
                      name="jumlah"
                      className="form-control"
                      value={this.state.jumlah}
                      onChange={this.changejumlah}
                    />
                  </div>
                  <div className="form-group">
            <label> Harga Satuan </label>
            <input
              type="number"
              placeholder="harga satuan"
              name="harga_satuan"
              className="form-control"
              value={this.state.harga_satuan}
              onChange={this.changeharga_satuan}
            />
          </div>
               
                    <div className="form-group">
                    <label> Lokasi </label>
                    <select
                      name="lokasi"
                      className="form-control"
                      value={this.state.lokasi}
                      onChange={this.changelokasi}
                    >
                      <option>....</option>
                      <option value="Manokwari">MANOKWARI</option>
                      <option value="Bandung">BANDUNG</option>
                      <option value="Jakarta">JAKARTA</option>
                      <option value="Denpasar">DENPASAR</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label> Deskripsi </label>
                    <input
                      placeholder="desc"
                      name="deskripsi"
                      className="form-control"
                      value={this.state.deskripsi}
                      onChange={this.changedeskripsi}
                    />
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateUser}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUserComponent;