import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Card, CardContent, Typography, CircularProgress, Grid, Container 
} from "@mui/material";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users") 
      .then((response) => response.json())
      .then((data) => {
        setProfiles(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Profile List
      </Typography>
      
      {loading ? (
        <CircularProgress style={{ display: "block", margin: "auto" }} />
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {profiles.map((profile) => (
            <Grid item key={profile.id} xs={12} sm={6} md={4}>
              <Card style={{ textAlign: "center", padding: "20px" }}>
                <CardContent>
                  <Typography variant="h5">{profile.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {profile.email}
                  </Typography>
                  <Link to={`/profile/${profile.id}`}>View Details</Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProfileList;
