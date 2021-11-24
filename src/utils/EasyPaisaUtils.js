export const handleEasyPaisaResponse = errorCode => {
  switch (errorCode) {
    case "9000":
      return {
        status: "info",
        confirmAPiStatus: "success",
        message: "Payment is successful"
      };
    case "8000":
      return {
        status: "info",
        confirmAPiStatus: "unknown",
        message: "Payment is processing"
      };
    case "4000":
      return {
        status: "error",
        confirmAPiStatus: "failure",
        message: "Payment failed"
      };
    case "6001":
      return {
        status: "error",
        confirmAPiStatus: "cancel",
        message: "You didn't approve the payment from easypaisa"
      };
    case "5000":
      return {
        status: "error",
        confirmAPiStatus: "failure",
        message: "Please check your internet connection and then try again."
      };
    case "6004":
      return {
        status: "info",
        confirmAPiStatus: "unknown",
        message: ""
      };
    default:
      return {
        status: "error",
        confirmAPiStatus: "failure",
        message: "Something went wrong please try again"
      };
  }
};

export const handleEasyPaisaConfirmResponse = status => {
  switch (status) {
    case "confirmed":
      return {
        status: "info",
        message: "Your order has been placed successfully"
      };
    case "pending":
      return {
        status: "info",
        message: "Your order is in processing"
      };
    case "declined":
      return {
        status: "error",
        message: "Oh! Your order has been declined due to payment failure"
      };
    default:
      return {
        status: "error",
        message: "Something went wrong please try again"
      };
  }
};
