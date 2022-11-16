import jwt from 'jsonwebtoken';

// function to confirm if user is allowed to perform certain operations (eg like)
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // check if token is from google, or our server
    const isCustomAuth = token.length < 500;
    let decodedData;

    if (token && isCustomAuth) {
      //gets email, id from token made in controller
      decodedData = jwt.verify(token, 'test');

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      // sub is a custom id for each google user
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
}
export default auth;