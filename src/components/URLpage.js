import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import axios from "axios";
import "../style/URLstyle.css";
import { BASE_URL, ShortenerUrl } from "./axiosService.js";
import Paper from "@mui/material/Paper";

function URLpage() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const genereteHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    return headers;
  };

  useEffect(() => {
    const getRows = () => {
      const userId = localStorage.getItem("userId");
      axios
        .get(BASE_URL + ShortenerUrl + "user/" + userId, {
          headers: genereteHeaders(),
        })
        .then((response) => {
          console.log(localStorage);
          console.log(response);
          if (response.status === 200) {
            let r = response.data.rows.map(({ urlBase, urlShort }) => ({
              urlBase,
              urlShort,
            }));

            setRows(r);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getRows();
    const storedShortenedUrl = localStorage.getItem("shortenedUrl");
    if (storedShortenedUrl) {
      setShortenedUrl(storedShortenedUrl);
    } else {
      if (location.pathname.match(/\/\d+/)) {
        handleRedirectShortURL(location.pathname);
      }
    }
  }, [location.pathname]);

  const handleShortenUrl = async (event) => {
    event.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const formData = new FormData();
      formData.append("UrlBase", url);
      formData.append("userId", userId);

      axios
        .post(BASE_URL + ShortenerUrl + "shorturl", formData, {
          headers: genereteHeaders(),
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const newShortenedUrl = response.data.shortUrl;
            setShortenedUrl(newShortenedUrl);
            localStorage.setItem("shortenedUrl", newShortenedUrl);
            setRows((prevRows) => [
              ...prevRows,
              { urlBase: url, urlShort: newShortenedUrl },
            ]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Error during URL shortening:", error);
      alert("Error during URL shortening. Please try again.");
    }
  };
  const handleRedirectShortURL = async (shortCode) => {
    try {
      const response = await axios.get(
        BASE_URL + ShortenerUrl + `${shortCode}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const originalUrl = response.data;
      window.location.href = originalUrl;
    } catch (error) {
      console.error("Error during URL redirection:", error);
      alert("Error during URL redirection. Please try again.");
    }
  };
  const handleRemoveUrl = (urlBase) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      axios
        .post(
          BASE_URL + ShortenerUrl + "delete",
          { userId, urlBase },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setRows((prevRows) =>
              prevRows.filter((row) => row.urlBase !== urlBase)
            );
          }
        })
        .catch((error) => {
          console.error("Error during URL removal:", error);
          alert("Error during URL removal. Please try again.");
        });
    } catch (error) {
      console.error("Error during URL removal:", error);
      alert("Error during URL removal. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("shortenedUrl");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="app">
      <div className="shortener">
        <h2>URL shortener</h2>
        <form onSubmit={handleShortenUrl}>
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
        {shortenedUrl && (
          <div className="shortener__viewShort">
            <p>Shortened URL:</p>
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
              {shortenedUrl}
            </a>
          </div>
        )}
      </div>
      <div className="logout-container">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>baseUrl</TableCell>
              <TableCell>shortUrl</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index + 1}>
                <TableCell>{index + 1}</TableCell>
                  <TableCell className="row-ellipsis">
                    <div className="row-ellipsis">
                    <a href={row.urlBase}>{row.urlBase}</a>
                    </div>
                  </TableCell>
                  <TableCell className="row-ellipsis">
                    <a href={row.urlShort}>{row.urlShort}</a>
                  </TableCell>
                <TableCell>
                  <button onClick={() => handleRemoveUrl(row.urlBase)}>
                    Remove
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default URLpage;
