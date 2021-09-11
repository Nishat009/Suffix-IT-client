import React, { useEffect, useState } from "react";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import "./Users.css";
import { Form } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { IconButton, TablePagination } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import { useHistory } from "react-router-dom";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#2d2d86",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#d9d9f2",
      border: "1px",
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Users = () => {
  const [info, setInfo] = useState({});
  const [user, setUser] = useState([]);
  const [dbStatus, setDbStatus] = useState(false);
  const [values, setValues] = useState({
    password: "******",
    showPassword: false,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  // .......................

  const handleBlur = (e) => {
    const newInfo = { ...info };
    newInfo[e.target.name] = e.target.value;
    setInfo(newInfo);
  };

  // loading data in table
  const userInfo = () => {
    fetch("https://enigmatic-reef-50378.herokuapp.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  };
  // .........................

  // fetch data
  useEffect(() => {
    fetch("https://enigmatic-reef-50378.herokuapp.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  // ..............................

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      userName: e.target.userName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    if (e.target.firstName.value === "") {
      alert("first name can't be blank");
    } else if (e.target.lastName.value === "") {
      alert("last name can't be blank");
    } else if (e.target.userName.value === "") {
      alert("user name can't be blank");
    } else if (e.target.email.value === "") {
      alert("email can't be blank");
    } else if (e.target.password.value === "") {
      alert("password name can't be blank");
    } else {
      try {
        const res = await axios.post(
          "https://enigmatic-reef-50378.herokuapp.com/addUser",
          userData
        );
        if (res) {
          setDbStatus(res);
          e.target.reset();
          alert("User added successfully");
          userInfo();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  // ..............................

  //  delete
  const handleDelete = (id) => {
    fetch(`https://enigmatic-reef-50378.herokuapp.com/deleteUser/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          deleteUser();
          alert("Are you sure to delete this data?");
        }
      });
  };
  const deleteUser = () => {
    fetch(`https://enigmatic-reef-50378.herokuapp.com/users`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  };

  // .......................

  const history = useHistory();
  const handleUpdate = (id) => {
    history.push(`/updateUsers/${id}`);
  };

  const classes = useStyles();

  const handleClickShowPassword = (id) => {
    setValues({ ...values, showPassword: !values.showPassword });
    console.log(id);
  };

  var i = 1;

  // ............................................

  return (
    <div className="container mt-5">
      <p className="header text-center">
        <SupervisedUserCircleIcon />
        User Management
      </p>

      <Form onSubmit={handleSubmit} className="form m-auto">
        <Form.Group className="mb-3">
          <Form.Control
            onBlur={handleBlur}
            name="firstName"
            type="text"
            placeholder="First Name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            onBlur={handleBlur}
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            onBlur={handleBlur}
            name="userName"
            type="text"
            placeholder="Username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            onBlur={handleBlur}
            name="email"
            type="email"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            onBlur={handleBlur}
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button className="btn  w-100" type="submit">
          Create User
        </Button>
      </Form>

      <div className="table">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>

                <StyledTableCell align="left">First Name</StyledTableCell>
                <StyledTableCell align="left">Last Name</StyledTableCell>
                <StyledTableCell align="left">UserName</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Password</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((u) => (
                  <StyledTableRow key={u.name} className={classes.tables}>
                    <StyledTableCell component="th" scope="row">
                      {i++}
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      {u.firstName}
                    </StyledTableCell>
                    <StyledTableCell align="left">{u.lastName}</StyledTableCell>
                    <StyledTableCell align="left">{u.userName}</StyledTableCell>
                    <StyledTableCell align="left">{u.email}</StyledTableCell>
                    <StyledTableCell align="left">
                      <div className="d-flex">
                        <div className="pass">
                          {values.showPassword ? "" : values.password}
                          {values.showPassword ? u.password : ""}
                        </div>

                        <IconButton onClick={() => handleClickShowPassword()}>
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className="d-flex">
                        <CreateIcon
                          onClick={() => handleUpdate(u._id)}
                          className="icon"
                        />

                        <DeleteIcon
                          className="delete"
                          onClick={() => handleDelete(u._id)}
                        />
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={user.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default Users;
