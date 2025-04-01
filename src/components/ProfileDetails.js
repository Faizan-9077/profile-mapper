import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, Typography, Button, Container, CircularProgress } from "@mui/material";

const ProfileDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user details from API
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <CircularProgress style={{ display: "block", margin: "auto", marginTop: "20px" }} />;
  }

  if (error) {
    return <Typography variant="h5" align="center" color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Card style={{ marginTop: "20px", padding: "20px", textAlign: "center" }}>
        <CardContent>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="body1">{user.email}</Typography>
          <Typography variant="body2" color="textSecondary">
            {user.company?.name || "No company info available"}
          </Typography>
          <Link to="/">
            <Button variant="contained" color="primary" style={{ marginTop: "20px" }}>
              Back to List
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfileDetails;
