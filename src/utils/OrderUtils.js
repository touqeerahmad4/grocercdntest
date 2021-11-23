import { weekDay } from "./DateUtils";

export const getStandardAnalyticsOrder = order => {
  const timeSlot = order.timeSlot.split("||");

  return {
    id: order.id,
    revenue: order.application_total || order.totalBill, // Total transaction value (incl. tax and shipping)
    shipping: order.delivery_charges || order.deliveryCharges,
    coupon: order.promo_code,
    first_purchase: order.first_purchase,
    payment_method: order.paymentMethod,
    slot_day: weekDay(timeSlot[1]),
    slot_start_time: timeSlot[1],
    slot_end_time: timeSlot[2]
  };
};
