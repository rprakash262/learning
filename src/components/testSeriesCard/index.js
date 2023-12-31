import { useState } from "react";
import { Card, CardContent, CardActions, Button, Typography, Chip, Link } from "@mui/material"
// import { Link } from "react-router-dom";

import { initiatePayment } from "../../payment";
import TestSeriesThumbnail from '../../data/testseries.avif';

export const TestSeriesCard = ({
  id,
  createdAt,
  title,
  description,
  tags,
  subject,
  price,
  url,
  solutionUrl,
}) => {
  const [loadingPayment, setLoadingPayment] = useState(false);

  const startPayment = async () => {
    setLoadingPayment(true);
    const paymentOptions = {
      orderAmount: price * 100,
      currencyType: "INR",
      paymentCapture: 1,
    };

    const response = await initiatePayment(paymentOptions);
    setLoadingPayment(false);
  }

  const downloadTestSeries = () => {

  }

  return (
    <Card variant="outlined" sx={{ borderRadius: "6px" }}>
      <CardContent>
        <div style={{ width: "100%", height: "auto" }}>
          <img src={TestSeriesThumbnail} style={{ width: "100%", maxWidth: "100%", maxHeight: "100%" }} />
        </div>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="caption" display="block">Subject: {subject}</Typography>
        <Typography variant="caption" display="block">Price: Rs. {price}</Typography>
        <Typography variant="body2" mt={1}>{description}</Typography>
        <div style={{ marginTop: "10px" }}>
          {tags?.map((tag) => (
            <Chip style={{ marginRight: "5px", marginBottom: "5px" }} label={tag} />
          ))}
        </div>
      </CardContent>
      <CardActions>
        <Link href={url} target="_blank">
          <Button size="small">          
            Download
          </Button>
        </Link>
        <Button
          disabled={loadingPayment}
          onClick={startPayment}
        >
          {loadingPayment ? "Please Wait .." : "Buy"}
        </Button>
      </CardActions>
    </Card>
  )
}