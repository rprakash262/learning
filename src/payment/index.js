import axios from 'axios';

const loadScript = function (src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.setAttribute("src", src);
    script.onload = () => {
      resolve(true);
    }
    script.onerror = () => {
      resolve(false);
    }
    document.body.appendChild(script);
  })
};

export const initiatePayment = async function ({ orderAmount, currencyType, paymentCapture }) {
  const loadScriptRes = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!loadScriptRes) {
    alert("Razorpay SDK failed to load");
  } else {
    let orderOptions = {
      amount: orderAmount,
      currency: currencyType,
      payment_capture: paymentCapture
    };

    const { data } = await axios.post("https://learning-server-gel6.onrender.com/create-order", orderOptions);
    const { msg, order } = data;

    if (msg === "error") {
      console.log({msg});
    }

    if (msg === "success") {
      console.log({order})
      const { currency, amount, id } = order;
      const opts = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        currency,
        order_id: id,
        amount,
        name: "Ecommerce",
        description: "Test transaction",
        image: "",
        handler: async function (response) {
          console.log({handlerResponse: response});

          const result = await axios.post("http://localhost:5000/create-order", response.razorpay_payment_id);

          console.log({result})
        },
        prefill: {
          email: "test@gmail.com",
          contact: 9876543210
        },
        notes: {
          address: "some dummy address"
        },
        theme: {
          color: "#49c6dd"
        },
      };

      let paymentObject = new window.Razorpay(opts);
      paymentObject.open();
    }
  }
};
