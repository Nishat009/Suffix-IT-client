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
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { useHistory, useParams } from "react-router";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const UpdateUser = () => {
  const [info, setInfo] = useState({});
  const [user, setUser] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [dbStatus, setDbStatus] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { id } = useParams();

  // fetch data
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  // show data without reload
  //   const usersInfo = () => {
  //     fetch("http://localhost:5000/users")
  //       .then((res) => res.json())
  //       .then((data) => setUser(data));
  //   };

  // update information
  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get(`http://localhost:5000/updateUser/${id}`);
      setUserInfo(res.data);
    };
    loadData();
  }, [id]);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // submit
  const handleUserClick = async (id) => {
    const updateStudent = {
      id,
      firstName: firstName || userInfo.firstName,
      lastName: lastName || userInfo.lastName,
      userName: userName || userInfo.userName,
      email: email || userInfo.email,
      password: password || userInfo.password,
    };
    const res = await axios.patch(
      `http://localhost:5000/updateUserInfo/${id}`,
      updateStudent
    );
    if (res) {
      setDbStatus(res);
      alert("User information Updated");
      //   usersInfo();
    }
  };
  //  delete
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/deleteUser/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          deleteUser();
          alert("User Deleted Successfully");
        }
      });
  };
  const deleteUser = () => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  };

  const classes = useStyles();
  const history = useHistory();
  const handleUpdate = (id) => {
    history.push(`/updateUsers/${id}`);
  };
  var i = 1;
  return (
    <div className="container mt-5">
      <p className="header">
        {" "}
        <SupervisedUserCircleIcon />
        User Management
      </p>
      <Form className="form m-auto">
        <Form.Group className="mb-3">
          <Form.Control
            defaultValue={userInfo.firstName}
            onBlur={handleFirstName}
            pattern="^[a-zA-Z]*$"
            name="firstName"
            type="text"
            placeholder="First Name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            defaultValue={userInfo.lastName}
            onBlur={handleLastName}
            pattern="^[a-zA-Z]*$"
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            defaultValue={userInfo.userName}
            onBlur={handleUserName}
            pattern="^[a-zA-Z]*$"
            name="userName"
            type="text"
            placeholder="Username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            defaultValue={userInfo.email}
            onBlur={handleEmail}
            name="email"
            type="email"
            placeholder="Email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            defaultValue={userInfo.password}
            onBlur={handlePassword}
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button
          onClick={() => handleUserClick(userInfo._id)}
          className="btn btn-primary w-100"
          type="submit"
        >
          Update User
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
              {user.map((u) => (
                <StyledTableRow key={u.name}>
                  <StyledTableCell component="th" scope="row">
                    {i++}
                  </StyledTableCell>
                  <StyledTableCell align="left">{u.firstName}</StyledTableCell>
                  <StyledTableCell align="left">{u.lastName}</StyledTableCell>
                  <StyledTableCell align="left">{u.userName}</StyledTableCell>
                  <StyledTableCell align="left">{u.email}</StyledTableCell>
                  <StyledTableCell align="left">
                    {u.password} <VisibilityIcon />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <div className="d-flex">
                      <CreateIcon
                        className="icon"
                        onClick={() => handleUpdate(u._id)}
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
      </div>
    </div>
  );
};

export default UpdateUser;