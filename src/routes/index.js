const httpStatus = require("http-status");
const router = require("express").Router();

const authRoute = require("../routes/authRoutes");
const AuthPolicy = require("../policies/auth.policy");
const cardRoute = require("./customer/cardRoutes");
const homeRoute = require("../routes/home/homeRoutes");
const reviewRoute = require("../routes/home/reviewRoutes");
const orderRoute = require("../routes/order/orderRoutes");
const paymentRoute = require("../routes/paymentRoutes");
const adminAuthRoute = require("../routes/adminAuth.routes");
const adminRoute = require("../routes/admin.routes");
const customerRoute = require("./customer/customer.Routes");
const sellerRoute = require("../routes/dashboard/sellerRoutes");
const commentRoute = require("../routes/dashboard/commentRoute");
const complaintsRoute = require("../routes/complaint.route");
const productRoute = require("../routes/dashboard/productRoutes");
const settingsRoute = require("../routes/settingsRoutes");
const notificationRoute = require("../routes/notification.routes");
const dashboardRoute = require("../routes/dashboard/dashboardRoutes");
const customerAuthRoute = require("./customer/customerAuthRoutes");
const customerOrderRoute = require("../routes/order/customer.order.routes");
const PaystackHookController = require("../controllers/hook/hook.controller");
const WaitingListController = require("../controllers/waitinglist/waitinglist.controller");
// Import the shipping address route file
const shippingAddressRoute = require("./customer/shippingAddressRoutes");

/** GET /health-check - Check service health */
router.get("/health/check", (_req, res) =>
  res.status(httpStatus.OK).json({ check: "PalParcel server started ok*-*" })
);
router.use("/home", cardRoute);
router.use("/auth", authRoute);
router.use("/product", homeRoute);
router.use("/product", reviewRoute);
router.use("/auth", customerAuthRoute);
router.use("/auth", adminAuthRoute);

router.post("/paystack/webhook", PaystackHookController.paystackHook);
router.post("/waitingList/join", WaitingListController.joinAwaitingList);

// mount Auth routes

/**
 * Check customer refresh_token and refresh user access_token to perform HTTP requests
 * @description Validate the request, check if customer has a valid refresh_token and is authorized to perform this request
 */

router.use(AuthPolicy.hasAccessToken);

router.use("/order", orderRoute);
router.use("/auth", sellerRoute);
router.use("/board", dashboardRoute);
router.use("/customer", customerRoute);
router.use("/dashboard", productRoute);
router.use("/admin", adminRoute);
router.use("/comment", commentRoute);
router.use("/complaints", complaintsRoute);
router.use("/order", customerOrderRoute);
router.use("/payment", paymentRoute);
router.use("/settings", settingsRoute);
router.use("/notification", notificationRoute);
router.use("/customer", shippingAddressRoute); // Add the shipping address routes

module.exports = router;
