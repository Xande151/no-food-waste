const printMiddleware = (req, res, next) => {
  let timestamp = new Date();
  let authentication = req.session.user
    ? "Authenticated User"
    : "Non-Authenticated User";
  console.log(
    `[${timestamp}]: ${req.method} ${req.originalUrl} (${authentication})`
  );

  if (
    req.originalUrl === "/authenticate/signup" ||
    req.originalUrl === "/authenticate/login" ||
    req.originalUrl === "/authenticate" ||
    req.originalUrl === "/authenticate/logout"
  ) {
    return next();
  }

  return res.redirect("/");
};

const loginMiddleware = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user) {
      return res.redirect("/inventory");
    }
  } else {
    return next();
  }
};

const registrationMiddleware = (req, res, next) => {
  if (req.path === "/singup" && req.method === "GET") {
    if (req.session.user) {
      return res.redirect("/inventory");
    }
    return next();
  }

  next();
};

const logoutMiddleware = (req, res, next) => {
  if (req.path === "/logout" && req.method === "GET") {
    if (req.session.user) {
      return next();
    } else {
      return res.redirect("/login");
    }
  }

  next();
};

export {
  printMiddleware,
  loginMiddleware,
  registrationMiddleware,
  logoutMiddleware,
};