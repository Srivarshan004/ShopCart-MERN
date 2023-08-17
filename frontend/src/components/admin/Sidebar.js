import { NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul>
          <li>
            <Link to="/admin/dashboard"><i className="fa fa-dashboard"></i> Dashboard</Link>
          </li>

          <li>
            <NavDropdown title={
              <i className="bi bi-database-fill-gear"> <span>Products</span></i>}>
              <NavDropdown.Item onClick={() => navigate('/admin/products')}>
                <i className="bi bi-clipboard2-data"></i> All
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/admin/product/create')}>
                  <i className="bi bi-plus-lg"></i> Create
              </NavDropdown.Item>
            </NavDropdown>
          </li>

          <li>
            <Link to="/admin/orders"><i className="bi bi-cart-check-fill"></i> Orders</Link>
          </li>

          <li>
            <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
          </li>

          <li>
            <Link to="/admin/reviews"><i class="bi bi-chat-square-text-fill"></i> Reviews</Link>
          </li>

        </ul>
      </nav>
    </div>
  )
}

export default Sidebar;