import { Card, CardContent, Typography, CardActions, Button, Grid } from "@mui/material"
import Image from '../../data/images.jpg';

export const BlogCard = () => {
  return (
    <Card sx={{ borderRadius: "6px" }}>
      <CardContent >
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Typography variant="h6">Blog Heading</Typography>
            <Typography variant="body2" mt={2}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
          </Grid>
          <Grid item xs={3}>
            <img src={Image} />
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: "inline-block", padding: "0 8px", height: "24px", borderRadius: "12px", border: "1px solid #80808036", margin: "0 5px" }}>
              <p style={{ margin: 0, padding: 0 }}>tag</p>
            </div>
            <div style={{ display: "inline-block", padding: "0 8px", height: "24px", borderRadius: "12px", border: "1px solid #80808036", margin: "0 5px" }}>
              tag
            </div>
            <div style={{ display: "inline-block", padding: "0 8px", height: "24px", borderRadius: "12px", border: "1px solid #80808036", margin: "0 5px" }}>
              tag
            </div>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small">Read More</Button>
      </CardActions>
    </Card>
  )
}