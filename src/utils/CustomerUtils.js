export const isPhoneValid = phone => /^\+92 - 3\d{9}$/g.test(phone);
export const allowPhoneEdit = phone => {
  if (!/^\+92 - \d*$/g.test(phone)) {
    return false;
  }
  return phone.length >= 6 && phone.length <= 16;
};

export const isOTPCodeValid = phone => phone.length === 6;
export const allowOTPCodeEdit = phone => {
  if (!phone) return true;
  if (!/^\d*$/g.test(phone)) {
    return false;
  }
  return phone.length <= 6;
};

export const phoneWithoutCountry = phone => phone.split(" ")[2];

export const isServerVendor = vendor => {
  return !!(vendor && vendor.id);
};

export const mapToStandardAnalyticsCustomer = (customer, deviceId) => {
  if (!customer) return {};

  const customerObj = {
    Name: customer.name,
    Identity: customer.id && customer.id.toString(),
    Email: customer.email,
    Phone: `+92${customer.phone_number}`,
    Address: customer.address,
    DeviceId: deviceId,
    warehouse: customer && customer.vendor && customer.vendor.name
  };

  if (
    customer.gender &&
    (customer.gender[0] === "M" || customer.gender[0] === "F")
  ) {
    customerObj.Gender = customer.gender[0];
  }

  return customerObj;
};
