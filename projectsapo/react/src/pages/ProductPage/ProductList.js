import React, { Component } from 'react';
import '../../App.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProducts: [],
      activePage:1,
      totalPages: null,
      itemsCountPerPage:null,
      totalItemsCount:null
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.fetchURL = this.fetchURL.bind(this);
  }

  fetchURL(page) {

    axios.get(`http://localhost:8291/products?page=${page-1}&size=2`)
      .then( response => {
          const totalPages = response.data.totalPages;
          const itemsCountPerPage = response.data.size;
          const totalItemsCount = response.data.totalElements;

          this.setState({totalPages: totalPages})
          this.setState({totalItemsCount: totalItemsCount})
          this.setState({itemsCountPerPage: itemsCountPerPage})

          const results = response.data.content;
          this.setState({listProducts: results});
          console.log(this.state.listProducts);
          
        }
      )
    }


handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber})
    this.fetchURL(pageNumber)

}
  componentDidMount() {
    document.title = 'Danh sách sản phẩm';
    this.fetchURL(this.state.activePage)
  }

  render() {
    // console.log(this.state.listProducts);
    let elements = this.state.listProducts.map((value, key) => {
      return (
        <tr key={key}>
          <td>
            <Link
              to={"/product/id=" + value.idproduct}
              title={value.name_product}
              style={{ color: "black", cursor: "pointer" }}
            >
              {" "}
              {value.name_product}
            </Link>
          </td>
          <td>{value.product_code}</td>
          <td>{value.inventory_number}</td>
          <td>{value.price} đồng</td>
          <td>{value.date_created}</td>
        </tr>
      );
    })


    return (
      <div className="col-md-12 col-sm-12 col-xs-12" style={{ marginBottom: '5px', marginTop: '20px' }}>
        <div className="d-flex justify-content-between" >
          <h3 className="page-title">Quản lý sản phẩm <Link to='/product/add'>
            <button type="button" className="btn btn-primary">Thêm sản phẩm</button></Link> </h3>
        </div>

        <div className="portlet box green-meadow">
          <div className="title-product"><h5>Danh sách sản phẩm</h5></div>
          <div className="portlet-body">
            <div className="table-responsive">
              <div id="news-grid" className="grid-view">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Tên sản phẩm</th>
                      <th>Mã sản phẩm</th>
                      <th>Số lượng tồn</th>
                      <th>Giá bán</th>
                      <th>Ngày tạo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {elements}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-left">
                <Pagination
                  hideDisabled
                  activePage={this.state.activePage}
                  itemsCountPerPage={this.state.itemsCountPerPage}
                  totalItemsCount={this.state.totalItemsCount}
                  pageRangeDisplayed={5}
                  linkClass='btn btn-light'
                  onChange={this.handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductList;
