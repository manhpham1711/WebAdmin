import React, { Component } from 'react';
import { withRouter } from 'react-router';

class EditPlace extends Component {
    constructor(props) {
        super(props);
        let place_id = localStorage.getItem("place_id");
        this.state = {
            place: []
        }
        this.getUser(place_id);
        this.changeValue = this.changeValue.bind(this);
        this.Update = this.Update.bind(this);
    }
    

    getUser(id) {
        fetch(`https://eat2gether-api.herokuapp.com/api/places/${id}`, {
            method: "get",
            headers: {
                "Authorization": id
            },
        })
            .then(response => {
                response.json().then((data) => {
                    console.log(data);
                    this.updateUI(data);
                });
            }).catch(err => {
                console.log(err.response);
            });
    }
    updateUI(data) {
        this.setState({
            place: data.place
        })
    }
    changeValue(event) {
        this.setState({
            place: event.target.value
        })
    }
    Update(event) {
        // event.preventDefault();
        let name = event.target["name"].value;
        let address = event.target["address"].value;

        let info = new FormData();
        info.append('name', name);
        info.append('address', address);

        // let idLove = this.props.match.params.id;
        // fetch("http://127.0.0.1:8000/api/update/" + idLove, {
        //     method: "post",
        //     body: info
        // })
        //     .then(response => response.json())
        //     .then((response) => {
        //         console.log(response); 
                
        //         // 
            // });// e chưa mần api chỗ này
            alert("Update thành công");
            this.props.history.push("http://localhost:3000/#/places");
        

    }
    render() {
        let place = this.state.place;
        return (
            <div className="Update">
                <form onSubmit={this.Update}>
                    <p>Tên nhà hàng</p>
                    <input type="text" name="name" onChange={this.changeValue} value={place.name} />
                    <p>Địa chỉ</p>
                    <input type="text" name="address" onChange={this.changeValue} value={place.address} />
                    <input type="submit" name="update" value="Thay đổi" />
                </form>
            </div>
        )
    }
}
export default withRouter(EditPlace);