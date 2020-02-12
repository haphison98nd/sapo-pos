import React, {Component}  from 'react';
import moment from "moment";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

class OrderDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            infoOrder: [],
            productOrder: []
        }
    }
    componentDidMount(){
        const { id } = this.props.match.params;

        fetch(`http://localhost:8291/order/${id}`)
          .then(response => {
            return response.json();
          })
          .then(result => {
            this.setState({
              infoOrder: result
            });
          });

        fetch(`http://localhost:8291/ordername/${id}`)
          .then(response => {
            return response.json();
          })
          .then(result => {
            this.setState({
              productOrder: result
            });
          });
    }
    render() {   
        const { infoOrder, productOrder } = this.state;
        console.log(infoOrder);
        
        // const elminfoCustomer = infoOrder.map((itemInfoOrder, key) => {
        //     return (
        //       <tr key={key}>
        //         <td> {itemInfoOrder.nameCustomer} </td>
        //         <td> {itemInfoOrder.phoneNumber} </td>
        //         <td> {itemInfoOrder.totalAmount} </td>
        //         <td> {itemInfoOrder.totalAmount} </td>
        //       </tr>
        //     );
        // });

        const elmProductOrder = productOrder.map((itemproduct, key) => {
            return (
              <tr key={key}>
                <td> {itemproduct.productcode} </td>
                <td> {itemproduct.nameProduct} </td>
                <td> {itemproduct.amount} </td>
                <td> <NumberFormat value={itemproduct.price} displayType={'text'} thousandSeparator={true} /> đ </td>
              </tr>
            );
        });
        return (
            <div className="col-md-12 col-sm-12 col-xs-12" style={{ marginBottom: '5px', marginTop: '20px' }}>
                <h3 className="page-title" style={{ marginBottom: '20px' }}>Chi tiết đơn hàng</h3>
                <p className="time-order">
                    {moment(infoOrder.dateSale).format('MMMM Do YYYY, h:mm:ss a')}
                </p>
                <div className="row">
                    <div className="col-md-6 page-info" >
                        <div className = "portlet box green-meadow"> 
                            <h4>
                                Thông tin sản phẩm
                            </h4>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col"> Mã sản phẩm </th>
                                        <th scope="col"> Tên sản phẩm </th>
                                        <th scope="col"> Số lượng </th>
                                        <th scope="col"> Đơn giá </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {elmProductOrder}
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                    <div className="col-md-6" >
                        <div className = "portlet box green-meadow">
                            <h4>
                                Thông tin khách hàng
                            </h4>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col"> Tên khách hàng </th>
                                        <th scope="col"> Số điện thoại </th>
                                        <th scope="col"> Tổng hóa đơn </th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                        <td> {infoOrder.nameCustomer} </td>
                                        <td> <NumberFormat value = {infoOrder.phoneNumber} displayType={'text'} format=" 0## ### ####" />  </td>
                                        <td> 
                                            <NumberFormat value={infoOrder.totalAmount} displayType={'text'} thousandSeparator={true} /> đ </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
                <Link to ="/orderList"><button type="submit" className="btn btn-danger"> Quay lại</button></Link>&nbsp;
            </div>

        );
    }
}

export default OrderDetail;