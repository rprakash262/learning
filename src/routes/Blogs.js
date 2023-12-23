import { Container, Grid } from "@mui/material";
import { BlogCard } from "../components/blogCard";

export const Blogs = () => {
    return (
      <div>
        <Container maxWidth="xl" sx={{ height: "100%", width: "60%", paddingTop: "30px", paddingBottom: "30px" }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <BlogCard />
            </Grid>
            <Grid item xs={12}>
              <BlogCard />
            </Grid>
            <Grid item xs={12}>
              <BlogCard />
            </Grid>
            <Grid item xs={12}>
              <BlogCard />
            </Grid>
            <Grid item xs={12}>
              <BlogCard />
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }