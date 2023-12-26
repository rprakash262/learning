import { Card, CardContent, CardActions, Button, Typography } from "@mui/material";

import { initiatePayment } from "../../payment";

export const CourseCard = () => {
  const startPayment = async () => {
    const paymentOptions = {
      orderAmount: 100,
      currencyType: "INR",
      paymentCapture: 1,
    };

    const response = await initiatePayment(paymentOptions);
  }

  return (
    <Card variant="outlined" sx={{ borderRadius: "6px" }}>
      <CardContent >
        <Typography variant="h6">Course Heading</Typography>
        <Typography variant="body2" mt={2}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
        <Button onClick={startPayment}>Buy</Button>
      </CardActions>
    </Card>
  )
}