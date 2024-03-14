import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const headCells = [
  {
    id: 1,
    text: "category",
  },
  {
    id: 2,
    text: "type",
  },
  {
    id: 3,
    text: "joke",
  },
  {
    id: 4,
    text: "delivery",
  },
  {
    id: 5,
    text: "lang",
  },
];

const amountOptions = [
  { value: 4, label: "4" },
  { value: 6, label: "6" },
  { value: 8, label: "8" },
  { value: 10, label: "10" },
  // Add more options as needed
];

const langOptions = [
  {
    label: "cs - Czech",
    value: "cs",
  },
  {
    label: "de - German",
    value: "de",
  },
  {
    label: "en - English",
    value: "en",
  },
  {
    label: "es - Spanish",
    value: "es",
  },
  {
    label: "fr - French",
    value: "fr",
  },
  {
    label: "pt - Portuguese",
    value: "pt",
  },
];

function HomePage() {
  const [jokesData, setJokesData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();
  const [jokesAmountValue, setJokesAmountValue] = useState(4);
  const [jokeLang, setJokeLang] = useState("en");
  const [defaultView, setDefaultView] = useState(false);

  const handleSelect = (amount) => {
    // console.log(amount);
    setJokesAmountValue(amount);
  };

  const handleSelectLanguage = (language) => {
    // console.log(language);
    setJokeLang(language);
  };

  function dropDownMenuUi() {
    return (
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
          Current Amount ({jokesAmountValue})
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {amountOptions.map((option) => (
            <Dropdown.Item
              key={option.value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  function languageDownMenuUi() {
    return (
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
          Current Language ({jokeLang})
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {langOptions.map((option) => (
            <Dropdown.Item
              key={option.value}
              onClick={() => handleSelectLanguage(option.value)}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  const handleChangeView = (e) => {
    setDefaultView(e.target.checked);
  };

  useEffect(() => {
    setShowLoader(true);
    fetch(
      `https://v2.jokeapi.dev/joke/Any?lang=${jokeLang}&blacklistFlags=nsfw,sexist&amount=${jokesAmountValue}`
    )
      .then((response) => response.json())
      .then((json) => {
        setJokesData(json.jokes);
        setShowLoader(false);
      });
  }, [jokesAmountValue, jokeLang]);

  const bootstrapTablUi = () => {
    return (
      <BootstrapTable
        responsive
        bordered
        size="medium"
        style={{ borderRadius: 4 }}
      >
        <thead className="bg-light">
          <tr>
            {headCells.map((headCell, index) => (
              <th key={index}>{headCell.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jokesData.map((joke, index) => (
            <tr key={index}>
              <td>{joke.category || "Sorry category not available"}</td>
              <td>{joke.type || "Type not available"}</td>
              <td>{joke.joke || "Joke not available"}</td>
              <td>{joke.delivery || "Delivery not available"}</td>
              <td>{joke.lang || "Language not available"}</td>
            </tr>
          ))}
        </tbody>
      </BootstrapTable>
    );
  };

  const muiTableUi = () => {
    return (
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          borderRadius: "6px",
          border: "1px solid #DDD",
          boxShadow: "none",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headCells.map((headCell, index) => (
                <TableCell
                  key={index}
                  sx={{ color: "#000", fontSize: "16px", fontWeight: 700 }}
                >
                  {headCell.text}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {jokesData.map((joke, index) => (
              <TableRow
                key={index}
                sx={{ backgroundColor: index % 2 === 0 ? "#FAFAFA" : "#FFF" }}
              >
                <TableCell>
                  {joke.category || "Sorry category not available"}
                </TableCell>
                <TableCell>{joke.type || "Type not available"}</TableCell>
                <TableCell>{joke.joke || "Joke not available"}</TableCell>
                <TableCell>
                  {joke.delivery || "Delivery not available"}
                </TableCell>
                <TableCell>{joke.lang || "Language not available"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div className="container bg-light m-auto" style={{ borderRadius: 8 }}>
      <div>
        {/* heading of the task */}
        <div className="p-4">
          <h1
            className="title text-center"
            style={{ textDecoration: "underline" }}
          >
            MobileFirst Applications (React Developer Task){" "}
          </h1>
        </div>
        <div className="d-flex flex-column flex-sm-row gap-3">
          <div className="d-flex flex-column pb-4">
            <p className="fs-5">ChangeAmount</p>
            {dropDownMenuUi()}
          </div>
          <div className="d-flex flex-column pb-4">
            <p className="fs-5">ChangeLanguage</p>
            {languageDownMenuUi()}
          </div>
        </div>
        <div className="p-3 d-flex justify-content-start justify-content-sm-end ">
          <Form>
            <Form.Check
              type="switch"
              id="custom-switch"
              label={
                !defaultView ? "Enable MUI Table" : "Enable Bootstrap Table"
              }
              checked={defaultView}
              onChange={(e) => {
                handleChangeView(e);
              }}
            />
          </Form>
        </div>
        <div className="p-3">
          {showLoader ? (
            <div className="d-flex justify-content-center align-items-center p-3">
              <CircularProgress />
            </div>
          ) : !defaultView ? (
            bootstrapTablUi()
          ) : (
            muiTableUi()
          )}
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center  p-2">
          <p>
            <b>Note:</b> We can add multiple filters but for now i am providing
            these two filters
          </p>
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              localStorage.removeItem("userData");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
