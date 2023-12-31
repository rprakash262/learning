import { Card, CardContent, CardActions, Button, Typography, Chip, useTheme } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { initiatePayment } from "../../payment";
import VideoThumbnail from '../../data/VideoThumbnail.webp';
import { useStore } from "../../store";
import { useState } from "react";

export const CourseCard = ({
  id,
  createdAt,
  title,
  description,
  tags,
  subject,
  author,
  price,
}) => {
  const { setSelectedCourseId } = useStore();
  const [loadingPayment, setLoadingPayment] = useState(false);
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const navigate = useNavigate();

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

  const viewCourse = () => {
    setSelectedCourseId(id);
    navigate("/course")
  }

  return (
    <Card variant="outlined" sx={{ borderRadius: "6px" }}>
      <CardContent>
        <div style={{ width: "100%", height: "auto" }}>
          <img src={VideoThumbnail} style={{ width: "100%", maxWidth: "100%", maxHeight: "100%" }} />
        </div>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="caption" display="block">Author: {author}</Typography>
        <Typography variant="caption" display="block">Subject: {subject}</Typography>
        <Typography variant="caption" display="block">Price: Rs.{price}</Typography>
        <Typography variant="body2" mt={1}>{description}</Typography>
        <div style={{ marginTop: "10px" }}>
          {tags.map((tag) => (
            <Chip style={{ marginRight: "5px", marginBottom: "5px" }} label={tag} />
          ))}
        </div>
      </CardContent>
      <CardActions>
        <Button onClick={viewCourse} size="small">
          <Link
            to="/course"
            style={{ textDecoration: "none", color: primaryColor }}
          >
            View Course
          </Link>
        </Button>
        <Button
          disabled={loadingPayment}
          onClick={startPayment}
        >
          {loadingPayment ? "Please Wait .." : "Buy Course"}
        </Button>
      </CardActions>
    </Card>
  )
}