import React from "react";
import { ReactComponent as VisaCard } from "../assets/images/visa.svg";
import { ReactComponent as MasterCard } from "../assets/images/mastercard.svg";
import { ReactComponent as AmericanExpressCard } from "../assets/images/american express.svg";

const CreditCardIconPart = ({ type }) => {
  if (!type) {
    return <div />;
  }

  const handleIcon = () => {
    switch (type.toLowerCase()) {
      case "visa":
        return <VisaCard width="50px" height="32px" />;
      case "mastercard":
        return <MasterCard width="50px" height="32px" />;
      case "american express":
        return <AmericanExpressCard width="50px" height="32px" />;
      default:
        return <div />;
    }
  };
  return <>{handleIcon()}</>;
};

export default CreditCardIconPart;
